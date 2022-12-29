import { Router, Request, Response } from "express";
import { EARmetricsType } from "@src/services/type";
import { format } from "date-fns";
import { populateEAR } from "@src/services/googleSheets";

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
      const EARNorteSlice = EARNortestringify.slice(0, 5);
      const EARNorte = EARNorteSlice.replace(".", ",");

      const EARNordesteData = resData[3].SubsistemaValorUtil;
      const EARNordestestringify = JSON.stringify(EARNordesteData);
      const EARNordesteSlice = EARNordestestringify.slice(0, 5);
      const EARNordeste = EARNordesteSlice.replace(".", ",");

      const EARSulData = resData[7].SubsistemaValorUtil;
      const EARSulstringify = JSON.stringify(EARSulData);
      const EARSulSlice = EARSulstringify.slice(0, 5);
      const EARSul = EARSulSlice.replace(".", ",");

      const EARSudesteCentroOesteData = resData[19].SubsistemaValorUtil;
      const EARSudesteCentroOestestringify = JSON.stringify(EARSudesteCentroOesteData);
      const EARSudesteCentroOesteSlice = EARSudesteCentroOestestringify.slice(0, 5);
      const EARSudesteCentroOeste = EARSudesteCentroOesteSlice.replace(".", ",")

      const date = new Date();
      const mouthDate = `${format(date, "MMMM, yyyy")}`;
      const metricsEARData =[]

      const metricsEAR: EARmetricsType = {
        "Data": mouthDate,
        "Sudeste / Centro-Oeste": EARSudesteCentroOeste,
        "Sul": EARSul,
        "Nordeste": EARNordeste,
        "Norte": EARNorte,
      };
      metricsEARData.push(metricsEAR);

      await populateEAR(metricsEARData)

      return res.status(200).send({
        metricsEARData,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error });
    }
  })();
});

export default router;
