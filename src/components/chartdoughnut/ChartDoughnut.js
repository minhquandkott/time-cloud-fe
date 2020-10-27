import React from 'react';
import PropTypes from 'prop-types';
import './ChartDoughnut.css';
import { Doughnut } from "react-chartjs-2";

const ChartDoughnut = ({labels,datasets}) => {
    return (
        <div>
            <Doughnut
                width = {50}
                height={15}
                data={{
                    labels: labels,
                datasets: [{
                    label: datasets.label,
                    backgroundColor: datasets.color,
                    data: datasets.data
                    }
                ]
                }}
                 option={{
                    title: {
                    display: true,
                    text: ""
                    }
                }}
            />
        </div>
    )
}

ChartDoughnut.propTypes = {
    labels: PropTypes.array,
    datasets : PropTypes.shape({
        
        label:PropTypes.string,
        backgroundColor:PropTypes.arrayOf(PropTypes.string),
        data:PropTypes.arrayOf(PropTypes.number)
    }),
}

export default ChartDoughnut
