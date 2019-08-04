export class CurrencyPairs {
    historicalCurrencyPairs = [];
    currencyPairs = [];

    constructor() {}

    addCurrencyPair(pair) {
        if (this.checkPairExists(pair)) {
            this.currencyPairs = this.currencyPairs.map((currencyPair) => {
                return currencyPair.name === pair.name ? currencyPair = pair : currencyPair;
            });
        } else {
            this.currencyPairs.push(pair);
        }

        this.currencyPairs = this.sortCurrencyPairs();
        this.renderTable(this.currencyPairs);
    }

    checkPairExists(pair) {
        let currencyPairs = this.currencyPairs.filter((currencyPair) => {
            return currencyPair.name === pair.name;
        });
        return !!currencyPairs.length;
    }

    sortCurrencyPairs() {
        return this.currencyPairs.sort((pair1, pair2) => {
            return pair1.lastChangeBid - pair2.lastChangeBid;
        });
    }

    renderTable(currencyPairs) {
        let midpriceSet = {};
        [...document.getElementById('currencyPrices').children].forEach((child, index) => {
            if (index !== 0) {
                child.remove();
            }
        });

        currencyPairs.forEach((currencyPair) => {
            document.getElementById('currencyPrices').innerHTML += `<tr id='${currencyPair.name}'>
                <td data-type='name'>${currencyPair.name}</td>
                <td data-type='bestBid'>${currencyPair.bestBid}</td>
                <td data-type='bestAsk'>${currencyPair.bestAsk}</td>
                <td data-type='lastChangeAsk'>${currencyPair.lastChangeAsk}</td>
                <td data-type='lastChangeBid'>${currencyPair.lastChangeBid}</td>
                <td><span id='${currencyPair.name}-sparkline'></span></td>
            </tr>`;
        });

        let currentTime = new Date();

        let latestPairs = this.historicalCurrencyPairs.filter((pair) => {
            if (currentTime - pair.timeStamp <= 30000) {
                return pair;
            }
        });

        midpriceSet = this.groupBy(latestPairs, 'name');

        for (var pair in midpriceSet) {
            const sparkElement = document.getElementById(`${pair}-sparkline`);
            const sparkline = new Sparkline(sparkElement);
            sparkline.draw(midpriceSet[pair]);
        }

    }

    groupBy(array, property) {
        var hash = {};
        for (var i = 0; i < array.length; i++) {
            if (!hash[array[i][property]]) hash[array[i][property]] = [];
            hash[array[i][property]].push(array[i].midprice);
        }
        return hash;
    }
}