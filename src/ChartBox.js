import React from "react";
import axios from "axios";
import { Chart } from "chart.js";

class ChartBox extends React.Component {
  state = {
    data: [],
    chart: ''
  };
  componentDidMount = async () => {
    try {
      const downloadedData = await axios.get(
        "http://api.coindesk.com/v1/bpi/historical/close.json"
      );
      this.setState({ data: downloadedData.data.bpi });
      //   this.renderGraph();
    } catch (err) {
      console.error(err);
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if(prevState.chart !== this.state.chart) {
      this.renderGraph();
    }
  };

  renderGraph = () => {
    let ctx = document.getElementById("myChart");
    let myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    this.setState({chart: myChart})
  };
  render() {
    return <canvas id="myChart" width="400" height="400"></canvas>;
  }
}
export default ChartBox;