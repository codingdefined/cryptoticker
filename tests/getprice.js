const crypto = require('../index');

crypto.price('btc').then(a=>console.log(a));
crypto.price('eth').then(a=>console.log(a));
crypto.price().then(a=>console.log(a));
crypto.price('ahol').then(a=>console.log(a));

crypto.priceWCI('eth','WorldCoinIndex Key').then(a=>console.log(a));
crypto.priceWCI('bitcoin','WorldCoinIndex Key').then(a=>console.log(a));
