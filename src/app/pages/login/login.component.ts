import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors} from '@angular/forms';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {CaptchaService} from '../../services/captcha.service';
import {ValidatorService} from '../../services/validator.service';
import {DbService} from '../../services/db.service';
import {AuthInputComponent} from '../../components/form/auth-input/auth-input.component';
import {UtilityService} from '../../services/utility.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    AuthInputComponent,
    FormsModule,
    NgClass,
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
  otpSent: boolean = false;

  timeLeft: number = 120;
  interval: any;

  fields: string[] = [
    'otpToggle',
    'email',
    'meli',
    'captchaInput',
    'password',
    'otp',
  ];

  otpToggle: FormControl = new FormControl(false);
  email: FormControl = new FormControl(null, [ValidatorService.required(), ValidatorService.email()]);
  meli: FormControl = new FormControl(null, [ValidatorService.requiredIf(this.otpToggle.value ?? false), ValidatorService.numeric()]);
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
    private dbService: DbService,
  ) {
  }

  ngOnInit(): void {
    this.generateNewCaptcha();

    this.otpToggle.valueChanges.subscribe((value): void => {
      if(!value){
        this.otpSent = false;
        this.stopTimer();
      }
    })
  }

  ngDoCheck(): void {
    if (this.loginForm.invalid) {
      (new ValidatorService()).setFormErrors(this.loginForm , this.fields);
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
              if (!this.otpToggle && this.email.value == user.email && this.password.value == user.password) {
                console.log('SUBMIT : PASSWORD IS CORRECT')
                alert('خوش آمدید')
              } else if (this.otpToggle && this.email.value == user.email && this.otp.value == this.code) {
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

  sendCode(e: any) {
    e.preventDefault();
    this.dbService.getDb().subscribe(data => {
      this.db = data;
      this.code = this.db.otp[0].code;
      alert(this.db.users[0].email + " : " + this.code);
      this.email.setValue(this.db.users[0].email);
      this.otpSent = true;
      this.startTimer();
    });
  }

  generateNewCaptcha(): void {
    this.captchaText = this.captchaService.generateCaptcha();
    this.captchaImage = this.captchaService.generateCaptchaImage(this.captchaText);
  }

  startTimer() {
    this.interval = (new UtilityService()).startTimer(this.interval, this, () => {
      alert('وقت تمام شد.')
    });
  }

  stopTimer() {
    clearInterval(this.interval);
    this.interval = undefined;
    this.timeLeft = 120;
  }

  convertSecondsToMinutesSeconds(seconds: number): string {
    return (new UtilityService()).convertSecondsToMinutesSeconds(seconds);
  }

}
