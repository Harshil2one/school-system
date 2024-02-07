import {
  Chart,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import BarChartController from "./BarChartController";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default class BarChart extends BarChartController {
  render() {
    return (
      <div
        style={{ height: "400px", display: "flex", justifyContent: "center" }}
      >
        <Bar
          data={{
            labels: this.props.labels,
            datasets: [
              {
                label: this.props.tooltip,
                data: this.props.graphData,
                backgroundColor: "#ffffff",
                borderRadius: 30,
                barPercentage: 0.3,
              },
            ],
          }}
          options={this.options}
        />
      </div>
    );
  }
}
