import React, { useMemo, useState } from 'react'
import type { ModalActions, ModalProps } from './types'
import { useModalVisible } from './useModalVisible'

/**
 * 弹窗控制 hook
 * 允许是受控，也可以是非受控。
 * 基础的 hook，所以将更多的控制部分交给外部，而不是在内部封装
 */
export const useModalProps = (
  { visible, onCancel, onOpen, onOk }: ModalProps,
  ref?: React.Ref<ModalActions>,
) => {
  const [modalVisible, setVisible] = useModalVisible(visible)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const actions: ModalActions = useMemo(
    () => ({
      open: (...props) => {
        setVisible(true)
        onOpen?.(...props)
      },
      close: () => {
        setVisible(false)
        onCancel?.()
      },
      startLoading: () => {
        setConfirmLoading(true)
      },
      endLoading: () => {
        setConfirmLoading(false)
      },
    }),
    [onCancel, onOpen, setVisible],
  )

  React.useImperativeHandle(ref, () => actions, [actions])

  const modalProps = {
    visible: modalVisible,
    confirmLoading,
    onCancel: actions.close,
    onOk: onOk
      ? async () => {
          actions.startLoading()
          try {
            await onOk?.()
            actions.close()
          } finally {
            actions.endLoading()
          }
        }
      : undefined,
  }

  return {
    modalProps,
    actions,
  }
}
