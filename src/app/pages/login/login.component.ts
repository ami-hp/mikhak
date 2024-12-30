import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CaptchaService} from '../../services/captcha.service';
import {ValidatorService} from '../../services/validator.service';
import {NgOptimizedImage, NgStyle} from '@angular/common';
import {AuthInputComponent} from '../../components/form/auth-input/auth-input.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    AuthInputComponent,
    NgStyle,
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  captchaText!: string;
  captchaImage!: string | null;
  backgroundUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private captchaService: CaptchaService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.generateNewCaptcha();
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [ValidatorService.required(), ValidatorService.email()]),
      password: new FormControl('', [ValidatorService.required(), ValidatorService.minLength(8), ValidatorService.maxLength(20), ValidatorService.password()]),
      captchaInput: new FormControl('', [ValidatorService.required(), ValidatorService.minLength(6), ValidatorService.maxLength(6), ValidatorService.string()]),
    });
    this.setBackgroundImage();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get captchaInput() {
    return this.loginForm.get('captchaInput');
  }

  generateNewCaptcha(): void {
    this.captchaText = this.captchaService.generateCaptcha();
    this.captchaImage = this.captchaService.generateCaptchaImage(this.captchaText);
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const userInput = this.loginForm.value.captchaInput;
      if (userInput === this.captchaText) {
        alert('Login successful!');
      } else {
        alert('CAPTCHA validation failed! Please try again.');
        this.generateNewCaptcha();
      }
    }
  }

  getFormControl(controlName: string): FormControl {
    return this.loginForm.get(controlName) as FormControl;
  }

  setBackgroundImage(): void {
    const backgrounds: string[] = ['/images/static/Slider-1.jpg', '/images/static/Slider-2.jpg', '/images/static/Slider-3.jpg', '/images/static/Slider-4.jpg',];
    const randomIndex: number = Math.floor(Math.random() * backgrounds.length);
    this.backgroundUrl = `url('${backgrounds[randomIndex]}')`;
    this.cdr.detectChanges();
  }
}
