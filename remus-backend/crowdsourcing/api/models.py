from django.db import models

#Class util to the models
class Trait(models.Model):
    name = models.CharField(max_length=20)
    value = models.TextField()

    def __eq__(self, other):
        if isinstance(other, Trait):
            return self.name == other.name and self.value == other.value
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
    name = models.OneToOneField(Trait, related_name='char_name', on_delete=models.CASCADE, null=True)
    age = models.OneToOneField(Trait, related_name='age', on_delete=models.CASCADE, null=True)
    sex = models.OneToOneField(Trait, related_name='sex', on_delete=models.CASCADE, null=True)
    background = models.OneToOneField(Trait, related_name='background', on_delete=models.CASCADE, null=True)
    traits = models.ManyToManyField(Trait)
    skills = models.ManyToManyField(Skill)
    other_personal = models.ManyToManyField(PersonalData)
    tags = models.TextField()
