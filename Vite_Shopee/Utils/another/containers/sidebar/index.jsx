import { MemoizedSidebarContent } from 'dhm/components/Sidebar';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Sidebar({ ...rest }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState(location.pathname);

  const handleClick = (url) => {
    if (url !== currentUrl) {
      setCurrentUrl(url);
      navigate(url);
    }
  };

  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location.pathname]);

  return <MemoizedSidebarContent currentUrl={currentUrl} handleClick={handleClick} {...rest} />;
}
