import express = require("express");
import {controller, httpGet, httpPost} from "inversify-express-utils";
import {User} from "../models/User";
import {PasswordGenerator} from "../utils/PasswordGenerator";
import {JwtIssuer} from "../utils/JwtIssuer";
import {Image} from "../models/Image";

@controller('/users')
export class UserController {

    @httpGet("/")
    async index(req: express.Request, res: express.Response) {
        return User.findAll<User>({ where: {}, include: [Image]})
            .then((users: Array<User>) => {
                res.json(users.map(u => u.toDTO()))
            })
            .catch((err: Error) => res.status(500).json(err));
    }

    @httpPost("/login")
    async login(req: express.Request, res: express.Response) {
        return User.findOne({where: {email: req.body.email}})
            .then((user) => {
                if (!user) {
                    res.status(404).json({success: false,  msg: "couldn't find user"});
                }

                let passwordHashSalt = JSON.parse(user.password);
                const isValid = PasswordGenerator.validPassword(req.body.password, passwordHashSalt.hash, passwordHashSalt.salt);

                if (isValid) {
                    const tokenObj = JwtIssuer.issueJwt(user.getDataValue("password"));

                    res.status(200).json({success: true, user: user, token: tokenObj.token, expiresIn: tokenObj.expiresIn});
                } else {
                    res.status(401).json({success: false, msg: "wrong password"});
                }
            })
    }

    @httpPost("/register")
    async register(req: express.Request, res: express.Response) {
        const saltHash = PasswordGenerator.genPassword(req.body.password);

        const user: User = req.body;
        user.password = JSON.stringify(saltHash);

        return User.create<User>(user)
            .then((user: User) => {
                const jwt = JwtIssuer.issueJwt(user);

                res.json({success: true, user: user, token: jwt.token, expiresIn: jwt.expiresIn});
            })
            .catch((err: Error) => res.status(500).json(err));
    }
}
