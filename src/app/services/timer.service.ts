import { Injectable } from "@angular/core";
import { Timer } from "../Models/Timer";

@Injectable({

    providedIn: 'root'
})

export class TimerService {
    private timers: Timer[] = [];
  
    addTimer(timer: Timer): void {
      this.timers.push(timer);
    }
  
    getTimers(): Timer[] {
      return this.timers;
    }
  
    removeTimer(id: number): void {
      this.timers = this.timers.filter(timer => timer.id !== id);
    }
  }