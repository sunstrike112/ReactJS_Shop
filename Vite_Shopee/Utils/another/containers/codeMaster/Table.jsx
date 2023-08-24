import DHMTabs from 'dhm/components/Tabs';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { useContext } from 'react';

export function TableCodeMaster() {
  const { tTabs } = useContext(LanguageContext);
  const tabData = [
    {
      label: tTabs('all_display'),
    },
    {
      label: tTabs('detailed_display'),
    },
  ];

  return <DHMTabs dataTab={tabData} />;
}
