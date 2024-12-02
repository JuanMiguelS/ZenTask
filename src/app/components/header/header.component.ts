import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(){
    
  }
  ngOnInit(){

  } 
}
