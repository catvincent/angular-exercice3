import { Injectable, inject } from '@angular/core';
import { Transaction } from './transaction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  baseUrl = 'http://localhost:3000/';

  /*
  http://localhost:3000/transactions
  http://localhost:3000/id
http://localhost:3000/amount
http://localhost:3000/balance
http://localhost:3000/label
http://localhost:3000/description
http://localhost:3000/date
*/

  // pour les services, qui ne sont pas instanciés de la même façon que les components, 
  // il faut déclarer et initialiser les propriétés dans la même expression :
  transactionList: Transaction[] = [];

    // échantillon de test
    transaction0100: Transaction = {
      "id": "01-00",
	    "amount": 157.21,
	    "balance": 2657.21,
	    "label": "Intérêts",
	    "description": "Intérêts 2014",
	    "date": "2015-01-01T00:00+01:00"
    };
    // échantillon de test
    transaction0101: Transaction = {
      "id": "01-01",
      "amount": -152.36,
      "balance": 2504.85,
      "label": "Courses",
      "description": "Courses alimentaires chez Casino",
      "date": "2015-01-01T15:32+01:00"
    };

    // injection du service pour les requêtes http
    private httpClient = inject(HttpClient);
  

 /* 
Observable est l'objet de base de la programmation réactive. 
La méthode subscribe permet de créer des observateurs.
Sans subcribe l'observable n'est pas observé.
subscribe prend en paramètre l'observateur : simple fonction qui 
recevra les valeurs émises par l'observable.

ex :
  getTransactions(): Observable<Transition[]> {
    return this.httpClient.get(...).pipe(map((res: Transition[]) => res)
    ));
  }
  dans le component :
   ngOnInit() {
    this.monService.getArticles().subscribe(
     articles => this.articles = articles
    );
  }
*/

transaction!: Transaction;

  setTransactionList(){ 
    this.getTransactions().subscribe((res: Transaction[])=> {
        this.transactionList = res;
    });
  }

  //Les différentes méthodes du service http retournent des Observable<any>
  // requête http du fichier transactions.json
  getTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(this.baseUrl + 'transactions');
  }
  
  // requête http du fichier param-id .json
  getTransactionById(id: string) {
    return this.httpClient.get(this.baseUrl + id);    
  }
  
  getTransaction0100(): Transaction {
    return this.transaction0100;
  }

  getTransaction0101(): Transaction {
    return this.transaction0101;
  }
 
}
