import * as functions from "firebase-functions";
import * as express from "express";

export const helloWorld = functions.https.onRequest(
  (request: express.Request, response: express.Response) => {
    response.send("Hello from Firebase!");
  }
);
