from typing import Optional

from django.db import IntegrityError
from django.db.models import QuerySet, Prefetch, Avg
from django.db.models.functions import Coalesce
from rest_framework.exceptions import ValidationError

from core.app.repositories.base_repository import BaseRepository
from core.models import User, TeacherProfileDB, TeacherProfileStatuses


class UserRepository(BaseRepository):
    model = User

    def store(self, user: User) -> None:
        user.save()

    def update_username(self, user: User, username: str) -> None:
        user.username = username
        try:
            self.store(user)
        except IntegrityError:
            raise ValidationError(f"User with username {username} already exists")

    def find_by_email(self, email: str, fetch_rels: bool = False) -> Optional[User]:
        query = User.objects.filter(email=email)
        if fetch_rels:
            query = self.fetch_relations(queryset=query)
        return query.first()

    def find_by_username(
        self, username: str, fetch_rels: bool = False
    ) -> Optional[User]:
        query = User.objects.filter(username=username)
        if fetch_rels:
            query = self.fetch_relations(queryset=query)
        return query.first()

    def find_by_id(self, id_: int, fetch_rels: bool = False) -> Optional[User]:
        query = self.model.objects.filter(pk=id_)
        if fetch_rels:
            query = self.fetch_relations(queryset=query)
        return query.first()

    def fetch_relations(
        self, queryset: QuerySet[User], user: Optional[User] = None
    ) -> QuerySet[User]:
        """
        Append attributes to each user in queryset: \n
        - **public_teacher_profiles**: All teacher profiles with `ACCEPTED` status
        """
        return queryset.prefetch_related(
            Prefetch(
                "teacher_profiles",
                TeacherProfileDB.objects.filter(
                    status=TeacherProfileStatuses.ACCEPTED.value
                ),
                to_attr="public_teacher_profiles",
            )
        ).annotate(rate_mean=Coalesce(Avg("lesson_rating_stars__star_rating"), 0.0))
