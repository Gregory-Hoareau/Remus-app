from rest_framework import serializers
from .models import CharacterSheet, Trait, Skill, PersonalData

class TraitSerializer(serializers.ModelSerializer):

     class Meta:
         model = Trait
         fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):

     class Meta:
         model = Skill
         fields = '__all__'

class PersonalDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = PersonalData
        fields = '__all__'

class CharacterSheetSerializer(serializers.ModelSerializer):
    name = TraitSerializer(many=False)
    age = TraitSerializer(many=False)
    sex = TraitSerializer(many=False)
    background = TraitSerializer(many=False)
    traits = TraitSerializer(many=True)
    skills = SkillSerializer(many=True)
    other_personal = PersonalDataSerializer(many=True)

    class Meta:
        model = CharacterSheet
        fields = '__all__'

    def create(self, validated_data):
        # Identity Trait
        validated_name = validated_data.pop('name') # Correspond to name
        validated_age = validated_data.pop('age') # Correspond to age
        validated_sex = validated_data.pop('sex') # Correspond to sex
        validated_background = validated_data.pop('background') # Correspond to background
        # Create identity trait
        created_name = Trait(name=validated_name['name'], value=validated_name['value'])
        created_age = Trait(name=validated_age['name'], value=validated_age['value'])
        created_sex = Trait(name=validated_sex['name'], value=validated_sex['value'])
        created_background = Trait(name=validated_background['name'], value=validated_background['value'])
        # Save Trait
        created_name.save()
        created_age.save()
        created_sex.save()
        created_background.save()
        
        all_trait = validated_data.pop('traits')
        all_skill = validated_data.pop('skills')
        others = validated_data.pop('other_personal')
        
        instance = CharacterSheet.objects.create(**validated_data)
        instance.name = created_name
        instance.age = created_age
        instance.sex = created_sex
        instance.background = created_background
        for trait in all_trait:
            t = Trait(name=trait['name'], value=trait['value'])
            t.save()
            instance.traits.add(t)
        for skill in all_skill:
            s = Skill(name=skill['name'])
            s.save()
            instance.skills.add(s)
        for data in others:
            d = PersonalData(name=data['name'], value=data['value'])
            d.save()
            instance.other_personal.add(d)
        return instance
