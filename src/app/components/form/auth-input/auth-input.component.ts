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
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() autocomplete: string = "off";
  @Input() dynamicClass: string = '';
  @Input() dynamicStyle: object = {};

  ngOnInit(): void {
    // this.test_onChange();
  }

  test_onChange(): void {
    this.control?.valueChanges.subscribe((value) => {
      for(let er of this.errors){
        if(typeof er.message === 'object'){
          console.log('obj')
        } else {
          console.log(er.message)
        }
      }
    });
  }

  getType(t : any) {
    return typeof t;
  }

  get errors(){
    if (this.control && this.control.errors && this.control.dirty) {
      return this.toIterable(this.control.errors);
    }
    return [];
  }
  toIterable(obj : object) {
    return Object.values(obj).map((o) => {
      return o;
    });
  }
}