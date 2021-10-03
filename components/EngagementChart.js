import { Line } from 'react-chartjs-2';
 
const EngagementChart = ({ hourEngagementAnalysis, hours}) => {
  
  return (
    <Line 
      options={{
        maintainAspectRatio: false,
        layout: {
          padding: 10,
        },
        title: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                padding: 5,
              }
            }
          ]
        },
      }}

      data={
        {
          labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
          datasets: [
            {
              label: 'Interaktionsrate',
              data: hourEngagementAnalysis,
              backgroundColor: '#ffe0e6',
              borderColor: '#ff6384',
            },
            {
              label: 'Uhrzeit des Beitrages',
              data: hours,
              backgroundColor: '#d6ecfb',
              borderColor: '#35a2eb',
            },
          ]
        }
      }
    />
  )
}

export default EngagementChart