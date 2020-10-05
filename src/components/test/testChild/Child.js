import React, { useEffect, useState } from "react";
import Test from "../Test";

const Child = () => {
  const [b, setB] = useState(false);
  useEffect(() => {
    console.log(b);
  });
  return <Test b={b} />;
};

export default Child;
