import React, { useState, useCallback } from 'react'
import { Button, Modal } from 'antd'
import { useAbility } from '@casl/react'
import { AbilityContext } from '@ss-fe-fw/utils/can'
import { AtomNavLinkButton } from '@ss-fe-fw/shared/ui'
import { OGFormResources } from '@ss-fe-fw/organisms'
import PubSub from 'pubsub-js'

export interface OGButtonCreateResourcesProps {
  style?: any;
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  label: string;
  link?: any;
  resourceName: string;
  modal?: {
    form: any,
    title: string,
    apiEndpoint: string
  }
}

export function OGButtonCreateResources(props: OGButtonCreateResourcesProps) {
  const [modalVisible, setModalVisible] = useState(false)
  const [form, setForm] = useState(null)
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible])
  const hideModal = useCallback(() => setModalVisible(false), [setModalVisible])
  const ability = useAbility(AbilityContext);

  const handleFinish = (success) => {
    if (success) {
      hideModal()
      PubSub.publish('reload_table', null)
    }
  }

  return (
    <>
    { !props.modal && ability.can('create', props.resourceName) &&
        <AtomNavLinkButton
          type={props.type ?? 'default'}
          link={props.link}
          label={props.label}
          style={props.style}
        />
    }
    { props.modal && ability.can('create', props.resourceName) &&
      (
        <>
          <Button type={props.type ?? 'default'} onClick={showModal} style={props.style}>
            {props.label}
          </Button>
          <Modal
            title={props.modal.title}
            visible={modalVisible}
            destroyOnClose
            onOk={() => form.submit()}
            onCancel={hideModal}
            okText="Add"
          >
            <OGFormResources
              apiEndpoint={props.modal.apiEndpoint}
              formType="create"
              form={{
                columns: 4,
                meta: props.modal.form,
                hideButtonControl: true,
                handleFinish: handleFinish
                // style: { width: '70%' }
              }}
              setForm={setForm}
              {...props}
            />
          </Modal>
        </>
      )
    }
    </>
  );
}

export default OGButtonCreateResources
