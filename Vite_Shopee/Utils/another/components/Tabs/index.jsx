import { Box, Tab, TabList, Tabs } from '@chakra-ui/react';
import { BORDERS, COLORS, HEIGHT } from 'dhm/utils/constants/style';
import PropTypes from 'prop-types';
import React from 'react';
import { WrapperContainer } from 'dhm/components/WrapperContainer/index.jsx';
import { useNavigate } from 'react-router-dom';
import { TableAllHistory } from 'dhm/containers/codeMaster/AllHistory';
import { TableDetailed } from 'dhm/containers/codeMaster/Detailed';

function DHMTabs({ dataTab, variant, styleIndicator, ...props }) {
  const typeScreen = window.location.pathname.split('/')[3];
  // Get path url React Router
  const navigate = useNavigate();
  return (
    <Tabs
      height={HEIGHT.hTabs}
      position='relative'
      index={typeScreen === 'history' ? 0 : 1}
      variant={variant}
      onChange={(index) => {
        navigate(index === 0 ? '/master/code-master/history' : '/master/code-master/detailed');
      }}
      {...props}
    >
      <WrapperContainer
        background={COLORS.white}
        marginTop='32px'
        marginX='55px'
        border='none'
        padding='0px'
        height='130px'
        title={
          <TabList padding='0px'>
            {dataTab.map((tab, index) => (
              <Tab
                key={index}
                color={COLORS.master_primary}
                width='164px'
                height='40px'
                _selected={{
                  color: `${COLORS.white}`,
                  bg: `${COLORS.master_primary}`,
                  borderRadius: `${BORDERS.radius_2_top}`,
                }}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>
        }
      >
        {typeScreen === 'history' ? (
          <Box paddingTop='50px'>
            <TableAllHistory />
          </Box>
        ) : (
          <Box paddingTop='20px'>
            <TableDetailed />
          </Box>
        )}
      </WrapperContainer>
    </Tabs>
  );
}

DHMTabs.propTypes = {
  dataTab: PropTypes.array,
  variant: PropTypes.string,
  styleIndicator: PropTypes.object,
};

DHMTabs.defaultProps = {
  dataTab: [],
  variant: 'enclosed',
  styleIndicator: {
    mt: '-2.5px',
    height: '3.5px',
    bg: COLORS.master_primary,
    // borderRadius: '2px',
  },
};

export default DHMTabs;
