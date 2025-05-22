import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  // Simulando taxas mockadas para conversão
  private mockRates: { [key: string]: number } = {
    USD: 1,
    BRL: 5,
    EUR: 0.9,
    GBP: 0.8,
    JPY: 110,
  };

  getSupportedCurrencies(): string[] {
    return Object.keys(this.mockRates);
  }

  async convert(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
    // Verifica se as moedas existem na tabela mock
    const rateFrom = this.mockRates[fromCurrency];
    const rateTo = this.mockRates[toCurrency];

    if (rateFrom === undefined || rateTo === undefined) {
      throw new Error('Currency not supported');
    }

    // Converte o valor
    const convertedAmount = (amount / rateFrom) * rateTo;

    // Simula uma requisição assíncrona (ex: chamada API)
    return new Promise(resolve => setTimeout(() => resolve(convertedAmount), 500));
  }
}
