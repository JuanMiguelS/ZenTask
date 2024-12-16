import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Timer } from '../../Models/Timer';


@Component({
  standalone: true,
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css'],
  imports: [FormsModule, CommonModule]
})




export class CounterPageComponent {
  timers: Timer[] = [];
  private nextId = 1;

  isDialogOpen = false;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  timerName: string = '';


  repeat: boolean = false;
  restMinutes: number = 0;

  private audioContext: AudioContext;

  constructor() {
    this.audioContext = new AudioContext();
  }



  openAddTimerDialog(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.resetDialogInputs();
  }

  confirmAddTimer(): void {
    if (this.hours >= 0 && this.minutes >= 0 && this.seconds >= 0 && this.timerName.trim() !== '') {
      const restPeriod = this.repeat ? this.restMinutes * 60 : 0; // Período de descanso en segundos

      this.addTimer(this.timerName, this.hours, this.minutes, this.seconds, this.repeat, restPeriod);
    this.closeDialog();
    } else {
    alert('Por favor, introduce un nombre válido y valores de tiempo correctos.');

    }
  }

  resetDialogInputs(): void {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.timerName = '';
    this.repeat = false;
    this.restMinutes = 0;
  }

  addTimer(name: string, hours: number, minutes: number, seconds: number, repeat: boolean, restPeriod: number): void {
    const duration = hours * 3600 + minutes * 60 + seconds;
    if (duration > 0) {
    const newTimer: Timer = {
      id: this.nextId++,
      name: this.timerName,
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
/*
ngOnInit(): void {}

  onSubmit() {
    const timer = new Timer();
    item.id = this.id;
    item.title = this.title;
    item.time = this.time;       // Asegúrate de que 'price' es correcto
    item.timeDone = this.timeLeft; // Asegúrate de que 'quantity' es correcto
    item.completed = false;
    
    timer.name = this.timerName;
    timer.hours = this.hours;
    timer.originalDuration: duration,
    timer.remaining: duration,
    timer.isPaused: true,
    timer.isStarted: false,
    timer.repeat: repeat,
    timer.restPeriod: restPeriod

    this.ItemService.addItems(item);
    this.router.navigate(['/']);
  } */


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

        this.playBeep();

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

  playBeep(): void { // NUEVO: Método para generar el sonido
    const oscillator = this.audioContext.createOscillator(); // Crea un oscilador
    const gainNode = this.audioContext.createGain(); // Controla el volumen
    const oscillator2 = this.audioContext.createOscillator(); // Crea un oscilador
    const gainNode2 = this.audioContext.createGain();

    oscillator.type = 'sine'; // Tipo de onda: sine, square, triangle, sawtooth
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime); // Frecuencia del tono (440 Hz = La)
    oscillator2.type = 'sine'; // Tipo de onda: sine, square, triangle, sawtooth
    oscillator2.frequency.setValueAtTime(600, this.audioContext.currentTime);

    // Conectar oscilador al control de volumen, y este a la salida
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    oscillator2.connect(gainNode);
    gainNode2.connect(this.audioContext.destination);

    // Configurar el volumen y duración del sonido
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime); // Volumen bajo
    oscillator.start(this.audioContext.currentTime); // Inicia el oscilador
    oscillator.stop(this.audioContext.currentTime + 0.29); // Detén el oscilador después de 1 segundo

    gainNode2.gain.setValueAtTime(0.1, this.audioContext.currentTime+0.3); // Volumen bajo
    oscillator2.start(this.audioContext.currentTime+0.3); // Inicia el oscilador
    oscillator2.stop(this.audioContext.currentTime + 0.75);
  }


  formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }
}


