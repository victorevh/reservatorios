import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as functions from "firebase-functions";

const configKey =
  process.env.NODE_ENV !== "production"
    ? {
        privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
        clientEmail: process.env.CLIENT_EMAIL,
        projectId: process.env.PROJECT_ID,
      }
    : {
        privateKey: functions
          .config()
          .reservatorios.private_key.replace(/\\n/g, "\n"),
        clientEmail: functions.config().reservatorios.client_email,
        projectId: functions.config().reservatorios.project_id,
      };

const reservations =
  getApps().length === 0 ? initializeApp(configKey) : getApp();

export const reservationsApp = reservations;
export const db = getFirestore(reservationsApp);
