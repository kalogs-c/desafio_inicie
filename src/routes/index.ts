import axios from "axios";
import { Router, Request, Response } from "express";
import { envs } from "../../envs.config";
import { sortAnNumberArray } from "./../lib/sortFunction";

export const router = Router();

const getAPILink = (state: any, date: any) =>
  `https://api.brasil.io/v1/dataset/covid19/caso/data/?state=${state}&date=${date}`;

router.get("/", async (req: Request, res: Response) => {
  const { state, dateStart } = req.query;
  const callback: any = await axios({
    method: "GET",
    url: getAPILink(state, dateStart),
    headers: {
      Authorization: `Token ${envs.API_KEY}`,
    },
  });

  const allData = callback.data.results;
  const allCases = allData.map((city: any) => {
    const cityName: string = city.city;
    const cases: number = city.confirmed;
    const population: number = city.estimated_population;

    if (cases === null || population === null) return;

    const percentCases = cases / population;
    const data = {
      city: cityName,
      percentCases: (percentCases * 100).toFixed(5),
    };
    return data;
  });

  const sortedCases = sortAnNumberArray(allCases);
  const top10Cases: any = sortedCases.slice(0, 10);
  console.table(top10Cases);

  top10Cases.forEach(async (city: any, i: number) => {
    const callback = await axios({
      method: "POST",
      url: "https://us-central1-lms-nuvem-mestra.cloudfunctions.net/testApi",
      headers: {
        MeuNome: "Carlos Camilo",
      },
      data: {
        id: i,
        nomeCidade: city.cityName,
        percentualDeCasos: city.percentCases,
      },
    });

    console.log(callback);
  });

  res.json(top10Cases);
});
