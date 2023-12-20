import * as functions from 'firebase-functions';
import {updateStaticReservations} from './functions/updateReservations';


export const getReservationsRun = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .pubsub.schedule('0 9,17 * * *') // Diariamente às 9 da manhã e 17 da tarde.
  .timeZone('America/Sao_Paulo')
  .onRun(async () => await updateStaticReservations())

export const getReservations = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onRequest(async (req, res) => {
    await updateStaticReservations();
    res.status(200).send('Dados atualizados com sucesso!');
  });