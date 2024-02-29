import { setDoc, getDoc, doc } from "firebase/firestore";
import { Reservation } from "./types";

const date = new Date().toISOString().split("T")[0];

export const generateDocId = (item: Reservation, region: string): string => {
  const idPart = `${item.Reservatorio}-`.replace(/[^a-zA-Z0-9]/g, "");
  return `${region.toLowerCase()}-${idPart}`;
};

export const sendData = async (
  db: any,
  region: string,
  item: Reservation
): Promise<void> => {
  const docId = generateDocId(item, region);
  const docRef = doc(db, `reservations/${region.toLowerCase()}/${date}`, docId);

  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    await setDoc(docRef, item);
    console.log(
      `Dados adicionados para ${item.Data} na região ${region} com ID ${docId}`
    );
  } else {
    console.log(
      `Dados já existem para ${item.Data} na região ${region} com ID ${docId}, pulando a inserção.`
    );
  }
};
