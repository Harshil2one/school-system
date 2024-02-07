import { Component } from "react";

export default class PieChartController extends Component<{
  data: number[];
  title: string;
  key: string;
  tooltip: string[];
}> {
  options = {
    responsive: true,
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
  };
}
