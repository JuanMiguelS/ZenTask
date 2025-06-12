export class Item {
  id!: number;
  title!: string;
  time!: number;       // en segundos
  timeDone!: number;   // en segundos
  completed!: boolean;
  hour?: number;
  minute?: number;
  sec?: number;


    constructor(id: number = 0, title: string = '', time: number = 0, timeDone: number = 0, completed: boolean = false, hour:number =0, minute:number=0, sec:number=0) {
      this.id = id;
      this.title = title;
      this.time = time; //tiempo total
      this.timeDone = timeDone; //tiempo hecho hasta ese momento
      this.completed = completed; //booleano para ver si tarea ha sido compleatada
      this.hour = hour;
      this.minute = minute;
      this.sec = sec;
    }
  }
