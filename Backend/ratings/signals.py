from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Rating
from payment.models import Caliber
from app.models import Users


@receiver(post_save, sender=Rating)
def update_caliber_on_review_creation(sender , instance , **kwargs):
    is_positive = instance.ratings >=3 

    if is_positive:
        employee = instance.employee
        caliber = Caliber.objects.filter(employee = employee)[0]
        positive_review_count = Rating.objects.filter(employee = employee , ratings__gte = 3).count()

        if positive_review_count > 100:
            caliber.caliber_level = 'gold'
        elif positive_review_count > 50:
            caliber.caliber_level = 'silver'
        else:
            caliber.caliber_level = 'bronze'