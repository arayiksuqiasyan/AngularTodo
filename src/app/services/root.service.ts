import {Injectable} from '@angular/core';
import {BehaviorSubject, of, switchMap} from "rxjs";
import {ITodo} from "../models/list-page";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class RootService {
  todayList: BehaviorSubject<ITodo[] | []> = new BehaviorSubject<ITodo[] | []>([]);
  allTodos: BehaviorSubject<ITodo[] | []> = new BehaviorSubject<ITodo[] | []>([]);

  constructor(private storageService: StorageService) {
  }

  onTriggerFavorite(todo: ITodo) {
    this.storageService.getTodos().pipe(
      switchMap((data: unknown | ITodo[]) => {
        if (Array.isArray(data)) {
          const newData = data as ITodo[];
          const finedIndex = newData.findIndex((el) => el.id === todo.id);
          if (finedIndex !== -1) {
            newData[finedIndex].isFavorite = !newData[finedIndex].isFavorite;
            return this.storageService.setTodos(newData)
          }
        }
        return of(undefined)
      })
    ).subscribe()

  }

  deleteTodo(todo: ITodo) {
    this.storageService.getTodos().subscribe((data) => {
      if (Array.isArray(data)) {
        this.storageService.setTodos(data.filter((el: ITodo) => el.id !== todo.id)).subscribe()
      }
    })
  }

}
