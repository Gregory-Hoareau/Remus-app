from rest_framework import serializers
from .models import CharacterSheet, Trait, Skill

class TraitSerializer(serializers.ModelSerializer):

     class Meta:
         model = Trait
         fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):

     class Meta:
         model = Skill
         fields = '__all__'

class CharacterSheetSerializer(serializers.ModelSerializer):
    traits = TraitSerializer(many=True)
    skills = SkillSerializer(many=True)

    class Meta:
        model = CharacterSheet
        fields = '__all__'

    def create(self, validated_data):
        all_trait = validated_data.pop('traits')
        all_skill = validated_data.pop('skills')
        instance = CharacterSheet.objects.create(**validated_data)
        for trait in all_trait:
            t = Trait(name=trait['name'], value=trait['value'])
            t.save()
            instance.traits.add(t)
        for skill in all_skill:
            s = Skill(name=skill['name'])
            s.save()
            instance.skills.add(s)
        return instance
