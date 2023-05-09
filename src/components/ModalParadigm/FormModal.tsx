import { Input, Form, Modal } from 'antd'
import * as React from 'react'
import type { ModalFormActions, ModalFormProps } from '@/hooks/ModalHooks/types'
import { useModalFormProps } from '@/hooks/ModalHooks/useModalFormProps'

type FormData = {
  name: string
  company?: string
}

type CallbackData = {
  data: FormData
  confirmCallback: () => void
}

const FormModal = React.forwardRef<
  ModalFormActions<CallbackData>,
  ModalFormProps<FormData, CallbackData>
>((props, ref) => {
  const { form, modalProps, dataAction } = useModalFormProps<
    FormData,
    CallbackData
  >(
    {
      ...props,
      onSubmit: async formData => {
        console.log('formData', formData)
        await fetch('/api/fake')
        dataAction?.confirmCallback()
      },
      onOpen: da => {
        console.log('da', da)
        if (da?.data) {
          form.setFieldsValue(da?.data)
        }
      },
    },
    ref,
  )

  return (
    <Modal title="表单弹窗" {...modalProps}>
      <Form form={form}>
        <Form.Item
          label="姓名"
          name="name"
          rules={[
            {
              required: true,
              message: '必须',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="公司" name="company">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default FormModal
