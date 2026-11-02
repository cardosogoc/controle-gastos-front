import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule],
  selector: 'app-top-menu',
  styleUrl: './top-menu.component.scss',
  templateUrl: './top-menu.component.html',
})
export class TopMenuComponent {
  estaLogado: boolean = false;

}
