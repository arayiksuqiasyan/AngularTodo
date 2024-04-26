import { Routes } from '@angular/router';
import {ListPageComponent} from "./pages/list-page/list-page.component";
import {AddPageComponent} from "./pages/add-page/add-page.component";
import {FavoritePageComponent} from "./pages/favorite-page/favorite-page.component";

export const routes: Routes = [
  {
    path: 'list',
    component:ListPageComponent
  },
  {
    path: 'add',
    component:AddPageComponent
  },
  {
    path: 'favorite',
    component:FavoritePageComponent
  },
  {
    path:'',
    redirectTo:'list',
    pathMatch: 'full',
  }
];
