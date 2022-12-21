# Generated by Django 4.1.4 on 2022-12-09 15:28

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("lessons", "0007_remove_lesson_cost_alter_lesson_price"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="comment",
            options={
                "verbose_name": "Комментарий",
                "verbose_name_plural": "Комментарии",
            },
        ),
        migrations.AlterModelOptions(
            name="lesson",
            options={"verbose_name": "Занятие", "verbose_name_plural": "Занятия"},
        ),
        migrations.AlterModelOptions(
            name="schedule",
            options={"verbose_name": "Расписание", "verbose_name_plural": "Расписания"},
        ),
    ]
