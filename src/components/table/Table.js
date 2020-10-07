import "./Table.css";
import React from "react";
import PropTypes from "prop-types";
import Skeleton from "../../components/loading/skeleton/Skeleton";

const Table = ({
  columns,
  data = [],
  onClickHandler = () => {},
  skeletonLoading = true,
}) => {
  const heads = columns
    ? Object.keys(columns).map((key) => {
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
      })
    : null;

  const cells = data.map((element) => {
    return (
      <tr key={element.id} onClick={(event) => onClickHandler(element, event)}>
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
  const table =
    !data.length && skeletonLoading ? (
      <React.Fragment>
        <Skeleton
          countItem={columns ? Object.keys(columns).length : 3}
          heightItem="2rem"
          direction="row"
        />
        <Skeleton
          countItem={6}
          heightItem="5rem"
          direction="column"
          bgSkeleton="var(--color-light-primary)"
        />
      </React.Fragment>
    ) : (
      <table className="table">
        <thead className="table__head">
          <tr>{heads}</tr>
        </thead>
        <tbody className="table__body">{cells}</tbody>
      </table>
    );
  return table;
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
  skeletonLoading: PropTypes.bool,
};
