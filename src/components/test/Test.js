import "./Test.css";
import { Transition } from "react-transition-group";
import React, { useState, useRef } from "react";

const Test = () => {
  const [toggle, setToggle] = useState(false);
  const divRef = useRef(null);
  return (
    <div className="test">
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      <Transition in={toggle} timeout={1000} mountOnEnter unmountOnExit>
        {(state) => {
          console.log(state);
          if (state === "entering") {
            divRef.current.style.maxHeight = divRef.current.scrollHeight + "px";
            divRef.current.style.opacity = "1";
          }
          if (state === "exiting") {
            divRef.current.style.maxHeight = "0";
            divRef.current.style.opacity = "0";
          }
          return (
            <div
              ref={divRef}
              style={{
                maxHeight: 0,
                backgroundColor: "red",
                transition: "all 1s",
                overflow: "hidden",
              }}
            >
              <p>abc</p>
              <p>abc</p>
              <p>abc</p>
              <p>abc</p>
              <p>abc</p>
            </div>
          );
        }}
      </Transition>
    </div>
  );
};

export default Test;
