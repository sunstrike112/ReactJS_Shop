/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import { Col } from 'antd'
import { FormInput, FormLabel, FormSelect, Modal } from 'Components'
import { isEmpty } from 'lodash'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { Divider, Right } from 'Themes/facit'
import { ModalCategory, Row } from '../styled'

const CreateCategoryModal = ({ form, t, defaultDropdown, onChangeDropdown, options, onCancel, resetEditForm, visible, onSubmit, errors, isEditing, isWebviewMode }) => {
  return (
    <FormProvider {...form}>
      {isWebviewMode
        ? (
          <ModalCategory
            visible={visible}
            onClose={onCancel}
            onCancel={resetEditForm}
            onSubmit={onSubmit}
            confirm
            confirmTitle={isEditing ? t('confirm_update') : t('confirm_create')}
            onSubmitText={isEditing ? t('common:edit_options.change') : t('common:create.register')}
            onCancelText={isEditing ? t('common:edit_options.restore') : t('common:edit_options.clear')}
            cancel={!isWebviewMode}
            title={isEditing ? t('eidt_course_category') : t('register_course_category')}
            disabledSubmit={!isEmpty(errors)}
          >
            <>
              <Row gutter={24}>
                <Col span={24}>
                  <FormLabel
                    title={t('parent_course_category_name')}
                    description="Optional"
                    width={100}
                  />
                </Col>
                <Col span={24}>
                  <FormSelect
                    t={t}
                    name="courseParentId"
                    optionNotTrans={options}
                    defaultValue={defaultDropdown}
                    onChange={onChangeDropdown}
                    heightdropdown={100}
                    placeholder={t('select_parent_cateogry')}
                  />
                </Col>
                <Divider />
                <Col span={24}>
                  <FormLabel
                    title={t('course_category_name')}
                    description="Required"
                    width={100}
                  />
                </Col>
                <Col span={24}>
                  <FormInput name="courseCategoryName" />
                </Col>
              </Row>
            </>
          </ModalCategory>
        )
        : (
          <Modal
            visible={visible}
            onClose={onCancel}
            onCancel={resetEditForm}
            onSubmit={onSubmit}
            confirm
            confirmTitle={isEditing ? t('confirm_update') : t('confirm_create')}
            onSubmitText={isEditing ? t('common:edit_options.change') : t('common:create.register')}
            onCancelText={isEditing ? t('common:edit_options.restore') : t('common:edit_options.clear')}
            title={isEditing ? t('eidt_course_category') : t('register_course_category')}
            disabledSubmit={!isEmpty(errors)}
          >
            <Row>
              <FormLabel title={t('parent_course_category_name')} description="Optional" />
              <Right>
                <FormSelect
                  t={t}
                  name="courseParentId"
                  optionNotTrans={options}
                  defaultValue={defaultDropdown}
                  onChange={onChangeDropdown}
                  heightdropdown={100}
                  placeholder={t('select_parent_cateogry')}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('course_category_name')} description="Required" />
              <Right>
                <FormInput name="courseCategoryName" />
              </Right>
            </Row>
          </Modal>
        )}
    </FormProvider>
  )
}

export default CreateCategoryModal
