import { Component, computed, inject, signal } from '@angular/core';
import { email, form, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RegisterRequest } from '../../models/register-request';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormField,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  selector: 'app-register',
  styleUrl: './register.component.scss',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  imgHero = 'assets/mainmenu.jpg';

  protected nome = form(signal(''));
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

  private authService = inject(AuthService);

  protected cadastrar() {
    if (!this.senhaValida()) return;

    const payload: RegisterRequest = {
      nome: this.nome().value(),
      email: this.email().value(),
      telefone: this.telefone().value().replace(/\D/g, ''),
      senha: this.senha().value(),
    };

    this.authService.register(payload).subscribe({
      next: () => console.log('Cadastrado com sucesso'),
      error: (err) => console.error('Erro ao cadastrar', err),
    });
  }
}
