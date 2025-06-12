import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-puzzle',
  standalone: true,
  templateUrl: './color-puzzle.component.html',
  styleUrls: ['./color-puzzle.component.css'],
  imports: [CommonModule]
})
export class ColorPuzzleComponent implements OnInit {
  grid: string[][] = [];
  colors: string[] = ['#FF5733', '#33FF57', '#5733FF', '#F9F9F9'];
  selectedColor: string = '#FF5733'; // Color por defecto
  moves: number = 10; // Número de movimientos disponibles
  timer: number = 30; // 30 segundos para completar el puzzle
  timerInterval: any;

  // Niveles de dificultad
difficultyLevels: {
  easy: { size: number; moves: number };
  medium: { size: number; moves: number };
  hard: { size: number; moves: number };
} = {
  easy: { size: 5, moves: 10 },
  medium: { size: 7, moves: 15 },
  hard: { size: 10, moves: 20 }
};


currentLevel: 'easy' | 'medium' | 'hard' = 'easy'; // Asegúrate de que sea uno de los valores posibles

  constructor() { }

  ngOnInit(): void {
    this.initGrid();
    this.startTimer(); // Iniciar el temporizador al principio
  }

  initGrid(): void {
    const size = this.difficultyLevels[this.currentLevel].size;
    this.moves = this.difficultyLevels[this.currentLevel].moves;
    this.grid = [];
    for (let i = 0; i < size; i++) {
      this.grid[i] = [];
      for (let j = 0; j < size; j++) {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.grid[i].push(color);
      }
    }
    console.log(this.grid); // Verifica la cuadrícula generada
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  changeColor(row: number, col: number): void {
    if (this.moves <= 0) return;

    const targetColor = this.grid[row][col];
    if (targetColor === this.selectedColor) return; // No hacer nada si ya es el color seleccionado

    // Realizar cambio de color (se puede mejorar implementando un algoritmo similar al de Flood Fill)
    this.fillColor(row, col, targetColor);

    this.moves--;
  }

  fillColor(row: number, col: number, targetColor: string): void {
    // Aquí implementamos la lógica para cambiar el color de todos los bloques conectados al color seleccionado
    if (row < 0 || row >= 5 || col < 0 || col >= 5 || this.grid[row][col] !== targetColor) {
      return;
    }

    this.grid[row][col] = this.selectedColor;

    // Recursividad para llenar bloques adyacentes
    this.fillColor(row - 1, col, targetColor);
    this.fillColor(row + 1, col, targetColor);
    this.fillColor(row, col - 1, targetColor);
    this.fillColor(row, col + 1, targetColor);
  }

  // Inicia el temporizador
  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.endGame();
        clearInterval(this.timerInterval); // Detener el temporizador cuando se acaba
      }
    }, 1000);
  }

  // Finaliza el juego cuando se acaba el tiempo
  endGame() {
    alert('¡Tiempo agotado! El juego ha terminado.');
    // Puedes agregar lógica para finalizar el juego o permitir reiniciar
  }

  // Reinicia el puzzle con la misma cuadrícula y número de movimientos
  restartGame() {
    this.moves = this.difficultyLevels[this.currentLevel].moves;  // Reinicia los movimientos según el nivel
    this.timer = 30;  // Reinicia el temporizador
    this.startTimer();  // Reinicia el temporizador
  }

  // Genera un nuevo puzzle con una combinación distinta
  generateNewPuzzle() {
    this.initGrid();  // Genera una nueva cuadrícula con colores aleatorios
    this.moves = this.difficultyLevels[this.currentLevel].moves;  // Reinicia los movimientos según el nivel
    this.timer = 30;  // Reinicia el temporizador
    this.startTimer();  // Inicia el temporizador nuevamente
  }
}
