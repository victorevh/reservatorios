import axios from "axios";
import { Reservation, ReservationsData } from "../services/types";
import { db } from "../server/provider";
import { updateIfNotExist } from "../services/firebase";

export const updateStaticReservations = async () => {
  const url = "http://tr.ons.org.br/Content/Get/SituacaoDosReservatorios";

  try {
    const response = await axios.get(url);
    const data = response.data;

    const subsystemMap: { [key: string]: string } = {
      Norte: "North",
      Nordeste: "NorthEast",
      Sul: "South",
      "Sudeste / Centro-Oeste": "SoutheastMidwest",
    };

    const subsystemData: ReservationsData = {
      North: [],
      NorthEast: [],
      South: [],
      SoutheastMidwest: [],
    };

    data.forEach((item: Reservation) => {
      const subsystemEnglish = subsystemMap[item.Subsistema] || "Unknown";

      if (subsystemEnglish !== "Unknown") {
        subsystemData[subsystemEnglish as keyof ReservationsData].push(item);
      } else {
        console.warn(
          `Subsistema desconhecido ou não mapeado: ${item.Subsistema}`
        );
      }
    });

    for (const item of data) {
      const regionEnglish = subsystemMap[item.Subsistema] || "Unknown";
      if (regionEnglish !== "Unknown") {
        await updateIfNotExist(db, regionEnglish, item);
      } else {
        console.warn(
          `Subsistema desconhecido ou não mapeado: ${item.Subsistema}`
        );
      }
    }

    return;
  } catch (error: any) {
    console.error("Erro ao atualizar dados:", error.message);
  }
};
