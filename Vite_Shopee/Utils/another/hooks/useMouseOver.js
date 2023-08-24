import { useEffect, useRef, useState } from 'react';

function useMouseOver() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      if (node) {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, []);

  return [ref, isMouseOver];
}
function useMouseOverRef(ref) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (ref && ref.current) {
      const node = ref.current;
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref]);

  return isMouseOver;
}

export { useMouseOver, useMouseOverRef };
