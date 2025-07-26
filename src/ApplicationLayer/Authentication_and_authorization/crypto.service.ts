
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

@Injectable()
export class CryptoService {
  private getEncryptionKeyBuffer(encryptionKey: string): Buffer {
    const buf = Buffer.from(encryptionKey, 'hex');
    if (buf.length !== 32) {
      throw new Error('Invalid key length');
    }
    return buf;
  }

  encrypt(plainText: string, encryptionKey: string): string {
    const keyBuffer = this.getEncryptionKeyBuffer(encryptionKey);
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);

    const encrypted = Buffer.concat([
      cipher.update(plainText, 'utf8'),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();
    const combined = Buffer.concat([iv, encrypted, authTag]);

    return combined.toString('base64');
  }

  decrypt(payloadBase64: string, encryptionKey: string): string {
    const keyBuffer = this.getEncryptionKeyBuffer(encryptionKey);
    const payload = Buffer.from(payloadBase64, 'base64');

    const iv = payload.subarray(0, IV_LENGTH);
    const authTag = payload.subarray(payload.length - AUTH_TAG_LENGTH);
    const encryptedData = payload.subarray(
      IV_LENGTH,
      payload.length - AUTH_TAG_LENGTH,
    );

    const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }
}
