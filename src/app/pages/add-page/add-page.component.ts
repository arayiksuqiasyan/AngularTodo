import {Component} from '@angular/core';
import {switchMap} from "rxjs";
import {StorageMap} from "@ngx-pwa/local-storage";
import {CommonModule} from "@angular/common";
import {v4 as uuidv4} from 'uuid';
import {ToastrService} from 'ngx-toastr';
import {Validators, FormsModule, FormBuilder, ReactiveFormsModule, FormGroup} from "@angular/forms";
import {NgbInputDatepicker, NgbTimepicker, NgbTimepickerConfig} from "@ng-bootstrap/ng-bootstrap";

import {IForm} from "../../models/add-page";
import {ITodo} from "../../models/list-page";
import {StorageService} from "../../services/storage.service";
import {ErrorMessageComponent} from "../../components/error-message/error-message.component";
import {timeNotBeforeValidator, trimmedRequired} from "../../helpers/helpers";
import {getDate, getMonth, getYear} from "date-fns";


@Component({
  selector: 'app-add-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbTimepicker,
    NgbInputDatepicker,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.scss'
})
export class AddPageComponent {
  currentDate = {
    year: getYear(new Date()),
    month: getMonth(new Date()) + 1,
    day: getDate(new Date())
  };

  form: FormGroup = this.fb.group<IForm>({
    title: ['', [trimmedRequired]],
    description: [''],
    expirationDate: [null, [Validators.required]],
    time: [null, [Validators.required, timeNotBeforeValidator(this, 'expirationDate')]],
  })

  constructor(private config: NgbTimepickerConfig, private fb: FormBuilder, private storage: StorageMap, private storageService: StorageService, private toaster: ToastrService) {
    config.seconds = true;
    config.spinners = false;
  }

  onDateSelect() {
    this.form.controls['time'].updateValueAndValidity();
  }

  onSubmit() {
    this.storageService.getTodos().pipe(
      switchMap((data) => {
        const {title, description, expirationDate, time} = this.form.value
        const formData: ITodo = {time, title, description, id: uuidv4(), expirationDate,isFavorite:false};
        if (data && Array.isArray(data)) {
          const updatedTodos = [...data, formData];
          return this.storageService.setTodos(updatedTodos)
        } else {
          return this.storageService.setTodos([formData]);
        }
      })
    ).subscribe(() => {
      this.form.reset()
      this.toaster.success('', 'Todo created successfully!', {
        positionClass: 'toast-top-center'
      });
    });

  }

}
