import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TransactionListComponent } from "./transaction-list/transaction-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Angular v18 : exercice 3';
  currentDate: Date = new Date();

  refreshDate() { 
    setInterval(() =>{ 
      this.currentDate = new Date(); 
    }, 1000);
 }

  // pour remplacer le html onload de la page
  ngOnInit() {
    this.refreshDate();
  }

}
