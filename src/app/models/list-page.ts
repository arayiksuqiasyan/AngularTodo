export interface ITodo {
  id:string,
  title: string,
  isFavorite:boolean,
  description?: string,
  expirationDate: { year: number, month: number, day: number },
  time: { hour: number, minute: number, second: number }
}
