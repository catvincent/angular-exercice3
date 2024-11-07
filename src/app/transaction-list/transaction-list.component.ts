import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { TransactionDetailComponent } from "../transaction-detail/transaction-detail.component";

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [TransactionDetailComponent, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})

export class TransactionListComponent implements OnInit {

  // injection du service et récupération des données
  transactionService: TransactionService = inject(TransactionService);

  // récupération de la liste des transactions : méthode 1 mode async
  // l'Observable transactions$ guette la réponse de la fonction appelée
  // celle-ci sera alors affichée dans la template à l'aide du pipe async.
  transactions$ = this.transactionService.getTransactions();

  transactionList: Transaction[] = [];

  ngOnInit() {
    this.getTransactions();
  }

  /***
   *  récupération de la liste des transactions : méthode 2 mode sync
   *  syntaxe lourde mais permet la mise à jour de this.transitionList et donc le tri
   *  des colonnes
   *  After the subscribe, a map is assigning the value to the Transition list propertie
   *  which is in being render in the view without async pipe. 
   *  (j'avais le message d'erreur Type 'Subscription' is missing the following 
   *  properties from type 'Transition[]': length, pop, push,... car je mettais 
   *  : Transition[] comme type retourné par la fonction or la méthode subscribe
   *  ne retourne pas un array mais un type Observable d'où l'erreur générée.)
   */
  getTransactions(): void {
    this.transactionService.getTransactions().subscribe( (res: Transaction[]) => {
     this.transactionList = res.map(
    // map sur -res- : prend chaque élément de la liste et en retourne une Transition
        (resEl: Transaction) => {
         let modelTransition: Transaction = {
            id: resEl.id,
            amount: resEl.amount,
            balance: resEl.balance,
            label: resEl.label,
            description: '',
            date: resEl.date,
          };
          return modelTransition;
        }
      );
    });
  
  }

  // tri sur colonne de type string
  sortBySt(prop: string) {
    this.transactionList.sort((a,b) => {  
      let propA = a.date.toUpperCase();
      let propB = b.date.toUpperCase(); 
      if (prop === 'label') {
        propA = a.label.toUpperCase();
        propB = b.label.toUpperCase();
      }
      if (propA < propB) {
        return -1;
      }
      if (propA > propB) {
        return 1;
      }
      return 0;
    });
  }

  // tri sur colonne de type number
  sortByNb(prop: string) {
    if (prop === 'amount') {
      this.transactionList.sort((a,b) => a.amount - b.amount);
    }
    if (prop === 'balance') {
      this.transactionList.sort((a,b) => a.balance - b.balance);
    }
  }
  
}
