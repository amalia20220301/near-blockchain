import 'dotenv/config'
import nacl from 'tweetnacl';
import { derivePath, getMasterKeyFromSeed, getPublicKey } from 'ed25519-hd-key'
import bip39 from 'bip39'

const seed = bip39.mnemonicToSeedSync(process.env.WORDS)

function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

export const getAddress = (path) => {
    const seed = bip39.mnemonicToSeedSync(process.env.WORDS)
    const { key } = derivePath(path, seed.toString('hex'));
    return buf2hex(nacl.sign.keyPair.fromSeed(key).publicKey);
}

export const getPrivKey = (path) => {
    const seed = bip39.mnemonicToSeedSync(process.env.WORDS)
    const { key } = derivePath(path, seed.toString('hex'))
    return nacl.sign.keyPair.fromSeed(key).secretKey
}

const path = "m/44'/397'/0'/0'/3'"
console.log(getAddress(path));