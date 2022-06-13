import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import Tree from "../Tree";

const TreeNode = (props) => {
  const {
    node,
    showIcon,
    onSelect,
    onRightClick,
    titleClassName,
    setVisibleModal,
  } = props;

  const [childVisible, setChildVisiblity] = useState(false);
  const [createChildNode, setCreateChildNode] = useState(false);

  const hasChild = node.children ? true : false;

  const refNode = useRef();

  const renderIcon = () => {
    if (showIcon) {
      if (node.icon) return <span className="d-tree-toggler">{node.icon}</span>;

      return <FontAwesomeIcon icon="folder" className="d-tree-icon" />;
    }

    if (node.icon) {
      return <span className="d-tree-toggler">{node.icon}</span>;
    }

    return null;
  };

  const handleCreateNode = () => {
    setChildVisiblity(true);
    setCreateChildNode(true);
    setVisibleModal(true);
  };

  const renderMotion = () => {
    return (
      <div className="holoziza tw-items-center">
        <div className="tw-float-right tw-flex">
          <FontAwesomeIcon
            icon="ellipsis"
            className="tw-mr-1"
            style={{ border: "1px solid black" }}
          />
          <FontAwesomeIcon
            icon="plus"
            style={{ border: "1px solid black" }}
            onClick={handleCreateNode}
          />
        </div>
      </div>
    );
  };

  const handleToggleIcon = () => {
    setChildVisiblity((v) => !v);
    onSelect(node.key, {
      selected: true,
      event: "select",
      selectedNode: node,
    });
  };

  useEffect(() => {
    const refNodeCopy = refNode.current;
    refNode.current.addEventListener("contextmenu", onRightClick);

    return () => {
      refNodeCopy.removeEventListener("contextmenu", onRightClick);
    };
  }, [refNode, onRightClick]);

  const renderItem = () => {
    return (
      <div
        className="tw-flex tw-items-center d-tree-node-children"
        ref={refNode}
      >
        <div className="tw-flex tw-min-w-0 tw-flex-auto">
          <div
            className={`tw-inline d-tree-toggler`}
            onClick={handleToggleIcon}
          >
            <FontAwesomeIcon
              icon="caret-right"
              className={clsx({
                active: childVisible,
              })}
            />
          </div>
          {renderIcon()}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minWidth: 0,
              }}
              className={clsx({
                [titleClassName]: true,
              })}
            >
              {node.label}
            </div>
          </div>
        </div>

        {renderMotion()}
      </div>
    );
  };

  return (
    <>
      <li className="d-tree-node">
        {renderItem()}

        {hasChild && childVisible && (
          <div className="d-tree-content">
            <ul className="d-tree-container">
              <Tree {...props} data={node.children} />
            </ul>
          </div>
        )}

        {!hasChild && childVisible && !createChildNode && (
          <div style={{ fontSize: "0.9rem" }}>No page inside</div>
        )}
      </li>
    </>
  );
};

export default TreeNode;
