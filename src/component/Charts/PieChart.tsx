import { Chart, ArcElement } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";
import PieChartController from "./PieChartController";

Chart.register(ArcElement);

export default class PieChart extends PieChartController {
  render() {
    return (
      <div
        style={{ height: "400px", display: "flex", justifyContent: "center" }}
      >
        <Pie
          data={{
            labels: this.props.tooltip,
            datasets: [
              {
                data: this.props.data,
                backgroundColor: ["#5CB360", "#ffffff"],
              },
            ],
          }}
          options={this.options}
        />
      </div>
    );
  }
}
