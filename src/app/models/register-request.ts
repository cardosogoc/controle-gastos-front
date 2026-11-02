export interface RegisterRequest {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
}

export interface RegisterResponse {
  id: number;
  nome: string;
  email: string;
}
