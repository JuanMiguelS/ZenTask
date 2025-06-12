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

  clearTimers(): void {
    this.timersSubject.next([]);
  }
}
