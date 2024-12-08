import { useState } from "react";
import { data } from "./Data";

export const TransferList = () => {
  const [leftContainerItems, setLeftContaineritems] = useState(data);
  const [rightContainerItems, setRightContaineritems] = useState([]);

  const checkItems = (list, id) => {
    const copyItems = list.map((item) => {
      if (item.id == id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    return copyItems;
  };

  const handleSelectedItems = (e, containerType) => {
    if (containerType === "left") {
      const copyLeftItems = checkItems(leftContainerItems, e.target.id);
      setLeftContaineritems(copyLeftItems);
    } else {
      const copyRightItems = checkItems(rightContainerItems, e.target.id);
      setRightContaineritems(copyRightItems);
    }
  };

  const uncheckItems = (list) => {
    const copyItems = list.map((item) => {
      return { ...item, checked: false };
    });
    return copyItems;
  };

  const handleTransfer = (type) => {
    if (type === "left") {
      const checkedLeft = leftContainerItems.filter((item) => item.checked);
      const unCheckedLeft = leftContainerItems.filter((item) => !item.checked);
      let copyUncheckItems = uncheckItems(checkedLeft);
      setRightContaineritems([...copyUncheckItems, ...rightContainerItems]);
      setLeftContaineritems(unCheckedLeft);
    } else {
      const checkedRight = rightContainerItems.filter((item) => item.checked);
      const unCheckedRight = rightContainerItems.filter(
        (item) => !item.checked
      );
      let copyUncheckItems = uncheckItems(checkedRight);
      setLeftContaineritems([...copyUncheckItems, ...leftContainerItems]);
      setRightContaineritems(unCheckedRight);
    }
  };

  return (
    <div className="transferList">
      <div
        className="leftContainer"
        onClick={(e) => handleSelectedItems(e, "left")}
      >
        {leftContainerItems.map((item) => {
          return (
            <button
              key={item.id}
              id={item.id}
              className={item.checked ? "selectedContBtn" : "containerButtons"}
            >
              {item.value}
            </button>
          );
        })}
      </div>
      <div className="transferButtonsWrapper">
        <button
          className="transferButton"
          onClick={() => handleTransfer("left")}
        >
          Left
        </button>
        <button
          className="transferButton"
          onClick={() => handleTransfer("right")}
        >
          Right
        </button>
      </div>
      <div
        className="rightContainer"
        onClick={(e) => handleSelectedItems(e, "right")}
      >
        {rightContainerItems.map((item) => {
          return (
            <button
              key={item.id}
              id={item.id}
              className={item.checked ? "selectedContBtn" : "containerButtons"}
            >
              {item.value}
            </button>
          );
        })}
      </div>
    </div>
  );
};
