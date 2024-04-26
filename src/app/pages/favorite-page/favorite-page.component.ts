import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";

import {ITodo} from "../../models/list-page";
import {RootService} from "../../services/root.service";
import {TodoListComponent} from "../../components/todo-list/todo-list.component";

@Component({
  selector: 'app-favorite-page',
  standalone: true,
  imports: [
    CommonModule,
    TodoListComponent
  ],
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.scss'
})
export class FavoritePageComponent {

  constructor(public rootService: RootService) {
  }

  get favoriteData() {
    return this.rootService.allTodos.value.filter((el: ITodo) => el.isFavorite)
  }

}
