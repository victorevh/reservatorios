import { Router, request, response, Request, Response } from "express";
import { EARmetricsType } from "@src/services/type";

const router = Router();
const axios = require("axios");

router.get("/", (req: Request, res: Response) => {
  const axios = require("axios");

  (async () => {
    try {
      const response = await axios.get(
        "http://tr.ons.org.br/Content/Get/SituacaoDosReservatorios"
      );
      const resData = response.data;

      const nordeste = resData.filter(
        (item: any) => item.Subsistema === "Nordeste"
      );
      const nordesteReservatórios = nordeste.map((item: any) => {
        return item.Bacia;
      });

      return res.status(200).send({
        nordeste,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error });
    }
  })();
});

export default router;
