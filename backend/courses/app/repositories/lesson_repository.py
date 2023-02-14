import datetime
from typing import List, Optional

from django.db.models import QuerySet, F, Q, Avg
from django.db.models.expressions import CombinedExpression
from django.utils.timezone import now

from core.app.repositories.base_repository import BaseRepository
from core.models import User
from courses.app.repositories.types import LessonFilterData
from courses.models import Lesson, LessonRatingStar


class LessonRepository(BaseRepository):
    model = Lesson

    @property
    def end_at_query(self) -> CombinedExpression:
        return F("start_at") + F("course__duration")

    def fetch_relations(self, lessons: QuerySet[Lesson]) -> QuerySet[Lesson]:
        return lessons.select_related("course__base_course").annotate(
            end_at=self.end_at_query,
            rate_mean=Avg("stars__star_rating"),
        )

    def bulk_create(self, objs: List[Lesson]) -> None:
        self.model.objects.bulk_create(objs)

    def find_by_id(self, id_: int, fetch_rels: bool = False) -> Optional[Lesson]:
        lesson_queryset = self.model.objects.filter(pk=id_)
        if fetch_rels:
            lesson_queryset = self.fetch_relations(lesson_queryset)
        return lesson_queryset.first()

    def rate_lesson(self, rating_star: LessonRatingStar) -> None:
        user_star = LessonRatingStar.objects.filter(
            user=rating_star.user, lesson=rating_star.lesson
        ).first()
        if user_star:
            user_star.star_rating = rating_star.star_rating
            rating_star = user_star
        rating_star.save()

    def find_by_course_id(self, course_id: int) -> QuerySet[Lesson]:
        return self.model.objects.filter(course_id=course_id)

    def find_by_id_creator(self, id_: int, user_id: int) -> Optional[Lesson]:
        return self.model.objects.filter(
            pk=id_, course__base_course__teacher_id=user_id
        ).first()

    def is_participant(self, lesson: Lesson, user: User) -> Optional[Lesson]:
        return lesson.participants.filter(id=user.id)

    def add_participant(self, lesson: Lesson, user: User) -> None:
        return lesson.participants.add(user)

    def find_user_participant(
        self, user_id: int, skip_past: bool = False
    ) -> QuerySet[Lesson]:
        q = Q()
        if skip_past:
            q &= Q(start_at__gte=now())
        return self.model.objects.filter(q, participants__id=user_id)

    def find_user_enrolled(
        self, user_id: int, skip_past: bool = False
    ) -> QuerySet[Lesson]:
        q = Q()
        if skip_past:
            q &= Q(start_at__gte=now())
        return self.model.objects.filter(q, enrolled_users__id=user_id)

    def store(self, lesson: Lesson) -> None:
        lesson.save()

    def overlap_lesson(
        self,
        start_at: datetime.datetime,
        end_at: datetime.datetime,
        skip_lessons_ids: List[int],
    ) -> Optional[Lesson]:
        return (
            self.model.objects.annotate(end_time=self.end_at_query)
            .filter(start_at__lt=end_at, end_time__gte=start_at)
            .exclude(pk__in=skip_lessons_ids)
            .first()
        )

    def lesson_participants_emails(self, lesson: Lesson) -> List[str]:
        return self.model.objects.filter(pk=lesson.id).values_list(
            "participants__email", flat=True
        )

    def filter(self, data: LessonFilterData, user: User) -> QuerySet[Lesson]:
        query = self.model.objects.all().annotate(end_at=self.end_at_query)
        filter_query = Q()
        if data.get("enrolled"):
            filter_query &= Q(enrolled_users__id=user.id)
        else:
            filter_query &= Q(participants__id=user.id)

        if data.get("start_datetime"):
            filter_query &= Q(start_at__gte=data["start_datetime"])

        if data.get("end_datetime"):
            filter_query &= Q(end_at__lte=data["end_datetime"])

        return query.filter(filter_query)

    def find_lessons_in_range(
        self,
        course_id: int,
        start_at: datetime.datetime,
        end_at: datetime.datetime,
    ) -> QuerySet[Lesson]:
        return self.model.objects.annotate(end_at=self.end_at_query).filter(
            course_id=course_id, start_at__gte=start_at, end_at__lte=end_at
        )

    def lessons_in_range_count(
        self,
        course_id: int,
        start_at: datetime.datetime,
        end_at: datetime.datetime,
    ) -> int:
        return self.find_lessons_in_range(
            course_id=course_id, start_at=start_at, end_at=end_at
        ).count()
