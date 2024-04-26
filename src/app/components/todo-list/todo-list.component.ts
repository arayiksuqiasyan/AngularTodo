import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CheckboxComponent} from "../checkbox/checkbox.component";

import {ITodo} from "../../models/list-page";
import {convertDateObjectToText} from "../../helpers/helpers";
import {TimerComponent} from "../timer/timer.component";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxComponent,
    TimerComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() isToday:boolean = false;
  @Input() title!:string;
  @Input() data!:ITodo[] | [];
  @Output() onTriggerFavorite:EventEmitter<any> = new EventEmitter<ITodo>()
  @Output() onDelete:EventEmitter<any> = new EventEmitter<ITodo>()


  protected readonly convertDateObjectToText = convertDateObjectToText;
}
