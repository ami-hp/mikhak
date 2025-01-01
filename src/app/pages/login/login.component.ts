import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CaptchaService} from '../../services/captcha.service';
import {NgOptimizedImage, NgStyle} from '@angular/common';
import {AuthInputComponent} from '../../components/form/auth-input/auth-input.component';
import {ValidatorService} from '../../services/validator.service';
import {DbService} from '../../services/db.service';
import {timer} from 'rxjs';
import {take} from 'rxjs/operators';

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

  timeLeft: number = 120;
  interval: any;

  startTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.timeLeft = 120;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

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
  private code: any;

  constructor(
    private captchaService: CaptchaService,
    private cdr: ChangeDetectorRef,
    private dbService: DbService
  ) {
  }

  ngOnInit(): void {
    this.generateNewCaptcha();
    this.setBackgroundImage();
  }

  ngDoCheck(): void {
    if (this.loginForm.invalid) {
      this.setErrors();
    } else {
      console.log("FORM VALID");
    }
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.loginForm.valid) {
      const userInput = this.loginForm.value.captchaInput;
      if (userInput === this.captchaText) {
        console.log('SUBMIT : CAPTCHA IS CORRECT')

        this.dbService.getDb()
          .subscribe({
            next: data => {
              this.db = data;
              let user = this.db.users[0];
              if (!this.otpToggle && this.loginForm.get('email')?.value == user.email && this.loginForm.get('password')?.value == user.password) {
                console.log('SUBMIT : PASSWORD IS CORRECT')
                alert('خوش آمدید')
              } else if (this.otpToggle && this.loginForm.get('email')?.value == user.email && this.loginForm.get('otp')?.value == this.code) {
                console.log('SUBMIT : OTP IS CORRECT')
                alert('خوش آمدید')
              } else {
                console.log('SUBMIT : CREDENTIALS INCORRECT')
              }
            },
            error(err) {
              console.error('something wrong occurred: ' + err);
            },
            complete() {
              console.log('done');
            },
          });

      } else {
        alert('CAPTCHA validation failed! Please try again.');
        this.generateNewCaptcha();
      }
    }
  }

  getCode() {
    this.dbService.getDb().subscribe(data => {
      this.db = data;
      this.code = this.db.otp[0].code;
      alert(this.db.users[0].email + " : " + this.code);

      this.startTimer();
    });
  }

  generateNewCaptcha(): void {
    this.captchaText = this.captchaService.generateCaptcha();
    this.captchaImage = this.captchaService.generateCaptchaImage(this.captchaText);
  }

  convertSecondsToMinutesSeconds(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  private setErrors() {
    let errors = this.loginForm.errors || {};
    for (let field of this.fields) {
      errors[field] = this.loginForm.get(field)?.errors;
    }
    this.loginForm.setErrors(errors);
  }

  private setBackgroundImage(): void {
    const backgrounds: string[] = ['/images/static/Slider-1.jpg', '/images/static/Slider-2.jpg', '/images/static/Slider-3.jpg', '/images/static/Slider-4.jpg',];
    const randomIndex: number = Math.floor(Math.random() * backgrounds.length);
    this.backgroundUrl = `url('${backgrounds[randomIndex]}')`;
    this.cdr.detectChanges();
  }

  private listenOnFormChange() {
    this.loginForm.get('otpToggle')?.valueChanges.subscribe({
      next: (value) => {
        if (value) {
          this.password.setValue(null)
        } else {
          this.otp.setValue(null);
        }
      }
    });
  }
}
