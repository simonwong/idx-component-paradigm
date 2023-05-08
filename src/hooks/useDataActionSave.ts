import { useRef, useCallback } from 'react'

export type SaveData = Readonly<Record<string, any | Function>>

/**
 * 数据和方法存到 ref
 *
 * 当在 save 到 clear 过程中，数据和方法不会改变时，非常有用
 */
export const useDataActionSave = <T = SaveData>() => {
  const dataRef = useRef<T>()

  const saveDataAction = useCallback((data?: T) => {
    dataRef.current = data
  }, [])

  const clearDataAction = useCallback(() => {
    dataRef.current = undefined
  }, [])

  return [dataRef.current, saveDataAction, clearDataAction] as const
}
