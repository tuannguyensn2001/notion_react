// lib
import PropTypes from "prop-types";

// components
import TreeNode from "../TreeNode";

import "./index.scss";

const Tree = ({ data, showIcon, onSelect, onRightClick, titleClassName }) => {
  return (
    <div>
      <div className="d-tree" style={{ width: 300 }}>
        <ul className="d-tree-container">
          {data.map((tree) => (
            <TreeNode
              node={tree}
              showIcon={showIcon}
              onSelect={onSelect}
              onRightClick={onRightClick}
              titleClassName={titleClassName}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

Tree.propTypes = {
  showIcon: PropTypes.bool,
  switcherIcon: PropTypes.element,
  onSelect: PropTypes.func,
  onRightClick: PropTypes.func,
  titleClassName: PropTypes.string,
};

Tree.defaultProps = {
  showIcon: false,
  data: [],
  onSelect: () => {},
  onRightClick: () => {},
  titleClassName: "",
};

export default Tree;
