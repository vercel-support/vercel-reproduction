import { Line } from 'react-chartjs-2'

const types = {
  day: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
  week: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
}

function CustomGraph({data, type}) {


  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.35, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);


    return {
      labels: types[type] ?? types['week'],
      datasets: [{
        data: days,
        backgroundColor: gradient,
        borderColor : colors.purple.default,
        borderWidth: 2,
        pointColor : 'white',
        pointBackgroundColor: colors.purple.default, 
        pointBorderColor: 'white',
        pointStrokeColor : colors.purple.default,
        pointHighlightFill: 'white',
        pointHighlightStroke: colors.purple.default,
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


export default CustomGraph
