import "./TabNav.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Tab from "./tab/Tab";

const TabNav = ({ tabTitles, children, renderTitle }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="tab_nav">
      <div className="tab_nav__nav">
        {tabTitles.map((tabTitle, index) => (
          <span
            key={index}
            className={selectedIndex === index ? "nav_active" : ""}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {renderTitle ? renderTitle(tabTitle) : tabTitle}
          </span>
        ))}
      </div>
      <div className="tab_nav__content">
        {children?.map((ele, index) => (
          <Tab isSelectedTab={index === selectedIndex} key={index}>
            {ele}
          </Tab>
        ))}
      </div>
    </div>
  );
};

export default TabNav;
TabNav.propTypes = {
  tabTitles: PropTypes.array.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};
