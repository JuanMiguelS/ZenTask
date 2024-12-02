import { Component, OnInit , NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../../Models/Item';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Timer {
  id: number;
  name: string;
  duration: number; // Duración en segundos
  originalDuration: number;
  remaining: number; // Tiempo restante en segundos
  isPaused: boolean;
  isStarted: boolean;
  intervalId?: any;  // Referencia al intervalo para actualizaciones

  repeat: boolean;
  restPeriod: number;
  isResting?: boolean;
}

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <h2>Register New Task</h2>
      <div>
        <label for="" i18n>Id</label>
        <input type="number" [(ngModel)]="id" name="id">
      </div>
      <div>
        <label for="name" i18n>Name of the Task</label>
        <input type="text" [(ngModel)]="title" name="name">
      </div>
      <div>
        <label for="time" i18n>Time</label>
        <input type="number" [(ngModel)]="time" name="time">
      </div>
      <div>
        <label for="timeLeft" i18n>TimeLeft</label>
        <input type="number" [(ngModel)]="timeLeft" name="timeLeft">
      </div>
      <input type="submit" value="Confirm">
    </form>
  `,
  styleUrls: ['./add-item.component.css']  // Asegúrate de que el archivo CSS está correctamente referenciado
})

export class AddItemComponent implements OnInit {
  id: number = 0;
  title: string = '';
  time: number = 0;       // Cambié de 'price' a 'time'
  timeLeft: number = 0;   // Cambié de 'quantity' a 'timeLeft'
  timers: Timer[] = [];
  private nextId = 1;

  isDialogOpen = false;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  repeat: boolean = false;
  restMinutes: number = 0;



  openAddTimerDialog(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.resetDialogInputs();
  }

  confirmAddTimer(): void {
    if (this.hours >= 0 && this.minutes >= 0 && this.seconds >= 0) {
      const restPeriod = this.repeat ? this.restMinutes * 60 : 0; // Período de descanso en segundos

      this.addTimer(this.hours, this.minutes, this.seconds, this.repeat, restPeriod);
    this.closeDialog();
    } else {
    alert('Por favor, introduce un nombre válido y valores de tiempo correctos.');

    }
  }

  resetDialogInputs(): void {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;

    this.repeat = false;
    this.restMinutes = 0;
  }

  addTimer( hours: number, minutes: number, seconds: number, repeat: boolean, restPeriod: number): void {
    const duration = hours * 3600 + minutes * 60 + seconds;
    if (duration > 0) {
    const newTimer: Timer = {
      id: this.nextId++,
      duration: duration,
      originalDuration: duration,
      remaining: duration,
      isPaused: true,
      isStarted: false,
      repeat: repeat,
      restPeriod: restPeriod
    };

    this.timers.push(newTimer);
    //this.startTimer(newTimer);
    this.initializeTimer(newTimer);
  } else {
    alert('El tiempo total debe ser mayor a 0.');
  }
}

initializeTimer(timer: Timer): void {
timer.isPaused = true;
timer.isStarted = true;
}

  startTimer(timer: Timer): void {

    timer.isPaused = false;
    timer.intervalId = setInterval(() => {
      if (timer.remaining > 0) {
        timer.remaining--;
      } else {
        clearInterval(timer.intervalId);



        if (timer.repeat && timer.restPeriod > 0) {
          // Configurar el temporizador para descansar y reiniciarse
          this.startRestPeriod(timer);
        }
      }
    }, 1000);
  }




  startRestPeriod(timer: Timer): void {
    timer.remaining = timer.restPeriod; // Configura el tiempo de descanso
    timer.isResting = true;
    timer.isPaused = false;

    timer.intervalId = setInterval(() => {
      if (timer.remaining > 0) {
        timer.remaining--;
      } else {
        clearInterval(timer.intervalId);

        // Reiniciar el temporizador original
        timer.remaining = timer.duration;
        timer.isResting = false;
        this.startTimer(timer);
      }
    }, 1000);
  }

  pauseTimer(timer: Timer): void { // NUEVO: Función para pausar el temporizador
    if (!timer.isPaused) {
      clearInterval(timer.intervalId);
      timer.isPaused = true;
    }
  }

  resumeTimer(timer: Timer): void { // NUEVO: Función para reanudar el temporizador
    if (timer.isPaused) {
      this.startTimer(timer);
    }
  }

  resetTimer(timer: Timer): void {
    clearInterval(timer.intervalId);
    timer.remaining = timer.originalDuration; // Reinicia el tiempo restante
    timer.isPaused = true;
    this.initializeTimer(timer); // Inicia el temporizador desde el principio
  }


  removeTimer(timerId: number): void {
    const timerIndex = this.timers.findIndex(t => t.id === timerId);
    if (timerIndex > -1) {
      clearInterval(this.timers[timerIndex].intervalId);
      this.timers.splice(timerIndex, 1);
    }
  }

  formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }



  ngOnInit(): void {}

  onSubmit() {
    const item = new Item();
    item.id = this.id;
    item.title = this.title;
    item.time = this.time;       // Asegúrate de que 'price' es correcto
    item.timeDone = this.timeLeft; // Asegúrate de que 'quantity' es correcto
    item.completed = false;

    this.ItemService.addItems(item);
    this.router.navigate(['/']);
  }
}
