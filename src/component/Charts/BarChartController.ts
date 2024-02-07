import { Component } from "react";

export type Data = {
  title: string;
  tooltip: string;
  key: string;
  labels: string[];
  graphData: any[];
};

export default class BarChartController extends Component<Data> {
  options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#ffffff",
        },
      },
      title: {
        display: true,
        text: this.props.title,
        color: "#ffffff",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
          color: "#ffffff",
        },
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
          color: "#ffffff",
        },
        ticks: {
          color: "#ffffff",
        },
      },
    },
  };
}
