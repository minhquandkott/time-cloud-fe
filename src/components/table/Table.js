import "./Table.css";
import React from "react";
import PropTypes from "prop-types";

const Table = (props) => {
  const { columns, data = [], onClickHandler } = props;
  const heads = Object.keys(columns).map((key) => {
    const { label, cssHeader, convertHeader, width } = columns[key];
    return (
      <th
        style={{
          ...cssHeader,
          width: width,
        }}
        key={key}
      >
        {convertHeader ? convertHeader(data, label) : label}
      </th>
    );
  });
  const cells = data.map((element) => {
    return (
      <tr key={element.id} onClick={() => onClickHandler(element)}>
        {Object.keys(columns).map((key) => {
          const { cssData, convertData, width } = columns[key];
          const cellData = element[key];
          return (
            <td
              key={key}
              style={{
                ...cssData,
                width: width,
              }}
            >
              {convertData ? convertData(element) : cellData}
            </td>
          );
        })}
      </tr>
    );
  });
  return (
    <table className="table">
      <thead className="table__head">
        <tr>{heads}</tr>
      </thead>
      <tbody className="table__body">{cells}</tbody>
    </table>
  );
};

export default Table;

Table.propTypes = {
  columns: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      width: PropTypes.string,
      label: PropTypes.string,
      cssHeader: PropTypes.object,
      convertHeader: PropTypes.func,
      cssData: PropTypes.object,
      convertData: PropTypes.func,
    }),
  }),
  data: PropTypes.array,
  onClickHandler: PropTypes.func,
};
