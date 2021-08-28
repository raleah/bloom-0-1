"use strict";
//console.log('hello')
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var CryptoJS = require('crypto-js');
var sha256 = require('crypto-js/sha256');
var base64 = require('crypto-js/enc-base64');
var hmacSHA512 = require('crypto-js/hmac=sha512');
var bitcoin = require('bitcoinjs-lib');
// signing 
var message, nonce, path, privateKey;
var hashDigest = sha256(nonce + message);
var hmacDigest = base64.toString(hmacSHA512(path + hashDigest, privateKey));
console.log('signature:', hmacDigest);
// encrypt message
var encrypted = CryptoJS.AES.encrypt('encrypted message', 'secret key').toString();
console.log('Encrypted:', encrypted);
// decrypt message
var bytes = CryptoJS.AES.decrypt(encrypted, 'secret key');
var originalMessage = bytes.toString(CryptoJS.enc.Utf8);
// prints original encrypted message to console
console.log(originalMessage);
// generate keys, keyPairs
var value = crypto.randomBytes(32);
var privKey = value.toString('hex');
console.log('Generated key :', privKey);
function generateKeyPairs() {
    var keyPair = bitcoin.ECPair.makeRandom();
    var address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey }).address;
    var publicKey = keyPair.publicKey.toString('hex');
    var privateKey = keyPair.toWIF();
    return { address: address, publicKey: publicKey, privateKey: privateKey };
}
console.log('address and keys: ', generateKeyPairs());
