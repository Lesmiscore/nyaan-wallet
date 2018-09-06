# にゃーん (Nyaan)
Modified from [Monya](https://monya-wallet.github.io) with Testnet coins

[![GPL License](http://img.shields.io/badge/license-GPL-blue.svg?style=flat)](LICENSE)

[Launch Now](https://nao20010128nao.github.io/nyaan-wallet/)

## Monya

[Official Website](https://monya-wallet.github.io)

## Feature

  * Send & Receive many kinds of cryptocurrency
  * Atomic Swap Trading
  * Cross platform
  * SegWit(P2SH-P2WPKH) Supported
  * Multisig Transaction
  * BIP44/49 HD Wallet
  * BIP39 Compatible
  * Powerful QR Code generation
  * On-chain messaging
  * Pop and easy design
  * AES-256 Protection
  * 2-Factor Encryption (On launch and before decrypting private key)
  * QR code reader
  * Add coins you like by yourself
  * Highly Extendable

## Icon 

Icon was made by DMD.
[https://monappy.jp/picture_places/view/20695](https://monappy.jp/picture_places/view/20695)
This icon is licensed under Creative Commons Attribution 4.0 International License. (CC-BY)

## How to Build

### Prerequisites

* Node.js (v8 or higher)
* Xcode (for iOS Builds)
* Android SDK (for Android Builds)


### Asset Build

1. `git clone https://github.com/monya-wallet/monya`
1. `npm install`
1. `npm run build`

`npm run start` to develop. (with browser-sync auto reload)

### Translation

- `gulp addWord`
- edit `lang/dict.json`
- `gulp translateEn`

If error occurs, re-create lang/dict.json. Contents is `{}`

### Cordova Build

Please build assets `npm run build` in advance

1. `npm install -g cordova@7.1.0` **Caution: Cordova version must be 7.1. 8.0 is not supported.**
1. `cd cordovaProj`
1. `npm install`
1. `cordova platform add <platformName>` platformName will be `ios`, `android`, etc.
1. `cordova build <platformName> --release`

### Chrome Extension Build

1. `npm run build` to make chrome assets under `chrome_extension` 
1. Click "Pack extension" and choose `chrome_extension` in Chrome Extension page. If you have already packaged, choose keys that is generated in the previous time. Otherwise, store can't recognize a signature.
1. After finishing packaging, `.crx` and key will be generated. Please upload `.crx`. Store the key securely.

## webp conversion

run below shellscript on the directory which has README.md
```
$ cd dist && find assets|sed -e 's/assets\///'|grep -e '\(\.png\|\.jpg\)'|while read a;do cwebp -q 90 -z 9 -mt -af -progress -v assets/$a -o ../chrome_extension/assets-webp/$(echo $a|sed -e 's/\(\.png\|\.jpg\)//').webp;done
```

## Electron Build

Please build assets `npm run build` in advance

1. `cd electron`
1. `npm install`
1. `npm run dist`

Package will be output under `electron/dist`

## License

GPLv3

Copyright (C) 2017 ゆき@モナコインJK
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

Icons of coins are licensed under each license.
Other assets like image, sound are licensed under CC-BY
