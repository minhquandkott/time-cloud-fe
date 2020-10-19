import "./Test.css";
import React from "react";

function* gen(n) {
  let a = 1;
  var p = yield a + n;
  console.log(p);
  return 0;
}

const Test = () => {
  const b = () => {
    const gen1 = gen(1);
    console.log(gen1.next(1));
    console.log(gen1.next());
  };

  return <div>{b()}</div>;
};

export default Test;
