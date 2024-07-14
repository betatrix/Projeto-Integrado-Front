import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.REACT_APP_SECRET_KEY || 'default_secret_key';

export const encryptData = (data: string) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
