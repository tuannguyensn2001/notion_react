import { createContext, useMemo, useEffect, useContext, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const PORTAL_CLASSNAME = "notion-portal";

const Context = createContext();

const ContainerPortal = (props) => {
  const { children, containerRef, appendToParentPortal } = props;

  const containerEl = containerRef.current;

  const portal = useMemo(() => {
    const node = containerEl?.ownerDocument.createElement("div");
    if (node) node.className = PORTAL_CLASSNAME;
    return node;
  }, [containerEl]);

  useEffect(() => {
    if (!portal && !containerEl) return;
    containerEl.appendChild(portal);
    return () => containerEl.removeChild(portal);
  }, [containerEl, portal]);

  if (portal) {
    return createPortal(
      <Context.Provider value={appendToParentPortal ? portal : null}>
        {children}
      </Context.Provider>,
      portal
    );
  }
};

const DefaultPortal = (props) => {
  const { children, appendToParentPortal } = props;

  const portalParentContext = useContext(Context);

  const host = appendToParentPortal
    ? portalParentContext ?? document.body
    : document.body;

  const portal = useMemo(() => {
    const node = document.createElement("div");
    node.className = PORTAL_CLASSNAME;

    return node;
  }, []);

  useEffect(() => {
    if (!portal && !host) return;
    host.appendChild(portal);

    return () => {
      host.removeChild(portal);
    };
  }, [portal, host]);

  return createPortal(
    <Context.Provider value={portal}>{children}</Context.Provider>,
    portal
  );
};

export default function Portal(props) {
  const { containerRef, ...rest } = props;
  const [refNodeContainer, setRefNodeContainer] = useState(null);

  useEffect(() => {
    setRefNodeContainer(containerRef);
  }, [containerRef]);
  return refNodeContainer ? (
    <ContainerPortal containerRef={refNodeContainer} {...rest} />
  ) : (
    <DefaultPortal {...rest} />
  );
}

Portal.propTypes = {
  appendToParentPortal: PropTypes.bool,
  containerRef: PropTypes.object,
};

Portal.defaultProps = {
  appendToParentPortal: true,
  containerRef: null,
};
