const { GoogleSpreadsheet } = require('google-spreadsheet');


const credenciais = require('../../credenciais.json');
const arquivo = require('../../arquivo.json');


export const populateEAR = async (content: any) => {
    try {
        const title = "EAR"

        const doc = new GoogleSpreadsheet(arquivo.EARspreadsheetID);
        await doc.useServiceAccountAuth({
            client_email: credenciais.client_email,
            private_key: credenciais.private_key.replace(/\\n/g, '\n')
        });

        await doc.loadInfo();

        const sheet = doc.sheetsByTitle[title];

        await sheet.addRows(content);

        return;

    } catch (err) {
        throw err
    }
}