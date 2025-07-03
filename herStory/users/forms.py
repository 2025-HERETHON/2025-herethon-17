from django import forms
from django.contrib.auth import get_user_model

User = get_user_model()

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'real_name', 'school_name', 'grade_level']
        labels = {
            'username': '닉네임',
            'real_name': '성함',
            'school_name': '학교 이름',
            'grade_level': '학년',
        }
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '닉네임'}),
            'real_name': forms.TextInput(attrs={'class':'form-control', 'placeholder': '성함'}),
            'school_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '학교 이름'}),
            'grade_level': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': '학년'}),
        }

    def clean_grade_level(self):
        grade = self.cleaned_data.get('grade_level')
        if grade is not None and (grade < 1 or grade > 6):
            raise forms.ValidationError('학년은 1~6 사이의 숫자여야 합니다.')
        return grade
