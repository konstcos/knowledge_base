from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField()
    parent = models.ForeignKey('self', blank=True, null=True, related_name='children', on_delete=models.CASCADE)
    comment = models.TextField(blank=True)
    description = models.TextField(blank=True)

    class Meta():
        unique_together = ('slug', 'parent')

    def __str__(self):
        return self.name


class Knovledg(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    short_desc = models.TextField()
    text = models.TextField()
    
    def __str__(self):
        return f'{self.short_desc} ({self.category})'

