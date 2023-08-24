import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DISCARD_CHANGES_MESSAGE_CONFIRM } from '@ss-fe-fw/constants';
import { Modal } from 'antd';



export const DiscardChangeModal = (onOk, onCancel) => {
    Modal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content: DISCARD_CHANGES_MESSAGE_CONFIRM,
        onOk() {
            onOk()
        },
        onCancel() {
            onCancel()
        },
    });
}
