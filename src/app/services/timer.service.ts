import { Injectable } from "@angular/core";
import { Timer } from "../Models/Timer";
import { Item } from '../Models/Item'; // Asegúrate de importar esto

@Injectable({

    providedIn: 'root'
})

export class TimerService {
    private timers: Timer[] = [];
    private nextId = 1;
  
    addTimer(timer: Timer): void {
      timer.id = this.nextId++;
      this.timers.push(timer);
    }
  
    getTimers(): Timer[] {
      return this.timers;
    }
  
    removeTimer(id: number): void {
      this.timers = this.timers.filter(timer => timer.id !== id);
    }

    addTaskToTimer(item: Item): void {
  const duration = (item.time - item.timeDone) * 3600; // horas a segundos
  const timer: Timer = {
    id: 0, // se asigna automáticamente en addTimer()
    name: item.title,
    duration: duration,
    originalDuration: duration,
    remaining: duration,
    isPaused: true,
    isStarted: true,
    repeat: false,
    restPeriod: 0
  };

  this.addTimer(timer);
}

      // Opcional: crear directamente desde título de tarea
  createTimerFromTask(title: string): void {
    const defaultDuration = 1500; // 25 minutos en segundos
    const timer: Timer = {
      id: 0, // será reemplazado en addTimer
      name: title,
      duration: defaultDuration,
      originalDuration: defaultDuration,
      remaining: defaultDuration,
      isPaused: true,
      isStarted: false,
      repeat: false,
      restPeriod: 0
    };
    this.addTimer(timer);
  }
  }