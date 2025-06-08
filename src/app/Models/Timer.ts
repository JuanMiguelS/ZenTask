export class Timer {
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


    constructor(id: number = 0, name: string = '', duration: number = 0, originalDuration: number = 0,
                remaining: number = 0, isPaused: boolean = false, 
                isStarted: boolean = false, repeat: boolean = false, restPeriod: number = 0) {
                        
                    this.id = id;
                    this.name = name;
                    this.duration = duration;
                    this.originalDuration = originalDuration;
                    this.remaining = remaining;
                    this.isPaused = isPaused;
                    this.isStarted = isStarted;
                    this.repeat = repeat;
                    this.restPeriod = restPeriod
                }
     
  }