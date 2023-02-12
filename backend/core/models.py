import uuid
from enum import Enum
from typing import List, Union, Optional

from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.validators import RegexValidator, MaxValueValidator, MinValueValidator
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


class UserRegions(models.TextChoices):
    RU = "RU"
    EU = "EU"


class GenderTypes(models.TextChoices):
    MALE = "MALE"
    FEMALE = "FEMALE"
    EMPTY = ""


class User(AbstractUser):
    first_name = models.CharField(_("first name"), max_length=100, blank=True)
    last_name = models.CharField(_("last name"), max_length=100, blank=True)
    email = models.EmailField(_("email address"), unique=True)

    about = models.CharField(max_length=100, blank=True)
    avatar = models.ImageField(upload_to="user_avatars/", blank=True)
    background = models.ImageField(upload_to="user_avatars/", blank=True)
    roles = models.JSONField(default=user_default_roles)
    register_confirm_code = models.CharField(
        _("register confirm code"), max_length=128, blank=True, null=True
    )
    pwd_reset_token = models.CharField(
        _("pwd reset token"), max_length=300, blank=True, null=True
    )
    gender = models.CharField(
        max_length=20, choices=GenderTypes.choices, default=GenderTypes.EMPTY
    )
    birthday = models.DateField(null=True)
    hide_birthday = models.BooleanField(default=False)
    sys_rate = models.FloatField(
        default=0, validators=[MaxValueValidator(5), MinValueValidator(0)]
    )
    region = models.CharField(
        max_length=10, choices=UserRegions.choices, default=UserRegions.RU
    )
    rate_mean: Optional[float] = None

    @property
    def rate(self) -> Optional[float]:
        if self.rate_mean is None:
            raise ValueError("rate_mean is not calculated")
        return self.rate_mean

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


class QuestionnaireTeacher(TimeStampedModel):
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


class BillingInfoRegexes(Enum):
    INN_RU = r"^\d{10}$"
    BIC_RU = r"^[A-Z0-9]{9}$"
    ACCOUNT_NUMBER_RU = r"^\d{20}$"
    CORRESPONDENT_ACCOUNT_RU = r"^\d{20}$"


class LegalUserBillingInfo(PolymorphicModel):
    organization = models.CharField(max_length=255)
    prc = models.CharField("КПП", max_length=10)


class LegalUserBillingInfoRU(LegalUserBillingInfo):
    inn = models.CharField(
        "ИНН",
        max_length=10,
        validators=[RegexValidator(regex=BillingInfoRegexes.INN_RU.value)],
    )
    bic = models.CharField(
        "БИК",
        max_length=50,
        validators=[RegexValidator(regex=BillingInfoRegexes.BIC_RU.value)],
    )
    account_number = models.CharField("Номер счета", max_length=30)


class LegalUserBillingInfoEU(LegalUserBillingInfo):
    inn = models.CharField("ИНН", max_length=50)
    bic = models.CharField(max_length=50)
    account_number = models.CharField("Номер счета", max_length=50)


class IndividualUserBillingInfo(PolymorphicModel):
    recipient = models.CharField(max_length=255)


class IndividualUserBillingInfoRU(IndividualUserBillingInfo):
    inn = models.CharField(
        "ИНН",
        max_length=10,
        validators=[RegexValidator(regex=BillingInfoRegexes.INN_RU.value)],
    )
    account_number = models.CharField("Счет", max_length=20)
    bic = models.CharField(
        "БИК",
        max_length=50,
        validators=[RegexValidator(regex=BillingInfoRegexes.BIC_RU.value)],
    )


class IndividualUserBillingInfoEU(IndividualUserBillingInfo):
    inn = models.CharField("ИНН", max_length=10)
    account_number = models.CharField("Счет", max_length=30)
    bic = models.CharField(max_length=50)


LegalBillingInfoModelType = Union[LegalUserBillingInfoEU, LegalUserBillingInfoEU]
IndividualBillingInfoModelType = Union[
    IndividualUserBillingInfoRU, IndividualUserBillingInfoEU
]
BillingInfoModelType = Union[LegalBillingInfoModelType, IndividualBillingInfoModelType]


class TeacherProfileStatuses(models.TextChoices):
    MODERATION = "MODERATION"
    ACCEPTED = "ACCEPTED"
    DECLINED = "DECLINED"


class UserBillingType(models.TextChoices):
    LEGAL_USER = "LEGAL_USER"
    INDIVIDUAL_USER = "INDIVIDUAL_USER"


class TeacherProfileDB(TimeStampedModel):
    user = models.ForeignKey(
        User,
        related_name="teacher_profiles",
        verbose_name="Пользователь",
        on_delete=models.CASCADE,
    )
    questionnaire = models.OneToOneField(QuestionnaireTeacher, on_delete=models.CASCADE)

    billing_info_content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, null=True
    )
    billing_info_obj_id = models.PositiveIntegerField(null=True)
    billing_info = GenericForeignKey("billing_info_content_type", "billing_info_obj_id")

    status = models.CharField(
        "Статус",
        max_length=30,
        choices=TeacherProfileStatuses.choices,
        default=TeacherProfileStatuses.MODERATION,
    )


class Comment(PolymorphicModel):
    text = models.TextField(max_length=512)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Комментарий"
        verbose_name_plural = "Комментарии"
