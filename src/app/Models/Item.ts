export class Item {
    id: number;
    title: string;
    time: number;
    timeLeft: number;
    completed: boolean;
  
    constructor(id: number = 0, title: string = '', time: number = 0, timeLeft: number = 0, completed: boolean = false) {
      this.id = id;
      this.title = title;
      this.time = time;
      this.timeLeft = timeLeft;
      this.completed = completed;
    }
  }
  