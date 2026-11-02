import { BidiModule } from '@angular/cdk/bidi';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

interface LancamentoExemplo {
  descricao: string;
  categoria: string;
  tipo: 'RECEITA' | 'DESPESA';
  valor: number;
  data: Date;
}

@Component({
  imports: [MatButtonModule, CurrencyPipe, DatePipe, NgClass, BidiModule, ],
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  imgHero = '/assets/mainmenu.jpg';

  lancamentos: LancamentoExemplo[] = [
    { descricao: 'Salário', categoria: 'Salário', tipo: 'RECEITA', valor: 3500, data: new Date(2026, 10, 5) },
    { descricao: 'Aluguel', categoria: 'Moradia', tipo: 'DESPESA', valor: 1200, data: new Date(2026, 10, 10) },
    { descricao: 'Supermercado', categoria: 'Alimentação', tipo: 'DESPESA', valor: 385.9, data: new Date(2026, 10, 12) },
    { descricao: 'Freelance', categoria: 'Renda extra', tipo: 'RECEITA', valor: 600, data: new Date(2026, 10, 15) },
    { descricao: 'Internet', categoria: 'Contas', tipo: 'DESPESA', valor: 99.9, data: new Date(2026, 10, 18) },
  ];

   get totalReceitas(): number {
    return this.somar('RECEITA');
  }

  get totalDespesas(): number {
    return this.somar('DESPESA');
  }

  get saldo(): number {
    return this.totalReceitas - this.totalDespesas;
  }

  private somar(tipo: LancamentoExemplo['tipo']): number {
    return this.lancamentos
      .filter((l) => l.tipo === tipo)
      .reduce((total, l) => total + l.valor, 0);
  }
}
