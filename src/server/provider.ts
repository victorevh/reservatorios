
import { initializeApp } from "firebase/app";
import * as functions from 'firebase-functions'
import { getFirestore } from "firebase/firestore";
const config = functions.config() || {}
// Troca \\n por \n
config.reservatorios.private_key =
  config.reservatorios.private_key.replace(/\\n/g, "\n");


var configKey = {
    privateKey: config.reservatorios.private_key,
    clientEmail: config.reservatorios.client_email,
    projectId:  config.reservatorios.project_id,
  };

const reservations = initializeApp(configKey);

export const reservationsApp = reservations;
export const db = getFirestore(reservationsApp);
