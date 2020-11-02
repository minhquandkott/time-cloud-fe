import React from "react";
import PropTypes from "prop-types";
import "./ChartDoughnut.css";
import { Pie } from "react-chartjs-2";

const ChartDoughnut = ({ labels, datasets }) => {
  return (
    <div>
      <Pie
        width={15}
        height={15}
        data={{
          labels: labels,
          datasets: [
            {
              label: datasets.label,
              backgroundColor: datasets.color,
              data: datasets.data,
            },
          ],
        }}
        options={{
          legend: {
            display: true,
          },
          title: {
            display: true,
            text: "unit:(%)",
            position: "bottom",
            fontSize: "20",
          },
          plugins: {
            datalabels: {
               display: false,
              
            }
         }
        }}
      />
    </div>
  );
};

ChartDoughnut.propTypes = {
  labels: PropTypes.array,
  datasets: PropTypes.shape({
    label: PropTypes.arrayOf(PropTypes.string),
    backgroundColor: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default ChartDoughnut;
