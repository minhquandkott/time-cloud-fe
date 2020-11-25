import "./DragDrop.css";
import React, { useRef, useState } from "react";

const a = ["a", "b", "c", "d", "e"];

const DragDrop = () => {
  const [arr, setArr] = useState(a);
  const [draggingIndex, setDraggingIndex] = useState(-1);
  const [overIndex, setOverIndex] = useState(-1);
  const draggingValue = useRef(null);

  const dragStartHandler = (event, index) => {
    // const a = document.getElementById("test");
    // event.dataTransfer.setDragImage(a, 0, 0);
    // a.style.display = "initial";
    setTimeout(() => {
      setDraggingIndex(index);
      draggingValue.current = arr[index];
      // a.style.display = "none";
    }, 0);
  };
  const onDragEnterHandler = (event, index) => {
    if (draggingIndex !== index) {
      setOverIndex(index);
    }
  };
  const onDragLeaveHandler = (event) => {
    setOverIndex(draggingIndex);
  };

  const onDragOverHandler = (event, index) => {
    event.preventDefault();

    if (arr[index] !== draggingValue.current) {
      swap(draggingIndex, overIndex);
      setDraggingIndex(overIndex);
    }
  };

  const onDropHandler = (event, index) => {
    swap(draggingIndex, overIndex);
  };

  const swap = (fromIndex, toIndex) => {
    const arrTemp = [...arr];
    const temp = arrTemp[fromIndex];
    arrTemp[fromIndex] = arrTemp[toIndex];
    arrTemp[toIndex] = temp;
    setArr(arrTemp);
  };

  const onDragEndHandler = () => {
    setDraggingIndex(-1);
    setOverIndex(-1);
  };

  const renderItem = (data, index) => {
    return (
      <div
        className="drag_drop__dragItem"
        draggable
        onDragStart={(event) => dragStartHandler(event, index)}
        onDragEnd={onDragEndHandler}
      >
        <h1 style={{ fontSize: "5rem" }}>{data}</h1>
        <p>abc</p>
        <p>abc</p>
        <p>abc</p>
        <p>abc</p>
        <p>abc</p>
      </div>
    );
  };
  return (
    <div className="drag_drop">
      {arr.map((ele, index) => {
        let className = "drag_drop_container";
        if (index === draggingIndex) className += " container_dragging";
        else if (index === overIndex) className += " container_over";
        return (
          <div
            key={index}
            className={`drag_drop__container ${className}`}
            onDragEnter={(event) => onDragEnterHandler(event, index)}
            onDragLeave={onDragLeaveHandler}
            onDragOver={(event) => onDragOverHandler(event, index)}
            onDrop={(event) => onDropHandler(event, index)}
          >
            {renderItem(ele, index)}
          </div>
        );
      })}
      <p id="test">abcabc</p>
    </div>
  );
};

export default DragDrop;
