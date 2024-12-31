import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CaptchaService} from '../../services/captcha.service';
import {NgOptimizedImage, NgStyle} from '@angular/common';
import {AuthInputComponent} from '../../components/form/auth-input/auth-input.component';
import {ValidatorService} from '../../services/validator.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    AuthInputComponent,
    NgStyle,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  captchaText!: string;
  captchaImage!: string | null;
  backgroundUrl: string = '';

  emailValidators = [ValidatorService.required(), ValidatorService.email()];
  captchaValidators = [ValidatorService.required(), ValidatorService.minLength(6), ValidatorService.maxLength(6)];

  otpToggle = new FormControl(false , ValidatorService.required());

  email = new FormControl('', this.emailValidators);
  captchaInput = new FormControl('', this.captchaValidators);
  otp = new FormControl('' , [ValidatorService.password()]);
  password = new FormControl('' , [ValidatorService.password()]);

  loginForm = new FormGroup({
    otpToggle: this.otpToggle,
    email: this.email,
    captchaInput: this.password,
    password: this.password,
    otp: this.otp,
  });

  constructor(
    private formBuilder: FormBuilder,
    private captchaService: CaptchaService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.generateNewCaptcha();
    this.setBackgroundImage();
  }
  generateNewCaptcha(): void {
    this.captchaText = this.captchaService.generateCaptcha();
    this.captchaImage = this.captchaService.generateCaptchaImage(this.captchaText);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const userInput = this.loginForm.value.captchaInput;
      if (userInput === this.captchaText) {
        alert('Login successful!');
      } else {
        alert('CAPTCHA validation failed! Please try again.');
        this.generateNewCaptcha();
      }
    }
  }

  setBackgroundImage(): void {
    const backgrounds: string[] = ['/images/static/Slider-1.jpg', '/images/static/Slider-2.jpg', '/images/static/Slider-3.jpg', '/images/static/Slider-4.jpg',];
    const randomIndex: number = Math.floor(Math.random() * backgrounds.length);
    this.backgroundUrl = `url('${backgrounds[randomIndex]}')`;
    this.cdr.detectChanges();
  }
}
