import {Component, OnInit} from '@angular/core';
import {StorageMap} from "@ngx-pwa/local-storage";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterOutlet, RouterLinkActive,} from '@angular/router';

import {ITodo} from "./models/list-page";
import {RootService} from "./services/root.service";
import {HeaderComponent} from "./components/header/header.component";
import {findTodosForToday, STORAGE_TODOS} from "./helpers/helpers";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private storage: StorageMap, private rootService: RootService) {
  }

  ngOnInit() {
    this.storage.watch(STORAGE_TODOS).subscribe((data) => {
      if (Array.isArray(data)) {
        this.rootService.allTodos.next(data);
        this.rootService.todayList.next(findTodosForToday(data as ITodo[]))
      }
    })
  }
}
