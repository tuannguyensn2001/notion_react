import React, { useEffect } from "react";
const ToolTip = ({ children, title, placement, color , ...rest }) => {
  const RelativeComponent = (_props) => {
    // ? Function này return về child props truyền vào Tooltip component
    return children;
  };
  const trunc = (str, limitNum) => {
    // ? Hàm cắt chuỗi thành chuỗi ngắn hơn
    return str.length > limitNum ? str.slice(0, limitNum) + "..." : str;
  };
  useEffect ( () => {
    const prompTextE = document.querySelector('.promp__text')
    // ? Set thuộc tính color vào prop của thẻ để nhận được prop bên scss thông qua biến
    prompTextE.style.setProperty('--color-code--',color)
  } , [])
  return (
    <>
      <style></style>
      <div className={`relative__wrapper ${placement}`}>
        <RelativeComponent className="relative__component" {...rest} />
        <span className="promp__text">
          {trunc(title, 15)}
        </span>
      </div>
    </>
  );
};
export default ToolTip;
