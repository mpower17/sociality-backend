import crypto from 'crypto';

export class PasswordGenerator {

    // validatesPassword
    static validPassword(password, hash, salt) {
        let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

        return hash === hashVerify;
    }

    // generates password hash and salt
    static genPassword(password) {
        let salt: string = crypto.randomBytes(32).toString('hex');
        let hash: string = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

        return {
            salt: salt,
            hash: hash
        };
    }

    static test() {
        let password = "12345";

        let hashSalt = this.genPassword(password);

        this.validPassword(password, hashSalt.hash, hashSalt.salt);
    }
}