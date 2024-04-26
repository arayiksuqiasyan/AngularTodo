import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbInputDatepicker, NgbDatepicker} from "@ng-bootstrap/ng-bootstrap";

import {RootService} from "../../services/root.service";
import {TodoListComponent} from "../../components/todo-list/todo-list.component";

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    NgbDatepicker,
    TodoListComponent,
    NgbInputDatepicker,
    ReactiveFormsModule,
  ],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent {
  constructor(public rootService: RootService) {
  }

}
