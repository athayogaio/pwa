import datetime
from typing import Dict, Optional

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


class LessonFilterRequest(UnimplementedSerializer):
    enrolled = serializers.BooleanField()
    start_datetime = serializers.DateTimeField()
    end_datetime = serializers.DateTimeField()

    def validate(self, attrs: Dict) -> dict:
        start_datetime: Optional[datetime.datetime] = attrs.get("start_datetime")
        end_datetime: Optional[datetime.datetime] = attrs.get("end_datetime")
        if start_datetime and end_datetime and start_datetime > end_datetime:
            raise ValidationError("start datetime must be greater than end_datetime")

        return attrs
