import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  contactForm: FormGroup;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      age: ['', [
        Validators.required,
        Validators.min(18),
        Validators.max(120)
      ]],
      workEmail: ['', [
        Validators.required,
        Validators.email
      ]],
      gender: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')
      ]],
      confirmPassword: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    }, { 
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  // Custom validator to check if two fields match
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // Convenience getter for easy access to form fields
  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    // Here you would typically send the form data to a server
    console.log('Form submitted', this.contactForm.value);
    
    // Show success message
    alert('Message sent successfully!');
    
    // Reset form
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.contactForm.reset();
    this.showPassword = false;
    this.showConfirmPassword = false;
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.contactForm.get('password')?.value || '');
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.contactForm.get('password')?.value || '');
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.contactForm.get('password')?.value || '');
  }

  hasSpecialChar(): boolean {
    return /[^A-Za-z0-9]/.test(this.contactForm.get('password')?.value || '');
  }

  hasMinLength(): boolean {
    return (this.contactForm.get('password')?.value?.length || 0) >= 8;
  }
}
