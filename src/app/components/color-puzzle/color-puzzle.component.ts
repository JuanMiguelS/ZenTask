import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service'; // Importa el servicio de Item
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
  originalGrid: string[][] = [];
  colors: string[] = ['#FF5733', '#33FF57', '#5733FF', '#F9F9F9'];
  selectedColor: string = '#FF5733';  // Inicial color seleccionado
  moves: number = 10;
  targetColor: string = '';
  instructionsVisible: boolean = false;

  // Nivel de dificultad
  difficultyLevels: {
    easy: { size: number; moves: number };
    medium: { size: number; moves: number };
    hard: { size: number; moves: number };
  } = {
    easy: { size: 5, moves: 10 },
    medium: { size: 7, moves: 15 },
    hard: { size: 10, moves: 20 }
  };

  currentLevel: 'easy' | 'medium' | 'hard' = 'easy';
  gameAccessAllowed: boolean = false;  // Añadimos esta propiedad para controlar el acceso al juego

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.initGrid();
    this.checkGameAccess();  // Verifica si se puede acceder al juego
  }

  // Establecer el color objetivo
  setTargetColor(): void {
    this.targetColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    console.log("Target Color: " + this.targetColor);
  }

  // Inicializar la cuadrícula
  initGrid(): void {
    const size = this.difficultyLevels[this.currentLevel].size;
    this.moves = this.difficultyLevels[this.currentLevel].moves;
    this.grid = [];
    this.originalGrid = [];

    for (let i = 0; i < size; i++) {
      this.grid[i] = [];
      this.originalGrid[i] = [];
      for (let j = 0; j < size; j++) {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.grid[i].push(color);
        this.originalGrid[i].push(color);
      }
    }

    console.log(this.grid);
    this.setTargetColor();
  }

  // Selección de color
  selectColor(color: string): void {
    this.selectedColor = color;
    this.updateSelectedButton();  // Actualiza el borde del botón seleccionado
  }

  // Función que actualiza visualmente el botón seleccionado con un borde
  updateSelectedButton(): void {
    const buttons = document.querySelectorAll('.color-selector button');
    const buttonsArray = Array.from(buttons) as HTMLElement[];

    // Limpiar la clase 'selected' de todos los botones
    buttonsArray.forEach((button) => {
      button.classList.remove('selected');
    });

    const selectedButton = buttonsArray.find(
      (button) => button.style.backgroundColor === this.selectedColor
    );

    if (selectedButton) {
      selectedButton.classList.add('selected');
    }
  }

  // Cambiar color de los bloques de la cuadrícula
  changeColor(row: number, col: number): void {
    if (this.moves <= 0) return;

    const targetColor = this.grid[row][col];
    if (targetColor === this.selectedColor) return;

    this.fillColor(row, col, targetColor);

    this.moves--;
    this.checkVictory();
  }

  // Cambiar color de los bloques adyacentes
  fillColor(row: number, col: number, targetColor: string): void {
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

  // Mostrar u ocultar las instrucciones
  toggleInstructions(): void {
    this.instructionsVisible = !this.instructionsVisible;
  }

  // Comprobar si se ha ganado
  checkVictory() {
    const allMatch = this.grid.every(row => row.every(block => block === this.targetColor));
    if (allMatch) {
      this.grid = this.grid.map(row => row.map(() => this.targetColor));
      setTimeout(() => {
        alert('You won! You achieved the target color!');
        this.restartGame();
      }, 500);
    }
  }

  // Reiniciar el juego
  restartGame() {
    this.grid = JSON.parse(JSON.stringify(this.originalGrid));
    this.moves = this.difficultyLevels[this.currentLevel].moves;
  }

  // Generar un nuevo puzzle
  generateNewPuzzle() {
    this.initGrid();
    this.moves = this.difficultyLevels[this.currentLevel].moves;
    this.setTargetColor();
  }

  // Verificar si el acceso al juego debe ser permitido
  checkGameAccess(): void {
    const items = this.itemService.getItems();  // Obtener las tareas desde el servicio
    this.gameAccessAllowed = items.some(item => item.completed);  // Si alguna tarea está completada, habilitar el acceso
  }
}
