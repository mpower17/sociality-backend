import express = require("express");
import {controller, httpGet} from "inversify-express-utils";
import {Post} from "../models/Post";

@controller('/posts')
export class PostController {

    @httpGet("/")
    async index(req: express.Request, res: express.Response) {
        return Post.findAll<Post>({})
            .then((users: Array<Post>) => res.json(users))
            .catch((err: Error) => res.status(500).json(err));
    }
}
