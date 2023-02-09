import random
from io import BytesIO

import pytest
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from faker import Faker
from rest_framework.exceptions import ValidationError

from core.app.aggregates.teacher_profile_aggregate import TeacherProfileAggregate
from core.app.aggregates.types import TeacherProfileCreateContext
from core.app.services.types import (
    QuestionnaireTeacherData,
    TeacherLegalBillingInfoData,
)
from core.models import GenderTypes, UserRoles, UserBillingType
from core.seeders.user_seeder import UserSeeder


def fake_questionnaire_teacher_data() -> QuestionnaireTeacherData:
    fake = Faker("ru-RU")
    file = BytesIO()
    image = Image.new("RGB", size=(100, 100), color=(155, 0, 0))
    image.save(file, "jpeg")
    file.seek(0)
    return QuestionnaireTeacherData(
        name=fake.first_name(),
        surname=fake.last_name(),
        date_of_birth=fake.date_of_birth().strftime("%Y-%m-%d"),
        gender=random.choice(list(GenderTypes.choices))[0],
        about_me=fake.text(),
        work_experience=fake.text(),
        vk_link=fake.url(),
        telegram_link=fake.url(),
        certificate_photos=[
            InMemoryUploadedFile(
                file, None, "test_image.jpeg", "image/jpeg", file.tell, None
            )
        ]
        * 5,
        passport_photo=InMemoryUploadedFile(
            file, None, "test_image.jpeg", "image/jpeg", file.tell, None
        ),
        user_photo=InMemoryUploadedFile(
            file, None, "test_image.jpeg", "image/jpeg", file.tell, None
        ),
        user_with_passport_photo=InMemoryUploadedFile(
            file, None, "test_image.jpeg", "image/jpeg", file.tell, None
        ),
    )


def generate_user_billing_info_ru_request() -> TeacherLegalBillingInfoData:
    fake = Faker("ru-RU")
    return TeacherLegalBillingInfoData(
        organization=fake.company(),
        bank=fake.company(),
        organization_address=fake.address(),
        bic=fake.bic(),
        inn=fake.individuals_inn(),
        correspondent_account=fake.correspondent_account(),
        prc=fake.kpp(),
        account_number=fake.iban(),
    )


def test_teacher_profile_create() -> None:
    user = UserSeeder().seed()
    user.add_roles([UserRoles.TEACHER])
    user.save()
    profile_aggregate = TeacherProfileAggregate(user=user)

    with pytest.raises(ValidationError):
        profile_aggregate._can_create()

    user.roles = []
    user.save()
    profile = profile_aggregate.create(
        ctx=TeacherProfileCreateContext(
            questionnaire_data=fake_questionnaire_teacher_data(),
            billing_data=generate_user_billing_info_ru_request(),
            billing_type=UserBillingType.LEGAL_USER,
        )
    )
    assert profile.id is not None

    with pytest.raises(ValidationError):
        profile_aggregate._can_create()
