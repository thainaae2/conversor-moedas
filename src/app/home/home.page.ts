import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../home/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class HomePage implements OnInit {
  currencyForm: FormGroup;
  currencyCodes: string[] = [];
  convertedAmount: number | null = null;

  constructor(private fb: FormBuilder, private currencyService: CurrencyService) {
    this.currencyForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      fromCurrency: [null, Validators.required],
      toCurrency: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.currencyCodes = this.currencyService.getSupportedCurrencies();
  }

  async convertCurrency() {
    if (this.currencyForm.invalid) {
      return;
    }

    const { amount, fromCurrency, toCurrency } = this.currencyForm.value;

    if (fromCurrency === toCurrency) {
      this.convertedAmount = amount;
      return;
    }

    try {
      this.convertedAmount = await this.currencyService.convert(amount, fromCurrency, toCurrency);
    } catch (error) {
      console.error('Erro ao converter moeda:', error);
      this.convertedAmount = null;
    }
  }
}
