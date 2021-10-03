import { Bar } from 'react-chartjs-2'

const DayChart = ({days}) => {
  return (
    <Bar 
      legend={{
        display: false,
        labels: {
          boxWidth: 0,
        },
      }}
      options={{
        maintainAspectRatio: false,
        title: {
          display: false,
        },
        layout: {
          padding: 20,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: false,
              ticks: {
                padding: 10,
              }
            }
          ]
        },
      }}
      data={{
        labels: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        datasets: [{
          data: days,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }]
        
      }}
    />
  )
}

export default DayChart