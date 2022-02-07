import { encodeKey, USER_DATA_STORAGE } from "./constants"

import aes from 'crypto-js/aes';
import cryptoJS from 'crypto-js/enc-utf8'
import lscache from 'lscache';
import cookie from 'js-cookie';

export const setUserData = (userData) => {

    const encryptedData = encrypt(userData);

    const expiryTime = userData.expiry;
    const currentTime = new Date().getTime();

    const expireInMin = (expiryTime - currentTime) / 60000;

    lscache.set(USER_DATA_STORAGE, encryptedData, expireInMin)
}

export const getUserData = () => {
    return decrypt(lscache.get(USER_DATA_STORAGE));
}

export const clearAllData = () => {
    lscache.remove(USER_DATA_STORAGE);
}

export function encrypt(object) {
    const ciphertext = aes.encrypt(JSON.stringify(object), encodeKey);

    return ciphertext.toString();
}

export function decrypt(ciphertext) {
    if (ciphertext == null || ciphertext === '') {
        return '';
    }

    const bytes = aes.decrypt(ciphertext.toString(), encodeKey);
    const decryptedData = JSON.parse(bytes.toString(cryptoJS));

    return decryptedData;
}



export function deleteJWTCookies() {
    cookie.remove('jwt', { path: 'login', domain: 'localhost:3000' });
}