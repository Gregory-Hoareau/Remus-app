from django.db import models

#Class util to the models
class Trait(models.Model):
    name = models.CharField(max_length=20)
    value = models.IntegerField()

    def __eq__(self, other):
        if isinstance(other, Trait):
            return self.name == other.name and self.value == other.name
        return False

class Skill(models.Model):
    name = models.CharField(max_length=20)

    def __eq__(self, other):
        if isinstance(other, Skill):
            return self.name == other.name
        return False

class PersonalData(models.Model):
    name = models.CharField(max_length=20)
    value = models.CharField(max_length=40)

# Create your models here.
class CharacterSheet(models.Model):
    template = models.CharField(max_length=10, default='D&D')
    img = models.CharField(max_length=150, null=True)
    name = models.CharField(max_length=10)
    age = models.IntegerField()
    sex = models.CharField(max_length=15)
    background = models.TextField()
    traits = models.ManyToManyField(Trait)
    skills = models.ManyToManyField(Skill)
    other_personal = models.ManyToManyField(PersonalData, null=True)

