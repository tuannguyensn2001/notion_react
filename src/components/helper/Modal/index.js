import { useRef } from "react";
import { Portal } from "~/components/helper";

import PropTypes from "prop-types";
import clsx from "clsx";

import "./index.scss";

function Modal({
  visible,
  children,
  title,
  width,
  closable,
  footer,
  onCancel,
  isCentered,
  style,
}) {
  const refContainer = useRef();

  if (!visible) {
    return null;
  }

  const handleClose = () => {
    onCancel();
  };

  return (
    <Portal>
      <div id="notion-modal-container" ref={refContainer}>
        <div className="overlay" onClick={handleClose}></div>
        <div
          className={clsx({
            "notion-modal-content": true,
            "notion-modal-center": isCentered,
          })}
          style={{ width: width, border: "1px solid black", ...style }}
        >
          <div className="notion-modal-header">
            <div>{title}</div>
            {!closable && (
              <div onClick={handleClose} className="tw-cursor-pointer tw-p-1">
                X
              </div>
            )}
          </div>
          <div className="notion-modal-body">{children}</div>
          {footer && <div className="notion-modal-footer">{footer}</div>}
        </div>
      </div>
    </Portal>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.element,
  closable: PropTypes.bool,
  footer: PropTypes.array,
  isCentered: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.element.isRequired,
};

Modal.defaultProps = {
  visible: false,
  title: null,
  closable: false,
  footer: null,
  isCentered: false,
  style: {},
};

export default Modal;
