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
  isFormSubmitted: boolean = false;
  db: any;

  fields: string[] = [
    'otpToggle',
    'email',
    'captchaInput',
    'password',
    'otp',
  ];

  otpToggle: FormControl = new FormControl(false);
  email: FormControl = new FormControl(null, [ValidatorService.required(), ValidatorService.email()]);
  captchaInput: FormControl = new FormControl(null, [ValidatorService.required(), ValidatorService.minLength(6), ValidatorService.maxLength(6)]);
  otp: FormControl = new FormControl(null, [ValidatorService.requiredWithoutAll(['password'])]);
  password: FormControl = new FormControl(null, [ValidatorService.requiredWithoutAll(['otp'])]);

  loginForm: FormGroup = new FormGroup({
    otpToggle: this.otpToggle,
    email: this.email,
    captchaInput: this.captchaInput,
    password: this.password,
    otp: this.otp,
  });

  constructor(
    private captchaService: CaptchaService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.generateNewCaptcha();
    this.setBackgroundImage();
    // this.listenOnFormChange();

  }

  private listenOnFormChange() {
    this.loginForm.get('otpToggle')?.valueChanges.subscribe((value) => {
      if (value) {
        this.password.setValue(null)
      } else {
        this.otp.setValue(null);
      }
    });
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.loginForm.valid) {
      const userInput = this.loginForm.value.captchaInput;
      if (userInput === this.captchaText) {
        console.log('SUBMIT : CAPTCHA IS CORRECT')
        this.fetchData()

      } else {
        alert('CAPTCHA validation failed! Please try again.');
        this.generateNewCaptcha();
      }
    }
  }

  fetchData() {
    return fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        this.db = data;
        let user = this.db.users[0];
        let otp = this.db.otp[0];
        if(!this.otpToggle && this.loginForm.get('email')?.value == user.email && this.loginForm.get('password')?.value == user.password) {
          console.log('SUBMIT : PASSWORD IS CORRECT')
        }else if(this.otpToggle && this.loginForm.get('email')?.value == user.email && this.loginForm.get('otp')?.value == otp.code){
          console.log('SUBMIT : PASSWORD IS CORRECT')
        } else {
          console.log('SUBMIT : CREDENTIALS INCORRECT')
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  ngDoCheck(): void {
    if (this.loginForm.invalid) {
      this.setErrors();
      console.log("Form is invalid:", this.loginForm.errors , this.loginForm.value);
    } else {
      console.log("FORM VALID");
    }
  }

  setErrors() {
    let errors = this.loginForm.errors || {};
    for (let field of this.fields) {
      errors[field] = this.loginForm.get(field)?.errors;
    }
    this.loginForm.setErrors(errors);
  }

  generateNewCaptcha(): void {
    this.captchaText = this.captchaService.generateCaptcha();
    this.captchaImage = this.captchaService.generateCaptchaImage(this.captchaText);
  }

  setBackgroundImage(): void {
    const backgrounds: string[] = ['/images/static/Slider-1.jpg', '/images/static/Slider-2.jpg', '/images/static/Slider-3.jpg', '/images/static/Slider-4.jpg',];
    const randomIndex: number = Math.floor(Math.random() * backgrounds.length);
    this.backgroundUrl = `url('${backgrounds[randomIndex]}')`;
    this.cdr.detectChanges();
  }
}
