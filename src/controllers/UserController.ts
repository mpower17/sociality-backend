import express = require("express");
import {controller, httpGet, httpPost} from "inversify-express-utils";
import {User} from "../models/User";

@controller('/users')
export class UserController {

    @httpGet("/")
    async index(req: express.Request, res: express.Response) {
        return User.findAll<User>({})
            .then((users: Array<User>) => res.json(users))
            .catch((err: Error) => res.status(500).json(err));
    }

    @httpPost("/")
    async create(req: express.Request, res: express.Response) {
        const params: User = req.body;

        return User.create<User>(params)
            .then((user: User) => res.status(201).json(user))
            .catch((err: Error) => res.status(500).json(err));
    }
}