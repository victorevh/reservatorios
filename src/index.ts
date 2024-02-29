import * as functions from "firebase-functions";
import { updateStaticReservations } from "./functions/updateReservations";

export const getReservationRun = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "2GB",
  })
  .pubsub.schedule("0 14 * * *") // Diariamente às 14 da tarde.
  .timeZone("America/Sao_Paulo")
  .onRun(async () => await updateStaticReservations());
