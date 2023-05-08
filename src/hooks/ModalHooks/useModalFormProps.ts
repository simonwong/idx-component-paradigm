import { Form } from 'antd'
import { Ref, useImperativeHandle, useMemo } from 'react'
import type { ModalFormProps, ModalFormActions } from './types'
import { useModalCallbackProps } from './useModalCallbackProps'
import type { SaveData } from '../useDataActionSave'

/**
 * 表单弹窗使用 hook
 * 暴露 form 实例
 * 封装了表单提交的部分逻辑，也允许外部覆盖这个 onOk 方法
 */
export const useModalFormProps = <FD = any, DA extends SaveData = SaveData>(
  props: ModalFormProps<FD, DA>,
  ref?: Ref<ModalFormActions<DA>>,
) => {
  const { modalProps, actions, dataAction } = useModalCallbackProps<DA>(
    props,
    ref,
  )
  const [form] = Form.useForm<FD>()

  const modalFormActions: ModalFormActions<DA> = useMemo(
    () => ({
      ...actions,
      close: () => {
        form.resetFields()
        actions.close()
      },
    }),
    [form, actions],
  )

  useImperativeHandle(ref, () => modalFormActions, [modalFormActions])

  const modalFormProps = {
    ...modalProps,
    onOk: async () => {
      try {
        const formData = await form.validateFields()
        modalFormActions.startLoading()
        await props.onSubmit?.(formData)
        modalFormActions.close()
      } catch (e) {
        console.error(e)
      } finally {
        modalFormActions.endLoading()
      }
    },
    onCancel: modalFormActions.close,
  }

  return {
    form,
    modalProps: modalFormProps,
    actions: modalFormActions,
    dataAction,
  }
}
