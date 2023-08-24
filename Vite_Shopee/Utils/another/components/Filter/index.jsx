import { Box, CircularProgress } from '@chakra-ui/react';
import { getMenuFilter } from 'dhm/store/common/action';
import { ConstantLocal, LocalStore } from 'dhm/utils/helpers/local';
import { useEffect, useMemo, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { useDispatch, useSelector } from 'react-redux';
import { convertData, getAllValues, getLevel2Length, renderNewListData } from './method';

export function FilterApp({ checked = [], setChecked = () => {}, keyDataLocal = '' }) {
  const [expanded, setExpanded] = useState([]);
  const dispatch = useDispatch();
  const { get, isExits, set } = LocalStore;
  const { menuFilter, loadingMenuFilter } = useSelector((state) => state.common);
  const dataNode = useMemo(() => {
    set(ConstantLocal.FILTER_LENGTH_LV2, getLevel2Length(convertData(menuFilter)));

    return convertData(menuFilter);
  }, [menuFilter]);
  // const [filterText, setFilterText] = useState('');
  // const [filteredNodes, setFilteredNodes] = useState(nodes);

  // const filterNodes = (filtered, node) => {
  //   const children = (node.children || []).reduce(filterNodes, []);

  //   if (node.label.toLowerCase().includes(filterText.toLowerCase()) || children.length) {
  //     filtered.push({ ...node, children });
  //   }

  //   return filtered;
  // };

  // const filterTree = (text) => {
  //   if (!text) {
  //     setFilteredNodes(nodes);
  //     return;
  //   }

  //   const filtered = nodes.reduce(filterNodes, []);
  //   setFilteredNodes(filtered);
  // };

  // const onFilterChange = (e) => {
  //   const text = e.target.value;
  //   setFilterText(text);
  //   filterTree(text);
  // };
  useEffect(() => {
    if (keyDataLocal === ConstantLocal.FILTER_MENU) {
      dispatch(getMenuFilter());
    }
    if (isExits(keyDataLocal)) {
      setChecked(get(keyDataLocal));
    } else {
      setChecked([]);
      keyDataLocal === ConstantLocal.FILTER_MENU && setChecked(getAllValues(dataNode));
    }
  }, []);
  const onCheck = (value) => {
    setChecked(value);
  };

  const onExpand = (value) => {
    setExpanded(value);
  };

  return (
    <Box>
      {/* <Input mb='5px' placeholder='Search...' type='text' value={filterText} onChange={onFilterChange} /> */}
      <Box height='400px' overflowY='auto' paddingTop='2px'>
        {loadingMenuFilter ? (
          <CircularProgress isIndeterminate color='gray' size='40px' />
        ) : (
          <CheckboxTree
            checked={checked}
            expanded={expanded}
            nodes={
              keyDataLocal === ConstantLocal.FILTER_MENU
                ? dataNode
                : renderNewListData(dataNode, get(ConstantLocal.FILTER_MENU))
            }
            onCheck={onCheck}
            onExpand={onExpand}
            icons={{
              check: <i className='fa-regular fa-square-check filter_checked-icons' />,
              uncheck: <i className='fa-regular fa-square filter_checked-icons' />,
              halfCheck: <i className='fa-solid fa-square-minus filter_checked-icons' />,
              expandClose: (
                <i className='fa-regular fa-square-plus filter_checked-icons filter_checked-icons--expand' />
              ),
              expandOpen: (
                <i className='fa-regular fa-square-minus filter_checked-icons filter_checked-icons--expand' />
              ),
              // expandAll: <span className='filter_checked-icons' />,
              // collapseAll: <span className='filter_checked-icons' />,
              parentClose: null,
              parentOpen: null,
              leaf: null,
            }}
          />
        )}
      </Box>
    </Box>
  );
}
export * from './method';
