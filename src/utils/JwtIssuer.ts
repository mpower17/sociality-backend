import jsonwebtoken from 'jsonwebtoken';
import path from "path";
import fs from "fs";

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf-8');

export class JwtIssuer {

    static issueJwt(user) {
        const id = user.id;
        const expiresIn = '1d';

        const payload = {
            sub: id,
            iat: Date.now(),
        };

        const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn: expiresIn, algorithm: 'RS256'});

        return {
            token: "Bearer " + signedToken,
            expiresIn: expiresIn
        }
    }

}