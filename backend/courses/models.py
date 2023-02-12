import datetime
from collections import defaultdict
from dataclasses import dataclass
from functools import cached_property
from typing import List, Dict

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models import QuerySet
from django.utils.timezone import now
from polymorphic.models import PolymorphicModel
from pytz import utc

from core.app.framework.fields import JSONParsedField, IsDataclass
from core.models import User, TimeStampedModel, Transaction, Comment


class CourseTypes(models.TextChoices):
    ONLINE = "ONLINE"
    VIDEO = "VIDEO"


class CourseLevels(models.TextChoices):
    STARTING = "STARTING"
    CONTINUER = "CONTINUER"
    ADVANCED = "ADVANCED"


class CoursePaymentTypes(models.TextChoices):
    PAYMENT = "PAYMENT"
    DONATION = "DONATION"
    FREE = "FREE"


class CourseComplexities(models.TextChoices):
    EASY = "EASY"
    MEDIUM = "MEDIUM"
    HARD = "HARD"


class RepetitionWeekdays(models.IntegerChoices):
    MONDAY = 0
    TUESDAY = 1
    WEDNESDAY = 2
    THURSDAY = 3
    FRIDAY = 4
    SATURDAY = 5
    SUNDAY = 6


@dataclass
class CourseSchedule(IsDataclass):
    weekday: int
    start_time: datetime.time


class BaseCourse(TimeStampedModel):
    name = models.CharField("Наименование", max_length=64)
    description = models.TextField("Описание")
    course_type = models.CharField("Тип", max_length=30, choices=CourseTypes.choices)
    level = models.JSONField("Уровень")
    complexity = models.CharField(
        "Сложность", max_length=30, choices=CourseComplexities.choices
    )
    teacher = models.ForeignKey(
        User, verbose_name="Преподаватель", on_delete=models.CASCADE
    )
    favorites = models.ManyToManyField(
        User, related_name="favorite_courses", verbose_name="Избранное", blank=True
    )
    lesson_participants_limit = models.IntegerField(
        "Лимит количества участников онлайн-урока",
        validators=(MinValueValidator(limit_value=1),),
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Базовый курс"
        verbose_name_plural = "Базовые курсы"


class CourseStatuses(models.TextChoices):
    CANCELED = "CANCELED"
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"
    MODERATION = "MODERATION"
    DECLINED = "DECLINED"
    COMPLETED = "COMPLETED"


class CourseManager(models.Manager):
    def get_queryset(self) -> QuerySet["Course"]:
        return super().get_queryset().select_related("base_course")


class Course(TimeStampedModel):
    base_course = models.ForeignKey(
        BaseCourse,
        related_name="courses",
        verbose_name="Базовый курс",
        on_delete=models.CASCADE,
    )
    duration = models.DurationField("Продолжительность")
    start_datetime = models.DateTimeField("Дата и время начала")
    deadline_datetime = models.DateTimeField("Дата и время окончания")
    link = models.URLField("Ссылка для подключения")
    link_info = models.CharField("Информация о подключении", max_length=100, blank=True)
    payment = models.CharField(
        "Тип платежа", max_length=30, choices=CoursePaymentTypes.choices
    )
    price = models.FloatField("Цена", validators=(MinValueValidator(limit_value=0),))
    schedule = JSONParsedField(
        default=list, parse_to=CourseSchedule, verbose_name="Расписание", blank=True
    )
    status = models.CharField(
        "Статус",
        max_length=40,
        choices=CourseStatuses.choices,
        default=CourseStatuses.MODERATION,
    )
    archived = models.BooleanField("Архивирован", default=False)

    def primitive_schedule_value(self) -> List[Dict]:
        return Course.schedule.field.convert_to_primitive(value=self.schedule) or []

    @cached_property
    def mapped_schedule(self) -> Dict[int, List[CourseSchedule]]:
        mapped_schedule = defaultdict(list)
        for item in self.schedule:
            mapped_schedule[item.weekday].append(item)
        return mapped_schedule

    def lessons_in_range(
        self, date_start: datetime.datetime, date_end: datetime.datetime
    ) -> List[datetime.datetime]:
        cur_date = date_start
        result = []
        while cur_date <= date_end:
            if cur_date.weekday() in self.mapped_schedule:
                for course_info in self.mapped_schedule[cur_date.weekday()]:
                    course_datetime = datetime.datetime.combine(
                        date=cur_date, time=course_info.start_time, tzinfo=utc
                    )
                    if not (now() < course_datetime < date_end):
                        continue
                    result.append(course_datetime)
            cur_date += datetime.timedelta(days=1)
        return result

    class Meta:
        verbose_name = "Курс"
        verbose_name_plural = "Курсы"


class CourseCycle(TimeStampedModel):
    course = models.ForeignKey(Course, verbose_name="Курс", on_delete=models.CASCADE)
    start_at = models.DateTimeField("Дата и время начала")
    end_at = models.DateTimeField("Дата и время окончания")
    canceled_lessons_amount = models.IntegerField(
        "Количество отмененных занятий", default=0
    )
    transferred_lessons_amount = models.IntegerField(
        "Количество перенесенных занятий", default=0
    )

    class Meta:
        verbose_name = "Цикл курса"
        verbose_name_plural = "Циклы курсов"


class Review(PolymorphicModel, TimeStampedModel):
    text = models.TextField("Текст")
    user = models.ForeignKey(
        User, verbose_name="Автор", null=True, on_delete=models.SET_NULL
    )

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"


class CourseReview(Review):
    base_course = models.ForeignKey(
        BaseCourse,
        related_name="reviews",
        verbose_name="Отзыв о курсе",
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = "Отзыв о курсе"
        verbose_name_plural = "Отзывы о курсе"


class LessonStatuses(models.TextChoices):
    ACTIVE = "ACTIVE"
    CANCELED = "CANCELED"


class Lesson(TimeStampedModel):
    course = models.ForeignKey(
        Course,
        related_name="lessons_set",
        verbose_name="Курс",
        on_delete=models.CASCADE,
    )
    start_at = models.DateTimeField("Дата и время начала")
    participants = models.ManyToManyField(User, verbose_name="Участники")
    enrolled_users = models.ManyToManyField(
        User,
        related_name="enrolled_users_set",
        verbose_name="Зарегистрированные пользователи",
        through="LessonEnrolledUser",
    )
    status = models.CharField(
        "Статус",
        max_length=30,
        choices=LessonStatuses.choices,
        default=LessonStatuses.ACTIVE,
    )

    class Meta:
        verbose_name = "Занятие"
        verbose_name_plural = "Занятия"
        ordering = ("id",)


class LessonEnrolledUser(TimeStampedModel):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Расписание курса пользователя"
        verbose_name_plural = "Расписания курсов пользователя"
        unique_together = [("lesson", "user")]


class CourseComment(Comment):
    base_course = models.ForeignKey(
        BaseCourse,
        related_name="comments",
        verbose_name="Базовый курс",
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = "Комментарий к курсу"
        verbose_name_plural = "Комментарии к курсу"


class Ticket(TimeStampedModel):
    course = models.ForeignKey(
        Course, verbose_name="Курс", on_delete=models.DO_NOTHING, related_name="tickets"
    )
    user = models.ForeignKey(User, verbose_name="Владелец", on_delete=models.DO_NOTHING)
    amount = models.IntegerField("Количество посещений")

    class Meta:
        verbose_name = "Билет"
        verbose_name_plural = "Билеты"


class TicketTransaction(Transaction):
    ticket = models.ForeignKey(Ticket, verbose_name="Билет", on_delete=models.CASCADE)
    ticket_amount = models.IntegerField("Количество посещений")

    class Meta:
        verbose_name = "Транзакция билета"
        verbose_name_plural = "Транзакции билетов"


class CourseQuestion(TimeStampedModel):
    title = models.CharField("Заголовок", max_length=120)
    text = models.TextField("Текст")
    author = models.ForeignKey(
        User, verbose_name="Автор", null=True, on_delete=models.SET_NULL
    )
    course = models.ForeignKey(
        BaseCourse,
        verbose_name="Курс",
        related_name="questions",
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = "Вопрос по курсу"
        verbose_name_plural = "Вопросы по курсу"


class CourseAnswer(TimeStampedModel):
    text = models.TextField("Текст")
    question = models.ForeignKey(
        CourseQuestion,
        verbose_name="Вопрос",
        related_name="answers",
        on_delete=models.CASCADE,
    )
    author = models.ForeignKey(
        User, verbose_name="Автор", null=True, on_delete=models.SET_NULL
    )

    class Meta:
        verbose_name = "Ответ на вопрос к курсу"
        verbose_name_plural = "Ответы на вопрос к курсу"


class LessonRatingStar(models.Model):
    star_rating = models.IntegerField(
        "Рейтинг",
        validators=(MinValueValidator(limit_value=1), MaxValueValidator(limit_value=5)),
    )
    user = models.ForeignKey(
        User,
        verbose_name="Пользователь",
        related_name="lesson_rating_stars",
        null=True,
        on_delete=models.SET_NULL,
    )
    lesson = models.ForeignKey(
        Lesson,
        verbose_name="Урок",
        related_name="stars",
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = "Оценка урока"
        verbose_name_plural = "Оценки урока"


class ComplaintsCategories(models.TextChoices):
    COMPLAINT1 = "COMPLAINT1"
    COMPLAINT2 = "COMPLAINT2"


class LessonComplaint(TimeStampedModel):
    reviewed = models.BooleanField(default=False)
    decision = models.BooleanField(default=False)
    category = models.CharField("Категория жалобы", max_length=30, choices=ComplaintsCategories.choices)
    title = models.CharField("Заголовок", max_length=100)
    content = models.TextField("Содержание")
    lesson = models.ForeignKey(Lesson, null=True, on_delete=models.SET_NULL)
    author = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = "Жалоба на занятие"
        verbose_name_plural = "Жалобы по занятиям"


class ComplaintDecision(TimeStampedModel):
    complaint = models.ForeignKey(LessonComplaint, verbose_name="жалоба", on_delete=models.SET_NULL, null=True)
    decision = models.TextField("Содержание")
    feedback = models.BooleanField(default=False)
    decision_rate = models.IntegerField("Оценка решения", default=5,
                                        validators=(MinValueValidator(limit_value=1), MaxValueValidator(limit_value=5))
                                        )

    class Meta:
        verbose_name = "Решение на жалобу"
        verbose_name_plural = "Решения по жалобам"
