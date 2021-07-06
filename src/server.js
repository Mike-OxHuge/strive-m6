import express from "express";
import listEndpoints from "express-list-endpoints";

const server = express();

const port = process.env.PORT || 3001;
console.table(listEndpoints(server));
