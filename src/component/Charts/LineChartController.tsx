import { Component } from "react";

export type Data = {
  title: string;
  tooltip: string;
  key: string;
  labels: string[];
  graphData: any[];
};

export default class LineChartController extends Component<Data> {
  options: any = {
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
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
      y: {
        min: 0,
        max: 100,
        grid: {
          display: false,
        },
        ticks: {
          color: "#ffffff",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#ffffff",
        },
      },
    },
  };
}
