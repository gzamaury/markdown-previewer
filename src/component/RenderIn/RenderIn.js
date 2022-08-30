import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function RenderIn({ elementId, children }) {
  const [node, setNode] = useState();
  useEffect(() => {
    setNode(document.getElementById(elementId));
  }, [elementId]);

  return node && ReactDOM.createPortal(children, node);
}

RenderIn.propTypes = {
  elementId: PropTypes.string.isRequired,
};

export default RenderIn;
