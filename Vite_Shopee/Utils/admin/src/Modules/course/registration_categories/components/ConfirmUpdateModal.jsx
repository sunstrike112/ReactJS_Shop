/* eslint-disable react/prop-types */
import React from 'react'
import ModalComponent from 'Components/modal'

const ConfirmUpdateModal = ({ isVisible, setIsVisble, onSubmit, title }) => (
  <ModalComponent
    visible={isVisible}
    onCancel={() => setIsVisble(false)}
    onSubmit={onSubmit}
    title={title}
  />
)

export default ConfirmUpdateModal
