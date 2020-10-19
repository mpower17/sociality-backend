import crypto from 'crypto';
import fs from 'fs';

export class KeyPairGenerator {

    // Generates public and private keys for signing JWT tokens
    static generateKeyPair() {
        const keyPair = crypto.generateKeyPairSync(
            'rsa',
            {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: "pkcs1",
                    format: "pem"
                },
                privateKeyEncoding: {
                    type: "pkcs1",
                    format: "pem"
                }
            })

        fs.writeFileSync(`${__dirname}/id_rsa_pub.pem`, keyPair.publicKey);
        fs.writeFileSync(`${__dirname}/id_rsa_priv.pem`, keyPair.privateKey);
    }
}