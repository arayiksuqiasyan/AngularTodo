import { Injectable } from '@angular/core';
import {StorageMap} from "@ngx-pwa/local-storage";
import {STORAGE_TODOS} from "../helpers/helpers";
import {Observable} from "rxjs";
import {ITodo} from "../models/list-page";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage:StorageMap) {}


  getTodos():Observable<unknown | ITodo[]>{
    return this.storage.get(STORAGE_TODOS)
  }

  setTodos(data:ITodo[]):Observable<undefined | ITodo[]>{
    return this.storage.set(STORAGE_TODOS, data)
  }

}
