export class Item {
    id: number;
    title: string;
    time: number;
    timeDone: number;
    completed: boolean;

    constructor(id: number = 0, title: string = '', time: number = 0, timeDone: number = 0, completed: boolean = false) {
      this.id = id;
      this.title = title;
      this.time = time; //tiempo total
      this.timeDone = timeDone; //tiempo hecho hasta ese momento
      this.completed = completed; //booleano para ver si tarea ha sido compleatada
    }
  }
