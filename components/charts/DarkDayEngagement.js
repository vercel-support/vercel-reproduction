import { Line } from 'react-chartjs-2'
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.plugins.unregister(ChartDataLabels);

function DarkDayEngagement({hourEngagementAnalysis}) {
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
    gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    return {
      labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
      datasets: [{
        data: hourEngagementAnalysis,
        backgroundColor: gradient,
        borderColor : '#982027',
        borderWidth: 2,
        pointColor : 'white',
        pointBackgroundColor: 'white', 
        pointBorderColor: '#982027',
        pointStrokeColor : '#982027',
        pointHighlightFill: 'white',
        pointHighlightStroke: '#982027',
        fill: 'start',
      }]
    }
  }

  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: 20,
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(200, 200, 200, 0.05)',
          lineWidth: 0
        },
        ticks: {
          fontColor: 'white'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(200, 200, 200, 0.08)',
          lineWidth: 1
        }, 
        ticks: {
          fontColor: 'white'
        }
      }]
    },
    responsive: true,
    datasetStrokeWidth : 3,
    pointDotStrokeWidth : 4,
  }

  return (
    <Line 
      data={data}
      options={options}    
    />
  )
}

export default DarkDayEngagement
