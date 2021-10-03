import { Line } from 'react-chartjs-2';
 
const DayInteraction = ({ dayEngagementAnalysis, days}) => {
  
  return (
    <Line 
      options={{
        maintainAspectRatio: false,
        layout: {
          padding: 20,
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
         labels: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
         datasets: [
           {
            label: 'Wochentag der Beiträge',
            data: days,
            backgroundColor: 'rgb(242, 255, 237)',
            borderColor: 'rgb(47, 185, 101)',
            },
            {
            label: 'Interaktionsrate',
            data: dayEngagementAnalysis,
            backgroundColor: 'rgb(211, 191, 255)',
            borderColor: 'rgb(90, 47, 185)',
          },
        ]
      }}
      
    />
  )
}

export default DayInteraction