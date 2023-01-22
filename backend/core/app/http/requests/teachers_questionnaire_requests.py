from rest_framework import serializers

from core.app.framework.serializers import UnimplementedSerializer
from core.models import GenderTypes


class QuestionnaireTeacherRequest(UnimplementedSerializer):
    name = serializers.CharField(max_length=30)
    surname = serializers.CharField(max_length=50)
    date_of_birth = serializers.DateField()
    gender = serializers.ChoiceField(choices=GenderTypes.choices)
    about_me = serializers.CharField(max_length=3000)
    work_experience = serializers.CharField(max_length=1000)
    vk_link = serializers.URLField()
    telegram_link = serializers.URLField()
    certificate_photos = serializers.ListField(child=serializers.ImageField())
    passport_photo = serializers.ImageField()
    user_photo = serializers.ImageField()
    user_with_passport_photo = serializers.ImageField()
