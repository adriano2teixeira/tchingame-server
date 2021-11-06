import  express from "express";
import endpoints from "./endpoints";
import  cors from "cors";
import  bodyParser from "body-parser";
// import "./amq/receiver"
// import "./amq/sender"
//import "../src/queue"

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(endpoints);

export default app;
