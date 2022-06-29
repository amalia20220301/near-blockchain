import 'dotenv/config'
import nacl from 'tweetnacl';
import { derivePath, getMasterKeyFromSeed, getPublicKey } from 'ed25519-hd-key'
import bip39 from 'bip39'
import bs58 from 'bs58';

function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

export const getAddress = (path, seed) => {
    const { key } = derivePath(path, seed.toString('hex'));
    const keyPair = nacl.sign.keyPair.fromSeed(key);
    console.log('------public key---------');
    console.log(Buffer.from(keyPair.publicKey).toString('hex'));
    console.log('---------------');
    const publicKey = 'ed25519:' + bs58.encode(Buffer.from(keyPair.publicKey))
    const secretKey = 'ed25519:' + bs58.encode(Buffer.from(keyPair.secretKey))
    return {publicKey, secretKey}
}

export const getPrivKey = (path) => {
    const seed = bip39.mnemonicToSeedSync(process.env.WORDS)
    const { key } = derivePath(path, seed.toString('hex'))
    return nacl.sign.keyPair.fromSeed(key).secretKey
}


const path = "m/44'/397'/0'/0'/1'"

const passphase_path =  "m/44'/397'/0'"

// console.log(getAddress(path, bip39.mnemonicToSeedSync(process.env.WORDS)));
console.log('------naksh-mrzhao.testnet---------')
console.log(getAddress("m/44'/397'/0'/0'/1'", bip39.mnemonicToSeedSync(process.env.WORDS)))
console.log('---------------')
