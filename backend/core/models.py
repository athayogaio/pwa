import uuid
from typing import List, Union

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from polymorphic.models import PolymorphicModel


class TimeStampedModel(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(
        "Дата и время создания", auto_now_add=True, db_index=False
    )
    updated_at = models.DateTimeField(
        "Дата и время изменения", auto_now=True, db_index=False
    )

    class Meta(object):
        abstract = True
        ordering = ["-id"]


class Attachment(PolymorphicModel):
    image = models.ImageField("Изображение")
    created_at = models.DateTimeField(
        "Дата и время создания", auto_now_add=True, db_index=False
    )
    updated_at = models.DateTimeField(
        "Дата и время изменения", auto_now=True, db_index=False
    )

    class Meta:
        verbose_name = "Вложение"
        verbose_name_plural = "Вложения"


class UserRoles(models.TextChoices):
    STUDENT = "STUDENT"
    TEACHER = "TEACHER"
    MODERATOR = "MODERATOR"


def user_default_roles() -> List[Union[UserRoles, str]]:
    return [UserRoles.STUDENT]


class User(AbstractUser):
    first_name = models.CharField(_("first name"), max_length=100, blank=True)
    last_name = models.CharField(_("last name"), max_length=100, blank=True)
    email = models.EmailField(_("email address"), unique=True)

    about = models.CharField(max_length=100, blank=True)
    avatar = models.ImageField(upload_to="user_avatars/", blank=True)
    roles = models.JSONField(default=user_default_roles)
    register_confirm_code = models.CharField(
        _("register confirm code"), max_length=6, blank=True, null=True
    )
    pwd_reset_token = models.CharField(
        _("pwd reset token"), max_length=300, blank=True, null=True
    )
    rate = models.FloatField(default=5)

    def has_role(self, role: UserRoles) -> bool:
        return role in self.roles

    def add_roles(self, roles: List[UserRoles]) -> None:
        self.roles = list({*self.roles, *roles})

    def remove_role(self, role: UserRoles) -> None:
        if not self.has_role(role=role):
            return
        del self.roles[self.roles.index(role)]

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"


class TransactionStatuses(models.TextChoices):
    INITIAL = "INITIAL"
    CONFIRMED = "CONFIRMED"
    DECLINED = "DECLINED"


class Transaction(PolymorphicModel):
    id = models.UUIDField(
        primary_key=True, unique=True, default=uuid.uuid4, editable=False
    )
    amount = models.PositiveIntegerField("Количество")
    payment_id = models.CharField("Идентификатор платежа", max_length=40, null=True)
    user = models.ForeignKey(
        User, verbose_name="Пользователь", on_delete=models.CASCADE
    )
    status = models.CharField(
        "Статус", max_length=50, choices=TransactionStatuses.choices
    )
    created_at = models.DateTimeField(
        "Дата и время создания", auto_now_add=True, db_index=False
    )
    updated_at = models.DateTimeField(
        "Дата и время обновления", auto_now=True, db_index=False
    )

    class Meta:
        verbose_name = "Транзакция"
        verbose_name_plural = "Транзакции"


class GenderTypes(models.TextChoices):
    MALE = "MALE"
    FEMALE = "FEMALE"


class QuestionnaireTeacherStatuses(models.TextChoices):
    MODERATION = "MODERATION"
    ACCEPTED = "ACCEPTED"
    DECLINED = "DECLINED"


class QuestionnaireTeacher(TimeStampedModel):
    user = models.ForeignKey(
        User,
        related_name="teacher_profiles",
        verbose_name="Пользователь",
        on_delete=models.CASCADE,
    )
    name = models.CharField("Имя", max_length=30)
    surname = models.CharField("Фамилия", max_length=50)
    date_of_birth = models.DateField("Дата рождения")
    gender = models.CharField(
        "Пол", max_length=10, choices=GenderTypes.choices, null=True
    )
    about_me = models.CharField("О себе", max_length=3000)
    work_experience = models.CharField("Опыт работы", max_length=1000)
    vk_link = models.URLField("Ссылка на VK", max_length=200, blank=True)
    telegram_link = models.URLField("Ссылка на TG", max_length=200, blank=True)
    status = models.CharField(
        "Статус",
        max_length=30,
        choices=QuestionnaireTeacherStatuses.choices,
        default=QuestionnaireTeacherStatuses.MODERATION,
    )
    certificate_photos = models.ManyToManyField(
        Attachment, verbose_name="Фото сертификатов", blank=True
    )
    user_photo = models.ImageField("Фото пользователя")
    passport_photo = models.ImageField("Фото паспорта")
    user_with_passport_photo = models.ImageField("Фото пользователя с паспортом")

    def setup_certificate_photos(self, photos: List[Attachment]) -> None:
        self.certificate_photos.set(photos)

    class Meta:
        verbose_name = "Анкета преподавателя"
        verbose_name_plural = "Анкеты преподавателей"


class Comment(PolymorphicModel):
    text = models.TextField(max_length=512)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Комментарий"
        verbose_name_plural = "Комментарии"
