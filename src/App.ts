import * as bodyParser from 'body-parser';
import "reflect-metadata";
import {Container} from 'inversify';
import {InversifyExpressServer} from 'inversify-express-utils';
import cors from 'cors';
import './controllers/index';

let container = new Container();

let server = new InversifyExpressServer(container);
server.setConfig((app) => {
    // add body parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cors());
});

let app = server.build();
app.listen(3000);