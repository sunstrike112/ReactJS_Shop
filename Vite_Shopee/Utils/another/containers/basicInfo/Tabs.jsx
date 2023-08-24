import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';

export function ListTabCodeMaster({ listTab, defaultSelect }) {
  const [tabIndex, setTabIndex] = useState(+defaultSelect);
  const handleTabsChange = (index) => {
    setTabIndex(index);
  };
  return (
    <Tabs isLazy position='relative' variant='unstyled' index={tabIndex} onChange={handleTabsChange}>
      <TabList>
        {listTab.map((item) => (
          <Tab key={item.id} _selected={{ color: 'blue.500', fontWeight: 'bold' }} _focus={{ boxShadow: 'none' }}>
            {item.name}
          </Tab>
        ))}
      </TabList>
      <TabIndicator mt='-1.5px' height='2px' bg='blue.500' />
      <TabPanels>
        {listTab.map((item) => (
          <TabPanel key={item.id}>{item.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
