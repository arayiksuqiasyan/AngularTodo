import {AbstractControl, FormControl} from "@angular/forms";
import {format, isBefore, isToday} from "date-fns";
import {ITodo} from "../models/list-page";
import {IDateValue} from "../models/add-page";

export const STORAGE_TODOS = 'todos';

export function trimmedRequired(control: FormControl) {
  const value = control.value ? control.value.trim() : '';
  return value ? null : {required: true};
}

export function timeNotBeforeValidator(that: any, key: string): { [key: string]: any } | null {
  return (control: AbstractControl) => {
    if (control.value) {
      const selectedTime = control.value;
      const date = that.form.controls?.[key]?.value;
      const targetDate = new Date(date?.year || 0, date?.month - 1 || 0, date?.day || 0, selectedTime.hour, selectedTime.minute, selectedTime.second);

      if (!date || !selectedTime || isBefore(targetDate, new Date())) {
        return {'timeBeforeError': {value: control.value}};
      }
    }
    return null;
  }
};

export function convertDateObjectToText(obj: IDateValue) {
  const formattedDate = new Date(obj.year, obj.month - 1, obj.day);
  return format(formattedDate, 'MMM d, yyyy');
}

export function findTodosForToday(data: ITodo[]): ITodo[] | [] {
  return data.filter((todo: ITodo): boolean => {
    if (todo.expirationDate && todo.time) {
      const expirationDateTime = new Date(todo.expirationDate.year, todo.expirationDate.month - 1, todo.expirationDate.day, todo.time.hour, todo.time.minute, todo.time.second);
      return isToday(expirationDateTime);
    }
    return false;
  })
}


