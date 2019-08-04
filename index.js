/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

let FxPricesApp = require('./es6/fxPriceApp');
let FxPricesAppInstance = new FxPricesApp.FxCurrencyPairs();

// if you want to use es6, you can do something like
//     require('./es6/myEs6code')
// here to load the myEs6code.js file, and it will be automatically transpiled.

// Change this to get detailed logging from the stomp library
global.DEBUG = false

const fxPricesUrl = "ws://localhost:8011/fx/prices"
const client = Stomp.client(fxPricesUrl)
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

client.connect('guest', 'guest', connectCallback);

function connectCallback() {
  document.getElementById('stomp-status').innerHTML = "It has now successfully connected to a stomp server serving price updates for some foreign exchange currency pairs."

  var subdscribeFxPrices = client.subscribe("/fx/prices", getFxPriceUpdate);

  function getFxPriceUpdate(message) {
    FxPricesAppInstance.showCurrencyPair(JSON.parse(message.body));
  }
}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
})

const exampleSparkline = document.getElementById('example-sparkline')
Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3])