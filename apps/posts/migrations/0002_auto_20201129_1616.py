# Generated by Django 3.0.3 on 2020-11-29 08:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postimages',
            name='image',
            field=models.ImageField(blank=True, null=True, unique=True, upload_to='post_images'),
        ),
    ]