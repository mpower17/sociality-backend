import express = require("express");
import {controller, httpGet} from "inversify-express-utils";

@controller('/feeds')
export class FeedController {

    @httpGet("/")
    async index(req: express.Request, res: express.Response): Promise<void> {
        try {
            res.send("Test feeds");
        } catch (e) {
            console.log(e);
        }
    }
}