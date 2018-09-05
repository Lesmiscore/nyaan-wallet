/*
    Monya - The easiest cryptocurrency wallet
    Copyright (C) 2017-2018 MissMonacoin

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const Currency = require("./currency")
const coinUtil = require("./coinUtil")
const j = require("./lang").getLang() === "ja"
const bitcoin = require("bitcoinjs-lib");

// Coin id should be lowercase ticker symbol. Add prefix if this coin is different coin like testnet. Add suffix if this coin is compatible with the original coin but different mode like SegWit, Monacoin-3-Prefix

const defaultCoins = [{
  coinScreenName: j ? "モナコイン" : "Monacoin",
  coinId: "mona",
  unit: "MONA",
  unitEasy: j ? "モナ" : "Mona",
  bip44: {
    coinType: 22,
    account: 0
  },
  bip21: "monacoin",
  defaultFeeSatPerByte: 150,
  icon: require("../res/coins/mona.png"),
  apiEndpoints: [{
    url: "https://testnet-mona.insight.monaco-ex.org/insight-api-monacoin",
    explorer: "https://testnet-mona.insight.monaco-ex.org/insight"
  }],
  network: {
    messagePrefix: '\x19Monacoin Signed Message:\n',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394
    },
    pubKeyHash: 111,
    scriptHash: 196,
    wif: 239,
    bech32: "mona"
  },
  sound: require("../res/coins/paySound/mona.m4a"),
  enableSegwit: false,
  confirmations: 6,
  opReturnLength: 83,
  isAtomicSwapAvailable: true
}, {
  coinScreenName: j ? "ビットゼニー" : "BitZeny",
  coinId: "zny",
  unit: "ZNY",
  unitEasy: j ? "ゼニー" : "Zeny",
  bip44: {
    coinType: 123,
    account: 0
  },
  bip21: "bitzeny",
  defaultFeeSatPerByte: 150,
  icon: require("../res/coins/zny.png"),
  apiEndpoints: [{
    url: "https://test-insight.bitzeny.jp/api",
    explorer: "https://test-insight.bitzeny.jp"
  }],
  network: {
    messagePrefix: '\x18BitZeny Signed Message:\n',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394
    },
    pubKeyHash: 111,
    scriptHash: 196,
    wif: 239,
    bech32: "sz"
  },
  enableSegwit: false,
  sound: require("../res/coins/paySound/zny.m4a"),
  opReturnLength: 40, //server seems currently not to support
  isAtomicSwapAvailable: true
}, {
  coinScreenName: j ? "ビットコイン" : "Bitcoin",
  coinId: "btc",
  unit: "BTC",
  unitEasy: j ? "ビットコイン" : "Bitcoin",
  bip44: {
    coinType: 0,
    account: 0
  },
  bip21: "bitcoin",
  defaultFeeSatPerByte: 100,
  icon: require("../res/coins/btc.png"),
  apiEndpoints: [{
    url: "https://tbtc.blockdozer.com/insight-api",
    explorer: "https://tbtc.blockdozer.com"
  }, {
    explorer: "https://test-insight.bitpay.com",
    url: "https://test-insight.bitpay.com/api"
  }],
  network: bitcoin.networks.testnet,
  enableSegwit: false,
  confirmations: 6,
  opReturnLength: 83,
  isAtomicSwapAvailable: true
}]


const coins = {}

/**
 * Get supported Currencies
 * @param {function} fn(Currency).
 */
exports.each = (fn) => {

  for (let curName in coins) {
    if ((coins[curName] instanceof Currency) && (!coins[curName].dummy)) {
      fn(coins[curName])
    }
  }
}

/**
 * Get Available Currencies with dummy(such as fiat currency)
 * @param {function} fn(Currency).
 */
exports.eachWithDummy = (fn) => {

  for (let curName in coins) {
    if ((coins[curName] instanceof Currency)) {
      fn(coins[curName])
    }
  }
}
/**
 * Get Available Currencies which have pubkey
 * @param {function} fn(Currency).
 */
exports.eachWithPub = (fn) => {
  for (let curName in coins) {
    if ((coins[curName] instanceof Currency) && (coins[curName].hdPubNode)) {
      fn(coins[curName])
    }
  }
}

/**
 * Get a currency
 * @param {String} coinId.
 */
exports.get = coinId => {

  if ((coins[coinId] instanceof Currency)) {
    return coins[coinId]
  }
}
exports.init = customCoins => {
  for (let i = 0; i < defaultCoins.length; i++) {
    const defCoin = defaultCoins[i]
    coins[defCoin.coinId] = new Currency(defCoin)
  }
  for (let i = 0; i < customCoins.length; i++) {
    const defCoin = customCoins[i]
    try {
      coins[defCoin.coinId] = new Currency(defCoin)
    } catch (e) {
      continue
    }
  }
  exports.isSingleWallet = (defaultCoins.length + customCoins.length) < 2
}
exports.isSingleWallet = false