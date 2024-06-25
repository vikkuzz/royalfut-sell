import crypto from "node:crypto";

const algorithm = "aes-256-cbc";
const IV_LENGTH = 16;
const ENCRYPTION_KEY = crypto.randomBytes(32);
const IV = crypto.randomBytes(IV_LENGTH);

export function encrypt(text: string) {
    const cipher = crypto.createCipheriv(
        algorithm,
        Buffer.from(ENCRYPTION_KEY),
        IV
    );

    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return IV.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text: string) {
    const textParts = text.split(":");
    const iv = Buffer.from(textParts.shift()!, "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(ENCRYPTION_KEY),
        iv
    );

    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}
