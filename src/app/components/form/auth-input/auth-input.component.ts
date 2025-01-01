import {Component, Input, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'auth-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-input.component.html',
  standalone: true,
  styleUrl: './auth-input.component.scss'
})
export class AuthInputComponent implements OnInit {
  @Input() label?: string;
  @Input() control!: FormControl;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() autocomplete: string = "off";
  @Input() dynamicClass: string = '';
  @Input() dynamicStyle: object = {};
  @Input() isFormSubmitted: boolean = false;

  ngOnInit(): void {
  }



  getType(t : any) {
    return typeof t;
  }

  get errors(){
    if (this.name && this.control.invalid && (this.control.parent?.errors?.[this.name]) && (this.control.dirty || this.control.touched || this.isFormSubmitted)) {
      return this.toIterable(this.control.errors ?? {});
    }
    return [];
  }
  toIterable(obj : object) {
    return Object.values(obj).map((o) => {
      return o;
    });
  }

  ngDoCheck(){
  }
}
