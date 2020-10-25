import express = require("express");
import {controller, httpGet, httpPost} from "inversify-express-utils";
import {Image} from "../models/Image";

@controller('/images')
export class ImageController {

    @httpGet("/")
    async index(req: express.Request, res: express.Response) {
        return Image.findAll<Image>({})
            .then((images: Array<Image>) => res.json(images))
            .catch((err: Error) => res.status(500).json(err));
    }

    @httpPost("/")
    async create(req: express.Request, res: express.Response) {
        const image: Image = req.body;

        return Image.create<Image>(image)
            .then((image: Image) => {
                res.json({success: true, image: image});
            })
            .catch((err: Error) => res.status(500).json(err));
    }
}
