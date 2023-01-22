from typing import Any

from rest_framework import serializers


class UnimplementedSerializer(serializers.Serializer):
    """
    Base class for API requests
    """

    def create(self, validated_data: dict) -> None:
        pass

    def update(self, instance: object, validated_data: dict) -> None:
        pass


class PasswordField(serializers.RegexField):
    def __init__(self, **kwargs: Any):
        super().__init__(
            min_length=10,
            max_length=128,
            regex=r"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{10,128}$",
            **kwargs
        )
