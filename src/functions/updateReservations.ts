import axios from 'axios';

export const updateStaticReservations = async () => {
  const url = 'http://tr.ons.org.br/Content/Get/SituacaoDosReservatorios';

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Filtrar dados por subsistema
    const subsistemas = ['Norte', 'Nordeste']; // Adicione outros subsistemas conforme necessário

    for (const subsistema of subsistemas) {
      const filteredData = data.filter((item: any) => item.Subsistema === subsistema);

      // Mapear dados para o formato desejado
      const mappedData = filteredData.map((item: any) => ({
        Data: item.Data,
        Reservatorio: item.Reservatorio,
        ReservatorioEARVerificadaMWMes: item.ReservatorioEARVerificadaMWMes,
        Bacia: item.Bacia,
        // Adicione outros campos conforme necessário
      }));

      return mappedData;
    }

    console.log('Dados atualizados com sucesso!');
  } catch (error: any) {
    console.error('Erro ao atualizar dados:', error.message);
  }
};
