import { useCallback, useState } from 'react'

/**
 * 判断弹窗是否是受控组件
 */
const isControlledModal = (visible?: boolean): visible is boolean =>
  typeof visible === 'boolean'

/**
 * visible 控制 hook
 * 允许是受控，也可以是非受控。
 */
export const useModalVisible = (visible?: boolean) => {
  const [innerVisible, setInnerVisible] = useState(false)

  const setVisible = useCallback(
    (vs: boolean) => {
      if (!isControlledModal(visible)) {
        setInnerVisible(vs)
      }
    },
    [visible],
  )

  return [visible ?? innerVisible, setVisible] as const
}
