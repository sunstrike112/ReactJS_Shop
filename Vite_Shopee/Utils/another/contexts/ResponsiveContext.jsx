import { useWindowWidth } from 'dhm/hooks/useWindowWidth';
import React, { useEffect, useMemo, useState } from 'react';
import { LAYOUT, LAYOUT_1280, SUMMARY, SUMMARY_1280 } from '../utils';

const ResponsiveContext = React.createContext({
  resLayout: LAYOUT,
  resSummary: SUMMARY,
});

function ResponsiveProvider({ children }) {
  const [resLayout, setResLayout] = useState(LAYOUT);
  const [resSummary, setSummary] = useState(SUMMARY);
  // Screen
  const getWidthScreen = useWindowWidth();
  const widthScreen = useMemo(() => getWidthScreen, [getWidthScreen]);

  useEffect(() => {
    if (widthScreen < 1281) {
      // if (widthScreen < 1537) {
      setResLayout(LAYOUT_1280);
      setSummary(SUMMARY_1280);
    } else {
      setResLayout(LAYOUT);
      setSummary(SUMMARY);
    }
  }, [widthScreen]);

  const value = { widthScreen, resLayout, resSummary };
  return <ResponsiveContext.Provider value={value}>{children}</ResponsiveContext.Provider>;
}

export { ResponsiveContext, ResponsiveProvider };
