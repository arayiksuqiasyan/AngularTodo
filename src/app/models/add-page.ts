import {AbstractControl, FormControl, ValidationErrors, Validators} from "@angular/forms";

export interface IDateValue {
  year: number,
  month: number,
  day: number,
}

export interface ITimeValue {
  hour: number,
  minute: number,
  second: number
}

export interface IForm {
  title: [string, ValidationErrors | null];
  description: [string];
  expirationDate: [Date | null, ValidationErrors | null];
  time: [Date | null, ValidationErrors | null];
}
