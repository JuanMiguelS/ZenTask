import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Timer } from '../../Models/Timer';
import { TimerService } from '../../services/timer.service';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';

@Component({
  standalone: true,
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css'],
  imports: [FormsModule, CommonModule, TranslatePipe]
})
export class CounterPageComponent implements OnInit, OnDestroy {
  timers: Timer[] = [];
  private timersSub!: Subscription;

  isDialogOpen = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  timerName = '';
  repeat = false;
  restMinutes = 0;

  private audioContext = new AudioContext();

  constructor(private timerService: TimerService, private translationService: TranslationService ) {}

  ngOnInit(): void {
    this.timersSub = this.timerService.getTimers().subscribe(timers => {
      this.timers = timers;
    });
  }

  ngOnDestroy(): void {
    if (this.timersSub) {
      this.timersSub.unsubscribe();
    }
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
      const restPeriod = this.repeat ? this.restMinutes * 60 : 0;
      this.addTimer(this.timerName, this.hours, this.minutes, this.seconds, this.repeat, restPeriod);
      this.closeDialog();
    } else {
      alert(this.translationService.getTranslation('InvalidTimerAlert'));
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
        id: 0,
        name,
        duration,
        originalDuration: duration,
        remaining: duration,
        isPaused: true,
        isStarted: false,
        repeat,
        restPeriod
      };
      this.timerService.addTimer(newTimer);
    } else {
      alert(this.translationService.getTranslation('TotalTimeZeroAlert'));
    }
  }

  startTimer(timer: Timer): void {
    timer.isPaused = false;
    timer.isStarted = true;
    timer.intervalId = setInterval(() => {
      if (timer.remaining > 0) {
        timer.remaining--;
      } else {
        clearInterval(timer.intervalId);
        this.playBeep();
        if (timer.repeat && timer.restPeriod > 0) {
          this.startRestPeriod(timer);
        }
      }
    }, 1000);
  }

  startRestPeriod(timer: Timer): void {
    timer.remaining = timer.restPeriod;
    timer.isResting = true;
    timer.isPaused = false;
    timer.intervalId = setInterval(() => {
      if (timer.remaining > 0) {
        timer.remaining--;
      } else {
        clearInterval(timer.intervalId);
        timer.remaining = timer.duration;
        timer.isResting = false;
        this.startTimer(timer);
      }
    }, 1000);
  }

  pauseTimer(timer: Timer): void {
    if (!timer.isPaused) {
      clearInterval(timer.intervalId);
      timer.isPaused = true;
    }
  }

  resumeTimer(timer: Timer): void {
    if (timer.isPaused) {
      this.startTimer(timer);
    }
  }

  resetTimer(timer: Timer): void {
    clearInterval(timer.intervalId);
    timer.remaining = timer.originalDuration;
    timer.isPaused = true;
    timer.isStarted = false;
  }

  removeTimer(timerId: number): void {
    this.timerService.removeTimer(timerId);
  }

  playBeep(): void {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.5);
  }

  formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }
}
