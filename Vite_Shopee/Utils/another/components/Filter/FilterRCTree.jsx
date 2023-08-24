import { CircularProgress } from '@chakra-ui/react';
import { DB_LIST_DEFAULT_CHECKED, DB_LIST_FILTER, DB_LIST_FILTER_CHECKED, useIndexedDB } from 'dhm/services/indexeddb';
import { getMenuFilter } from 'dhm/store/common/action';
import { ConstantLocal, LocalStore } from 'dhm/utils/helpers/local';
import Tree from 'rc-tree';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KEY_FILTER_LV2, KEY_FIlTER_LV1 } from './config';
import { convertDataRC, getAllValuesRC, getLevel2LengthRC } from './method';

export function FilterAppRC({ checked = [], setChecked = () => {}, keyDataLocal = '', refresh = 0, recallApi = 0 }) {
  const { add, clear } = useIndexedDB(DB_LIST_FILTER);
  const { getAll } = useIndexedDB(DB_LIST_FILTER_CHECKED);
  const { add: addDefault, clear: clearDefault } = useIndexedDB(DB_LIST_DEFAULT_CHECKED);

  const dispatch = useDispatch();
  const treeRef = useRef();
  const { get, isExits, set } = LocalStore;
  const { loadingMenuFilter } = useSelector((state) => state.common);
  const [dataNode, setDataNode] = useState([]);

  const isMainFilter = keyDataLocal === ConstantLocal.FILTER_MENU;
  useEffect(() => {
    if (isMainFilter) {
      const onSuccess = (res) => {
        const dataMenu = convertDataRC(res);
        set(ConstantLocal.FILTER_LENGTH_LV2, getLevel2LengthRC(dataMenu));
        if (isMainFilter && !isExits(keyDataLocal)) {
          setChecked(getAllValuesRC(dataMenu));
        }
        clearDefault().then(() => addDefault(getAllValuesRC(dataMenu)));
        clear().then(() => add(dataMenu).then(() => setDataNode(dataMenu)));
      };
      const payload = {
        onSuccess,
      };
      dispatch(getMenuFilter(payload));
    }
  }, [recallApi]);
  useEffect(() => {
    if (!isMainFilter) {
      getAll().then((res) => {
        setDataNode(res[0]);
      });
    }
  }, [refresh]);

  useEffect(() => {
    if (isExits(keyDataLocal)) {
      setChecked(get(keyDataLocal));
    } else {
      setChecked([]);
    }
  }, []);
  const onCheck = (value) => {
    const filterData = value?.filter((item) => item.includes(KEY_FIlTER_LV1) && item.includes(KEY_FILTER_LV2));
    setChecked(filterData);
  };
  return (
    <div>
      {loadingMenuFilter ? (
        <CircularProgress isIndeterminate color='gray' size='40px' />
      ) : (
        dataNode?.length > 0 && (
          <Tree
            ref={treeRef}
            defaultExpandAll={false}
            checkedKeys={{
              checked,
            }}
            height={200}
            itemHeight={20}
            treeData={dataNode}
            onCheck={onCheck}
            checkable
            showIcon={false}
            selectable={false}
          />
        )
      )}
    </div>
  );
}
