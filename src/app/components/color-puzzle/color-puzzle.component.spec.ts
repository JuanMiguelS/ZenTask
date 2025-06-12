import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPuzzleComponent } from './color-puzzle.component';

describe('ColorPuzzleComponent', () => {
  let component: ColorPuzzleComponent;
  let fixture: ComponentFixture<ColorPuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPuzzleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
