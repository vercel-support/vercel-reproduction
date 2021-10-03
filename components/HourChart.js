import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.plugins.unregister(ChartDataLabels);

const HourChart = ({hours}) => {

  const colors = Array.from({length: 24}, () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, `);

  return (
    <Bar 
      // height={200}
      // width={200}
      // plugins={[ChartDataLabels]}
      options={{
        maintainAspectRatio: false,
        layout: {
          padding: 20,
        },
        // plugins: {
        //   datalabels: {
        //     formatter: (val, context) => (val > 0 ? context.chart.data.labels[context.dataIndex] : null)
        //   },
        // },
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      }}
      data={
        {
          labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
          datasets: [{
            // datalabels: {
            //   align: 'end',
            //   anchor: 'end',
            //   clip: false,
            // },
            data: hours,
            backgroundColor: colors.map(color => color + '0.3)'),
            borderColor: colors.map(color => color + '1)'),
            borderWidth: 1,
          }]
        }
      }
    />
  )
}

export default HourChart

