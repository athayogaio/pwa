import datetime

from django.utils.timezone import now
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.app.framework.serializers import UnimplementedSerializer


class LessonRescheduleRequest(UnimplementedSerializer):
    reschedule_to = serializers.DateTimeField()

    def validate_reschedule_to(self, value: datetime.datetime) -> datetime.datetime:
        if value < now():
            raise ValidationError(f"Reschedule must be greater then {now()}")
        return value


class LessonRateRequest(UnimplementedSerializer):
    star_rating = serializers.IntegerField(min_value=1, max_value=5)
