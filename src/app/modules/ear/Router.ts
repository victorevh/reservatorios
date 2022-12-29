import { Router, Request, Response } from "express";
import { EARmetricsType } from "@src/services/type";
import { format } from "date-fns";

const router = Router();
const axios = require("axios");

router.get("/", (req: Request, res: Response) => {
  (async () => {
    try {
      const response = await axios.get(
        "http://tr.ons.org.br/Content/Get/SituacaoDosReservatorios"
      );
      const resData = response.data;

      const EARNorteData = resData[0].SubsistemaValorUtil;
      const EARNortestringify = JSON.stringify(EARNorteData);
      const EARNorte = EARNortestringify.slice(0, 5);

      const EARNordesteData = resData[3].SubsistemaValorUtil;
      const EARNordestestringify = JSON.stringify(EARNordesteData);
      const EARNordeste = EARNordestestringify.slice(0, 5);

      const EARSulData = resData[7].SubsistemaValorUtil;
      const EARSulstringify = JSON.stringify(EARSulData);
      const EARSul = EARSulstringify.slice(0, 5);

      const EARSudesteCentroOesteData = resData[19].SubsistemaValorUtil;
      const EARSudesteCentroOestestringify = JSON.stringify(
        EARSudesteCentroOesteData
      );
      const EARSudesteCentroOeste = EARSudesteCentroOestestringify.slice(0, 5);

      const date = new Date();
      const mouthDate = `${format(date, "MMMM, yyyy")}`;

      const metricsEAR: EARmetricsType = {
        "Data": mouthDate,
        "Sudeste / Centro-Oeste": EARSudesteCentroOeste,
        "Sul": EARSul,
        "Nordeste": EARNordeste,
        "Norte": EARNorte,
      };

      const nordeste = resData.filter(
        (item: any) => item.Subsistema === "Nordeste"
      );
      const nordesteReservatórios = nordeste.map((item: any) => {
        return item.Bacia;
      });

      return res.status(200).send({
        metricsEAR,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error });
    }
  })();
});

export default router;
