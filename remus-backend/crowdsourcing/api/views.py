from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer

from .models import CharacterSheet
from .serializer import CharacterSheetSerializer

# Create your views here.
class CharacterSheetList(APIView):

    def get(self, request):
        sheets = CharacterSheet.objects.all()
        serialized = CharacterSheetSerializer(sheets, many=True)
        return Response(serialized.data)

    def post(self, request):
        body = request.data
        serialized = CharacterSheetSerializer(data=body)
        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data, status=status.HTTP_201_CREATED)
        print(serialized.errors)
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)


class CharacterSheetDetail(APIView):

    def get(self, request, sheet_id):
        try:
            sheet = CharacterSheet.objects.get(id=sheet_id)
            serialize = CharacterSheetSerializer(sheet)
            return Response(serialize.data)
        except CharacterSheet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, sheet_id):
        try:
            sheet = CharacterSheet.objects.get(id=person_id)
            serialize = CharacterSheetSerializer(sheet, data=request.data)
            if serialize.is_valid():
                serialize.save()
                return Response(serialize.data)
            return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
        except CharacterSheet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, sheet_id):
        try:
            sheet = CharacterSheet.objects.get(id=sheet_id)
            sheet.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CharacterSheet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
