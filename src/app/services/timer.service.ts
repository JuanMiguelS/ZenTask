import { Injectable } from '@angular/core';
import { Timer } from '../Models/Timer';
import { Item } from '../Models/Item';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimerService {
  private timersSubject = new BehaviorSubject<Timer[]>([]);
  private nextId = 1;

  getTimers() {
    return this.timersSubject.asObservable(); // Para suscribirse
  }

  addTimer(timer: Timer): void {
    timer.id = this.nextId++;
    const current = this.timersSubject.getValue();
    this.timersSubject.next([...current, timer]);
  }

  removeTimer(id: number): void {
    const filtered = this.timersSubject.getValue().filter(t => t.id !== id);
    this.timersSubject.next(filtered);
  }

  addTaskToTimer(item: Item): void {
    const duration = (item.time - item.timeDone) * 3600;
    const timer: Timer = {
      id: 0,
      name: item.title,
      duration,
      originalDuration: duration,
      remaining: duration,
      isPaused: true,
      isStarted: false,
      repeat: false,
      restPeriod: 0
    };
    this.addTimer(timer);
  }
  private lastId = 0;
generateId(): number {
  return ++this.lastId;
}

  addTimerFromParts(
  name: string,
  hours: number,
  minutes: number,
  seconds: number,
  repeat: boolean,
  restMinutes: number
): void {
  const duration = hours * 3600 + minutes * 60 + seconds;
  if (duration > 0) {
    const newTimer: Timer = {
      id: this.generateId(), // suponiendo que generamos id interno
      name,
      duration,
      originalDuration: duration,
      remaining: duration,
      isPaused: true,
      isStarted: false,
      repeat,
      restPeriod: repeat ? restMinutes * 60 : 0
    };
    this.addTimer(newTimer);
  } else {
    alert('Total time must be greater than zero');
  }
}


  clearTimers(): void {
    this.timersSubject.next([]);
  }
}
