import React from "react";
import { Line } from "react-chartjs-2";
import LineChartController from "./LineChartController";
import { Chart, LineElement, PointElement } from "chart.js";

Chart.register(LineElement, PointElement);

export default class LineChart extends LineChartController {
  render() {
    return (
      <div
        style={{ height: "400px", display: "flex", justifyContent: "center" }}
      >
        <Line
          data={{
            labels: this.props.labels,
            datasets: [
              {
                label: "Marks",
                data: this.props.graphData,
                fill: false,
                borderColor: "#ffffff",
                tension: 0.1,
              },
            ],
          }}
          options={this.options}
        />
      </div>
    );
  }
}
