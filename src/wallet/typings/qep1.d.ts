import { ScryptParams } from './core';

/** Encrypts a QTP key using a given keyphrase under QEP-1 Standard. */
export function encrypt(qtpKey: string, keyphrase: string, scryptParams?: ScryptParams): string

/** Encrypts a QTP key using a given keyphrase under QEP-1 Standard. */
export function decrypt(encryptedKey: string, keyphrase: string, scryptParams?: ScryptParams): string

/** Decrypts an encrypted key using a given keyphrase under QEP-1 Standard. */
export function encryptAsync(wifKey: string, keyphrase: string, scryptParams?: ScryptParams): string

/** Decrypts an encrypted key using a given keyphrase under QEP-1 Standard. */
export function decryptAsync(encryptedKey: string, keyphrase: string, scryptParams?: ScryptParams): string
