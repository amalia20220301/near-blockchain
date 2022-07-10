import { NearSignRequest, NearSignature, CryptoMultiAccounts } from "@keystonehq/bc-ur-registry-near";
import { URDecoder, UREncoder } from "@ngraveio/bc-ur";
import nacl from 'tweetnacl';
import {signTx, verify} from './tx.js';
// signingMessage
const signMsgUR = "UR:NEAR-SIGN-REQUEST/OTADTPDAGDCNBBCYPEDWLNFETIMNFGTSDRWDZODKBAAOHDRPFZAEAEAEECETIDIAEYEEECESETDYEEIEEYIHIEETEMENEEEHIYIDIEIHEEDYIDDYIEESENEOEEEHIAIDIYDYEOEHEOIDEMIEIYEEIDIAEEIYENDYIYHSEYIYEEEYIAENDYEYIAEOAEHDRFDKHKLAGTDMTPKOFPZOUEFZPFTAIAFPSBWTEHFRKIWKRFGWHNZSDLFWSWAOSRLRKTDPBERFGHAEAEBEAEAEAEIEIHJNJLDYENEHEMDMJYIHJKJYJTIHJYGUVOVEHKMSATCWFMETVOFSIATAISKELBDKPFIAMTFZMDGMLOLRBEMWHGDNFGJTKPADAEAEAEAXAEAEAEOYWESFTOCWSATEAEAEAEAEAEAEAXTAADDYOEADLNCSDWYKCFADLGYKAEYKAOCYKSCNAYAAISOXEYZO";
const decodedSignMsgUR = URDecoder.decode(signMsgUR);
console.log('----decodedSignMsgUR-----------');
console.log(decodedSignMsgUR.cbor);
console.log('---------------');
const nearSignRequestDecoded = NearSignRequest.fromCBOR(decodedSignMsgUR.cbor);
const msg = nearSignRequestDecoded.getSignData()
// generate signature
const msgSig = signTx("m/44'/397'/0'", new Uint8Array(msg))
console.log('-------msgSig--------', new Uint8Array(msg), msgSig);

/*
console.log('-------verify--------');
console.log(verify("m/44'/397'/0'", msg, msgSig));
console.log('---------------');
*/

const nearMsgSignature = new NearSignature(Buffer.from(msgSig), nearSignRequestDecoded.getRequestId());
console.log('---------------');
console.log(nearSignRequestDecoded.getRequestId());
console.log('---------------');
const signatureUR = nearMsgSignature.toUREncoder(1000).nextPart();
console.log(signatureUR);
// 40000000353862633234353938303464326564383736343166626465343062306439363334316362663033313362376466346263346636306661326634326336303263330058bc2459804d2ed87641fbde40b0d96341cbf0313b7df4bc4f60fa2f42c602c382772d10bc5400001000000064656d6f303631372e746573746e65746c7dc492b2b935f45ad23ac76edd5eb33b942cb741b868e59421bd21de83b9b40100000003000080e3e0a35708873f000000000000
