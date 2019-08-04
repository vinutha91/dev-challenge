export class CurrencyPair {
    name = '';
    bestBid = 0;
    bestAsk = 0;
    lastChangeBid = 0;
    lastChangeAsk = 0;
    midprice = 0;
    timeStamp;

    constructor(currencyPairDTO) {
        this.name = this.formatPair(currencyPairDTO.name);
        this.bestBid = Number(currencyPairDTO.bestBid);
        this.bestAsk = Number(currencyPairDTO.bestAsk);
        this.lastChangeBid = Number(currencyPairDTO.lastChangeBid);
        this.lastChangeAsk = Number(currencyPairDTO.lastChangeAsk);
        this.midprice = (this.bestBid + this.bestAsk)/2;
        this.timeStamp = new Date();
    }

    formatPair(pair) {
        let currencyPairs = pair.match(/.{1,3}/g);
        return `${currencyPairs[0].toUpperCase()}-${currencyPairs[1].toUpperCase()}`;
    }
}