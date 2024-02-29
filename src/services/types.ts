export interface Reservation {
  Data: string;
  Subsistema: string;
  Bacia: string;
  Reservatorio: string;
  ReservatorioMax: number;
  ReservatorioEARVerificadaMWMes: number;
  ReservatorioEARVerificadaPorcentagem: number;
  ReservatorioValorUtil: number;
  ReservatorioPorcentagem: number;
  BaciaMax: number;
  BaciaEARVerificadaMWMes: number;
  BaciaEARVerificadaPorcentagem: number;
  BaciaPorcentagem: number;
  SubsistemaMax: number;
  SubsistemaEARVerificadaMWMes: number;
  SubsistemaValorUtil: number;
  SINMax: number;
  SINEARVerificadaMWMes: number;
  SINEARPorcentagem: number;
}

export interface ReservationsData {
  North: Reservation[];
  NorthEast: Reservation[];
  South: Reservation[];
  SoutheastMidwest: Reservation[];
}
