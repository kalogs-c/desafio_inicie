import axios from "axios";
import { Router, Request, Response } from "express";
import { envs } from "../../envs.config";

export const router = Router();

const getAPILink = (state: any, date: any) =>
  `https://brasil.io/api/dataset/covid19/caso/data/?state=${state}&date=${date}`;

router.get("/", async (req: Request, res: Response) => {
  const state = req.query.state;
  const dateStart = req.query.dateStart;
  const callback = await axios(getAPILink(state, dateStart), {
    headers: {
      Authorization: envs.API_KEY,
    },
  });

  res.send(callback);
});
