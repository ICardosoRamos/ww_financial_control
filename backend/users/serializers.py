from django.contrib.auth import get_user_model
from rest_framework import serializers
import re


def is_valid_password(password):

    # Check for at least one symbol
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        raise serializers.ValidationError(
            "The password must contain at least one symbol."
        )

    # Check for at least one number
    if not re.search(r"\d", password):
        raise serializers.ValidationError(
            "The password must contain at least one number."
        )

    # Check for at least one uppercase letter
    if not re.search(r"[A-Z]", password):
        raise serializers.ValidationError(
            "The password must contain at least one uppercase letter."
        )

    return True


def is_valid_email(email):
    user = get_user_model().objects.filter(email=email).exists()

    if user:
        raise serializers.ValidationError(
            "A user with that email already exists."
        )


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        min_length=8,
        required=True,
        error_messages={"required": "This field is necessary."},
        validators=[is_valid_password],
    )
    email = serializers.EmailField(validators=[is_valid_email])

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if password:
            instance.set_password(password)
        
        instance.save()

        return instance

    def create(self, validated_data):
        user = get_user_model().objects.create(
            **validated_data
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = "__all__"
