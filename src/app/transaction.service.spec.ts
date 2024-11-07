import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TransactionService } from './transaction.service';

// test en erreur irrésolu :  NullInjectorError: R3InjectorError(Standalone[AppComponent])[TransactionService ->
// TransactionService -> HttpClient -> HttpClient]: NullInjectorError: No provider for HttpClient!
describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideHttpClientTesting
      ],
      providers: [        
        provideHttpClient(), // Provide the HttpClient along with HttpClientTesting
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

