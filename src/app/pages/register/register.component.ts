import { Component, computed, signal } from '@angular/core';
import { email, form, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormField,
    MatCardModule,
  ],
  selector: 'app-register',
  styleUrl: './register.component.scss',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  imgHero = 'assets/mainmenu.jpg';

  protected senha = form(signal(''));
  protected confirmarSenha = form(signal(''));
  protected telefone = form(signal(''));

  protected requisitos = computed(() => {
    const valor = this.senha().value();
    const confirmacao = this.confirmarSenha().value();
    return [
      { texto: '6 dígitos', ok: valor.length >= 6 },
      { texto: 'Letra maiúscula', ok: /[A-Z]/.test(valor) },
      { texto: 'Letra minúscula', ok: /[a-z]/.test(valor) },
      { texto: 'Símbolo', ok: /[^A-Za-z0-9]/.test(valor) },
      { texto: 'Número', ok: /[0-9]/.test(valor) },
      { texto: 'Senhas iguais', ok: valor.length > 0 && valor === confirmacao },
    ];
  });

  protected senhaValida = computed(() => this.requisitos().every((r) => r.ok));

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  hideConfirm = signal(true);

  clickEventConfirm(event: MouseEvent) {
    this.hideConfirm.set(!this.hideConfirm());
    event.stopPropagation();
  }

  protected email = form(signal(''), (p) => {
    email(p, { message: 'Insira um email válido' });
  });

  protected formatarTelefone(event: Event) {
  const input = event.target as HTMLInputElement;

  const d = input.value.replace(/\D/g, '').slice(0, 11);

  let formatado = d;
  if (d.length > 10) {
    formatado = `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  } else if (d.length > 6) {
    formatado = `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  } else if (d.length > 2) {
    formatado = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  } else if (d.length > 0) {
    formatado = `(${d}`;
  }

  input.value = formatado;
  this.telefone().value.set(formatado);
}
}
