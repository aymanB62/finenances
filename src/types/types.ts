export interface Hucha {
    hucha_id: number;
    user_id: number;
    name: string;
    description?: string;
    meta: number;
    saldo_actual: number;
    completa: boolean;
    icon?: string;
    created_at: string;
    completed_at?: string;
  }
  
  export interface Movimiento {
    transaction_id: number;
    hucha_id: number;
    cantidad: number;
    descripcion?: string;
    fecha: string;
  }
  
  export interface User {
    user_id: number;
    name: string;
    email: string;
    notifications_enabled: boolean;
    created_at: string;
  }