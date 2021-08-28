//console.log('hello')

import * as crypto from "crypto";
const CryptoJS = require('crypto-js');
const sha256 = require('crypto-js/sha256');
const base64 = require('crypto-js/enc-base64')
const hmacSHA512 = require('crypto-js/hmac=sha512');
const bitcoin = require('bitcoinjs-lib');

// signing 
var message: any, nonce: any, path: any, privateKey: any; 
const hashDigest = sha256(nonce + message);
const hmacDigest = base64.stringify(hmacSHA512(path + hashDigest, privateKey));
console.log('signature:', hmacDigest)

// encrypt message
var encrypted = CryptoJS.AES.encrypt('encrypted message', 'secret key').toString();
console.log('Encrypted:', encrypted)

// decrypt message
var bytes  = CryptoJS.AES.decrypt(encrypted, 'secret key');
var originalMessage = bytes.toString(CryptoJS.enc.Utf8);

// prints original encrypted message to console
console.log(originalMessage); 

// generate keys, keyPairs
const value = crypto.randomBytes(32)
const privKey = value.toString('hex')
console.log('Generated key :', privKey)

function generateKeyPairs(){
    const keyPair = bitcoin.ECPair.makeRandom()
    const { address } = bitcoin.payments.p2pkh({pubkey: keyPair.publicKey})
    const publicKey = keyPair.publicKey.toString('hex')
    const privateKey = keyPair.toWIF()
    return {address, publicKey, privateKey}

}

console.log('address and keys: ', generateKeyPairs())
