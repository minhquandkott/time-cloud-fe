import "./Table.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "../../components/loading/skeleton/Skeleton";
import { TransitionGroup, Transition } from "react-transition-group";

const Table = ({
  columns,
  data = [],
  onClickHandler = () => {},
  skeletonLoading = true,
}) => {
  const [elementSelected, setElementSelected] = useState(null);
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

  const cells = data.map((element, index) => {
    return (
      <Transition
        key={element.id}
        timeout={1000}
        mountOnEnter
        unmountOnExit
        onEnter={(node) => {
          console.log(1, node);
          node.style.opacity = 0;
          node.style.transform = "translateX(150%)";
        }}
        onEntering={(node) => {
          console.log(2, node);
          node.style.opacity = 1;
          node.style.transform = "translateX(0)";
        }}
        onEntered={() => console.log(3)}
        onExit={(node) => {
          console.log(4, node);
          node.style.maxHeight = node.scrollHeight + "px";
          node.style.transform = "translateX(0)";
        }}
        onExiting={(node) => {
          console.log(5, node);
          node.style.maxHeight = 0;
          node.style.padding = "0";
          node.style.transform = "translateX(150%)";
        }}
        onExited={() => console.log(6)}
      >
        <tr
          onClick={(event) => {
            onClickHandler(element, event);
            setElementSelected(element);
          }}
          style={{
            transitionDelay: `${index * 0.03}s`,
            position: elementSelected === element ? "relative" : "initial",
            zIndex: elementSelected === element ? "1" : "initial",
          }}
        >
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
      </Transition>
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
        <TransitionGroup className="table__body" component={"tbody"}>
          {cells}
        </TransitionGroup>
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
