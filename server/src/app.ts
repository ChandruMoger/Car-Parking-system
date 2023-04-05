import bodyParser from "body-parser";
import express, { Express, RequestHandler } from 'express';
import {carParkingRouter} from './Routes';

import cors from "cors";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', carParkingRouter);



export default app;