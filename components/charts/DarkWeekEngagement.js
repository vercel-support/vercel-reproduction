import { Line } from 'react-chartjs-2'

function DarkWeekEngagement({dayEngagementAnalysis}) {

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(0, "rgba(236, 219, 11, 1)");
    gradient.addColorStop(0.5, "rgba(236, 219, 11, 0.5)");
    gradient.addColorStop(1, "rgba(236, 219, 11, 0)");


    return {
      labels: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      datasets: [{
        data: dayEngagementAnalysis,
        backgroundColor: gradient,
        borderColor : "rgba(236, 219, 11, 1)",
        borderWidth: 2,
        pointColor : 'white',
        pointBackgroundColor: "rgba(236, 219, 11, 1)", 
        pointBorderColor: 'white',
        pointStrokeColor : "rgba(236, 219, 11, 1)",
        pointHighlightFill: 'white',
        pointHighlightStroke: "rgba(236, 219, 11, 1)",
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

export default DarkWeekEngagement
