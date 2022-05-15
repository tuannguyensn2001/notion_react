import { Input } from "antd";
import React, { useRef, useEffect } from "react";
// ? Zustance store
import useTriggerStore from "../../store/useTriggerStore";

const Tooltip = ({ children, placement, title, color, trigger, ...rest }) => {
  const childComponentRef = useRef(null);
  const _trigger = useTriggerStore((state) => state.trigger);
  const _setTriggerState = useTriggerStore((state) => state.handleTrigger);

  useEffect(() => {
    const prompTextE = document.querySelector(".promp__text");
    prompTextE.style.setProperty("--color", color);
    switch (trigger) {
      case "hover": {
        childComponentRef.current.addEventListener("mouseenter", (e) => {
          console.log("hover");
          prompTextE.classList.add("active");
        });
        childComponentRef.current.addEventListener("mouseleave", (e) => {
          prompTextE.classList.remove("active");
        });
        break;
      }
      case "click": {
        childComponentRef.current.addEventListener("click", (e) => {
          console.log("click");
          prompTextE.classList.toggle("active");
        });
        break;
      }
      case "focus": {
        const InputE = childComponentRef.current.childNodes[0];
        console.log(InputE);
        InputE.addEventListener("focus", (e) => {
          console.log("focus");
          prompTextE.classList.add("active");
        });
        InputE.addEventListener("blur", (e) => {
          prompTextE.classList.remove("active");
        });
        break;
      }
      default: {
        break;
      }
    }
    _setTriggerState("updating...");
  }, [_trigger]);
  const ChildComponent = (props) => {
    return <div ref={childComponentRef}>{children}</div>;
  };
  const PrompText = <span className={`promp__text ${placement}`}>{title}</span>;
  return (
    <>
      <div className={`tooltip__wrapper `}>
        <ChildComponent />
        {PrompText}
      </div>
    </>
  );
};
export default Tooltip;
