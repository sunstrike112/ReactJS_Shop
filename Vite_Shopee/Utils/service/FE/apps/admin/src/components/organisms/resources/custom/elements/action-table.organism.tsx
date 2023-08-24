import React, { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import {
  Button,
  Menu,
  Dropdown,
  Modal,
  notification,
} from 'antd'
import { useAbility } from '@casl/react'
import { AbilityContext } from '@ss-fe-fw/utils/can'
import {
  MoreOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { OGFormResources } from '@ss-fe-fw/organisms'
import { DELETE_ITEM_MESSAGE_CONFIRM, ITEM_DELETED_SUCCESSFULLY } from '@ss-fe-fw/constants'
import baseApi from '@ss-fe-fw/api/base-api';
import PubSub from 'pubsub-js'

export interface OGActionTableProps {
  text: any;
  row: any;
  resourceName: string;
  linkToDetail?: string;
  modal?: {
    form: any,
    title: string,
    apiEndpoint: string,
    include?: any
  }
}

export function OGActionTable(props: OGActionTableProps) {
  const [modalVisible, setModalVisible] = useState(false)
  const [form, setForm] = useState(null)
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible])
  const hideModal = useCallback(() => setModalVisible(false), [setModalVisible])
  const ability = useAbility(AbilityContext);

  const onDeleteConfirm = () => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: DELETE_ITEM_MESSAGE_CONFIRM,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: deleteItem
    });
  }

  const deleteItem = async () => {
    const deleteApiEndpoint = `${props.modal.apiEndpoint}/${props?.row?.id}`
    const result = await baseApi(deleteApiEndpoint, 'DELETE', {})
    if (!result.status) {
      PubSub.publish('reload_table', null)
      notification.success({
        message: ITEM_DELETED_SUCCESSFULLY
      })
    }
  }

  const handleFinish = (success) => {
    if (success) {
      PubSub.publish('reload_table', null)
    }
  }

  const menu = (
    <Menu>
      {ability.can('update', props.resourceName) &&
        <Menu.Item>
          {!props?.modal && props?.linkToDetail &&
            <Link href={props?.linkToDetail + '/' + props?.row?.id}>
              <a>Edit</a>
            </Link>
          }
          {props?.modal &&
            <>
              <a onClick={showModal}>Edit</a>
              <Modal
                title={props.modal.title}
                visible={modalVisible}
                destroyOnClose
                onOk={() => form.submit()}
                onCancel={hideModal}
                okText="Save"
              >
                <OGFormResources
                  apiEndpoint={props.modal.apiEndpoint}
                  formType="update"
                  form={{
                    columns: 4,
                    meta: props.modal.form,
                    hideButtonControl: true,
                    include: props.modal.include,
                    handleFinish: handleFinish
                    // style: { width: '70%' }
                  }}
                  idData={props?.row?.id}
                  setForm={setForm}
                  {...props}
                />
              </Modal>
            </>
          }
        </Menu.Item>
      }
      {ability.can('delete', props.resourceName) &&
        <Menu.Item>
          <a onClick={onDeleteConfirm}>Delete</a>
        </Menu.Item>
      }
    </Menu>
  )

  return (
    <>
    {(ability.can('update', props.resourceName) || ability.can('delete', props.resourceName)) &&
      <Dropdown overlay={menu}>
        <Button type="text" icon={<MoreOutlined />}></Button>
        {/* <MoreOutlined /> */}
      </Dropdown>
    }
    </>
  )
}

export default OGActionTable
