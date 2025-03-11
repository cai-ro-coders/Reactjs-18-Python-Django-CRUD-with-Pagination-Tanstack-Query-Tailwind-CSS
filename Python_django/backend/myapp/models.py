from django.db import models
 
# Create your models here.
class Customer(models.Model):
    name = models.CharField(max_length=124)
    email = models.CharField(max_length=125)
 
    def _str_(self):
        return self.name