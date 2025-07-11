from django import forms
from django.contrib.auth import get_user_model

User = get_user_model()

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email']
        labels = {
            'username': '성함',
            'email':'이메일',
        }
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '성함'}),
            'email': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '이메일'}),
        }