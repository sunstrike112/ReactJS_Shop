/* eslint-disable react/no-array-index-key */
import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  List,
  ListItem,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { AppContext } from 'dhm/contexts/AppContext';
import { ResponsiveContext } from 'dhm/contexts/ResponsiveContext';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

export function NavItem({ item, currentUrl, onClick }) {
  const { resLayout } = useContext(ResponsiveContext);
  const [isOpen, setIsOpen] = useState(false);
  const { isShowSidebar } = useContext(AppContext);
  const isCurrent = useMemo(() => currentUrl === item.url, [currentUrl, item.url]);
  const textColor = isCurrent ? COLORS.waring_400 : COLORS.white;

  const handleItemClick = () => {
    if (item.subMenu) {
      setIsOpen(!isOpen);
    } else {
      onClick(item.url);
    }
  };

  useEffect(() => {
    if (item.subMenu) {
      const isCurrentSubItem = item.subMenu.some((subItem) => subItem.url === currentUrl);
      setIsOpen(isCurrentSubItem);
    }
  }, [currentUrl]);

  return (
    <>
      <ListItem
        onClick={handleItemClick}
        py={resLayout.pyListItem}
        px={resLayout.pxListItem}
        borderRadius={BORDERS.radius_1}
        margin={resLayout.mrNavItem}
        width='90%'
        bg={isCurrent ? COLORS.prime_shade_1 : ''}
        fontSize={resLayout.fsList}
        _hover={{ bg: COLORS.prime_shade_1 }}
        cursor={item.subMenu ? 'pointer' : 'default'}
      >
        <Flex alignItems='center' paddingLeft={isShowSidebar ? '0' : `${resLayout.plIcon}`}>
          {item.icon && (
            <Icon
              as={item.icon}
              fontSize={isShowSidebar ? 'xl' : '3xl'}
              color={textColor}
              mr={resLayout.mrIcon}
              transition='0.2s ease'
            />
          )}
          <Box
            style={{
              display: isShowSidebar ? 'block' : 'none',
            }}
          >
            <Text color={textColor} fontWeight='medium'>
              {item.name}
            </Text>
          </Box>
          {item.subMenu &&
            (isShowSidebar ? (
              <Icon as={isOpen ? FiChevronDown : FiChevronRight} ml='auto' color={textColor} transition='0.2s ease' />
            ) : (
              <Popover placement='right'>
                <PopoverTrigger>
                  <Button
                    position='absolute'
                    width='100%'
                    right='0'
                    background='transparent'
                    _hover={{
                      background: 'none',
                    }}
                  >
                    <Icon as={FiChevronRight} ml='auto' color={textColor} transition='0.2s ease' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent width='190px' background={COLORS.prime_shade_8} padding='5px' marginLeft='-5px'>
                  <PopoverCloseButton />
                  {item.subMenu.map((subItem, index) => (
                    <Box
                      key={index}
                      onClick={() => onClick(subItem.url)}
                      cursor='pointer'
                      padding='10px'
                      _hover={{ bg: COLORS.prime_shade_1, color: COLORS.white }}
                      borderRadius={BORDERS.radius_1}
                    >
                      <Text fontWeight='medium'>{subItem.name}</Text>
                    </Box>
                  ))}
                </PopoverContent>
              </Popover>
            ))}
        </Flex>
      </ListItem>
      {item.subMenu && isShowSidebar ? (
        <Collapse in={isOpen} animateOpacity>
          <List mt='2px' ml='6' spacing={1}>
            {item.subMenu.map((subItem, index) => (
              <NavItem key={index} item={subItem} currentUrl={currentUrl} onClick={onClick} />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
}
