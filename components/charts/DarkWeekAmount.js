import { Line } from "react-chartjs-2";

function DarkWeekAmount({ days }) {
  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)",
    },
  };

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.35, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    return {
      labels: [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
      ],
      datasets: [
        {
          data: [...days],
          backgroundColor: gradient,
          borderColor: colors.purple.default,
          borderWidth: 2,
          pointColor: "white",
          pointBackgroundColor: colors.purple.default,
          pointBorderColor: "white",
          pointStrokeColor: colors.purple.default,
          pointHighlightFill: "white",
          pointHighlightStroke: colors.purple.default,
          fill: "start",
        },
      ],
    };
  };

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
      xAxes: [
        {
          gridLines: {
            color: "rgba(200, 200, 200, 0.05)",
            lineWidth: 0,
          },
          ticks: {
            fontColor: "white",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgba(200, 200, 200, 0.08)",
            lineWidth: 1,
          },
          ticks: {
            fontColor: "white",
          },
        },
      ],
    },
    responsive: true,
    datasetStrokeWidth: 3,
    pointDotStrokeWidth: 4,
  };

  return <Line data={data} options={options} />;
}

export default DarkWeekAmount;
