import { SHA256, AES, enc } from 'crypto-js';

export const sha256 = (input: string): string => {
    return SHA256(input + "soup").toString(enc.Hex);
}

export const aesEncrypt = (input: string, key: string): string => {
    return AES.encrypt(input, key).toString();
}

export const aesDecrypt = (input: string, key: string): string => {
    return AES.decrypt(input, key).toString(enc.Utf8);
}
