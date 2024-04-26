import {Component} from '@angular/core';
import {ILinks, LINKS} from "./constats";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgForOf, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public links: ILinks[] = LINKS;
  public activeLinkId:number = LINKS[0].id;

}
