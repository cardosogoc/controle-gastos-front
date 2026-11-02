import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from './shared/components/global/top-menu/top-menu.component';
import { FooterComponent } from './shared/components/global/footer/footer.component';

@Component({
  imports: [RouterOutlet, TopMenuComponent, FooterComponent ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('controle-gastos-front');
}
