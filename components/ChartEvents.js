import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

export default function ChartEvent({ userData }) {
  console.log(userData.map((data) => data.event));
  const auxA = [];
  const dataGroup = userData.map((user) => ({}));
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Participantes por Evento",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  const [userD, setUserData] = useState({
    labels: userData.map((data) => data.event),
    datasets: [
      {
        data: userData.map((data) => 4),
        backgroundColor: ["#1976D2"],
        borderColor: "#1976D2",
        borderWidth: 1,
      },
    ],
  });

  // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT

  return <Bar options={options} data={userD} />;
}
