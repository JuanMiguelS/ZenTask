import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-puzzle',
  standalone: true,
  templateUrl: './color-puzzle.component.html',
  styleUrls: ['./color-puzzle.component.css'], 
  imports: [FormsModule, CommonModule, TranslatePipe]

})
export class ColorPuzzleComponent implements OnInit, OnDestroy {
  gridSize: number = 10;
  colors: string[] = ['red', 'green', 'blue', 'yellow'];
  grid: string[][] = [];
  selectedColor: string = '';
  goalColor: string = '';
  movesLeft: number = 4;
  message: string = '';

  translatedVictory: string = '';
  translatedDefeat: string = '';

  private langSub!: Subscription;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.goalColor = this.getRandomColor();
    this.initializeGrid();
    this.loadTranslations();

    this.langSub = this.translationService.getLanguageObservable().subscribe(() => {
      this.loadTranslations();
      if (this.message === this.translatedVictory || this.message === this.translatedDefeat) {
        // Volver a aplicar traducción si estaba visible
        this.updateMessageAfterLangChange();
      }
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  loadTranslations(): void {
    this.translatedVictory = this.translationService.getTranslation('puzzle-victory');
    this.translatedDefeat = this.translationService.getTranslation('puzzle-defeat');
  }

  updateMessageAfterLangChange(): void {
    if (this.checkVictory()) {
      this.message = this.translatedVictory;
    } else if (this.movesLeft === 0) {
      this.message = this.translatedDefeat;
    }
  }

  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  initializeGrid(): void {
    this.grid = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => this.getRandomColor())
    );
    this.selectedColor = this.colors[0];
    this.message = '';
    this.movesLeft = 4;
  }

  setColor(color: string): void {
    this.selectedColor = color;
  }

  handleCellClick(x: number, y: number): void {
    const targetColor = this.grid[x][y];
    if (this.selectedColor === targetColor || this.movesLeft <= 0) return;

    this.floodFill(x, y, targetColor, this.selectedColor);
    this.movesLeft--;

    if (this.checkVictory()) {
      this.message = this.translatedVictory;
    } else if (this.movesLeft === 0) {
      this.message = this.translatedDefeat;
    }
  }

  floodFill(x: number, y: number, targetColor: string, replacementColor: string): void {
    if (
      x < 0 || y < 0 ||
      x >= this.gridSize || y >= this.gridSize ||
      this.grid[x][y] !== targetColor ||
      this.grid[x][y] === replacementColor
    ) {
      return;
    }

    this.grid[x][y] = replacementColor;

    this.floodFill(x + 1, y, targetColor, replacementColor);
    this.floodFill(x - 1, y, targetColor, replacementColor);
    this.floodFill(x, y + 1, targetColor, replacementColor);
    this.floodFill(x, y - 1, targetColor, replacementColor);
  }

  checkVictory(): boolean {
    const firstColor = this.grid[0][0];
    return this.grid.every(row => row.every(cell => cell === firstColor));
  }

  resetGame(): void {
    this.goalColor = this.getRandomColor();
    this.initializeGrid();
  }
}
