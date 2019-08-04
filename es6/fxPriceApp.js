import { CurrencyPair } from './models/currency-pair.model';
import { CurrencyPairs } from './models/currency-pairs.model';

export class FxCurrencyPairs {
    currencyPairsStore =  new CurrencyPairs();

    constructor() {}

    // DTO - Data transfer object
    showCurrencyPair(currencyPairDTO) {
        let pair = new CurrencyPair(currencyPairDTO);
        this.currencyPairsStore.addCurrencyPair(pair);
        
        this.currencyPairsStore.historicalCurrencyPairs.push(pair);
    }
}