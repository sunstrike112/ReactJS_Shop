import { useState, useCallback, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function useCreatePortal(el) {
  const [portal, setPortal] = useState({
    render: () => null,
    remove: () => null,
  });

  // eslint-disable-next-line no-shadow
  const createPortal = useCallback((el) => {
    const Portal = ({ children }) => ReactDOM.createPortal(children, el);
    const remove = () => ReactDOM.unmountComponentAtNode(el);
    return { render: Portal, remove };
  }, []);

  useEffect(() => {
    if (el) portal.remove();
    const newPortal = createPortal(el);
    setPortal(newPortal);
    return () => newPortal.remove(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el]);

  return portal.render;
}
useCreatePortal.propTypes = {
  // eslint-disable-next-line no-undef
  el: PropTypes.instanceOf(Element),
};

export { useCreatePortal };
