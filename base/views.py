from telnetlib import DO
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serilaizer import RegisterSerializer, Doctorserializer
from .models import Doctor, Reset
from django.contrib.auth.models import User
from django.db.models import Q
from django.core.mail import send_mail
from rest_framework import exceptions
import random
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
import string
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'the api'
        }
    ]
    return Response(routes)


@api_view(['POST'])
def Register(request):
    serializer = RegisterSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        user = serializer.save()
        data['response'] = 'yes yes'
        data['email'] = user.email
        data['username'] = user.username

    else:
        data = serializer.errors
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPatients(request):
    q = request.GET.get('q')if request.GET.get('q') != None else ''
    user = request.user
    patients = user.doctor_set.all().filter(Q(Doctor__icontains=q) | Q(
        Patient__icontains=q) | Q(case__icontains=q) | Q(age__icontains=q) | Q(gender__icontains=q) | Q(description__icontains=q)
        | Q(date__icontains=q)).order_by('-date')
    serializer = Doctorserializer(patients,  many=True)
    return Response( serializer.data)

@api_view(['GET'])
def getPatient(request,pk):
    info = Doctor.objects.get(id=pk)
    serializer = Doctorserializer(info, many=False)
    return Response(serializer.data)
@api_view(['POST'])
def Forgot(request):
    email = request.data['email']
    token = ''.join(random.choice(string.ascii_lowercase +
                                  string.digits) for _ in range(10))

    Reset.objects.create(
        email=email,
        token=token
    )

    url = 'http://localhost:3000/reset/' + token

    send_mail(
        subject='Reset your password!',
        message='Click <a href="%s">here</a> to reset your password!' % url,
        from_email='zaidaljamaly90@gmail.com',
        recipient_list=[email]
    )

    return Response({
        'message': 'success'
    })


@api_view(['POST'])
def Resett(request):
    data = request.data

    if data['password'] != data['password2']:
        raise exceptions.APIException('Passwords do not match!')

    reset_password = Reset.objects.filter(token=data['token']).first()

    if not reset_password:
        raise exceptions.APIException('Invalid link!')

    user = User.objects.filter(email=reset_password.email).first()

    if not user:
        raise exceptions.APIException('User not found!')

    user.set_password(data['password'])
    user.save()

    return Response({
        'message': 'success'
    })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update(request,pk):
    data = request.data
    info = Doctor.objects.get(id=pk)
    serializer = Doctorserializer(instance=info,data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request):
    data = request.data
    user=request.user
    info = Doctor.objects.create(
        user=user,
        Doctor=data['Doctor'],
        Patient=data['Patient'],
        case=data['case'],
        age=data['age'],
        gender=data['gender'],
        contact_number=data['contact_number'],
        date=data['date'],
        description=data['description'])
    serializer = Doctorserializer(info, many=False)
    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DeleteInfo(request, pk):
    info = Doctor.objects.get(id=pk)
    info.delete()
    return Response('deleted')
