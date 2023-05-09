import type { ElementRef, JSXElementConstructor } from 'react'
import React, { useRef, Fragment } from 'react'

type ModalComponent = JSXElementConstructor<any>

type ModalComplexComponent = {
  component: ModalComponent
  props?: Record<string, any>
}

type ModalSet = Readonly<Record<string, ModalComplexComponent | ModalComponent>>

type ModalKeys<T> = keyof T

type ModelRefSet<T> = {
  [K in ModalKeys<T>]:
    | (T[K] extends ModalComponent ? ElementRef<T[K]> : never)
    | null
}

/**
 * 判断是否是 { component, props } 这种形式的值
 */
const isComplexComponent = (item: any): item is ModalComplexComponent =>
  item && !!item.component

/**
 * 将对象值都转为 null
 */
const transObjValueToNull = <T extends Record<string, unknown>>(obj: T) =>
  Object.keys(obj).reduce((preObj, curKey: keyof T) => {
    preObj[curKey] = null
    return preObj
  }, {} as Record<keyof T, null>)

/**
 * 弹窗集合
 */
const useModalSet = <T extends ModalSet>(modalSet: T) => {
  const modalSetRef = useRef<ModelRefSet<T>>(transObjValueToNull(modalSet))

  const modalNodes = React.createElement(
    Fragment,
    {},
    Object.keys(modalSet).map((key: ModalKeys<T>) => {
      const item = modalSet[key]

      let component: ModalComponent
      let props: Record<string, unknown> = {}

      if (isComplexComponent(item)) {
        component = item.component
        props = item.props || {}
      } else {
        component = item
      }

      Object.assign(props, {
        ref: (r: any) => {
          modalSetRef.current[key] = r
        },
        key,
      })

      return React.createElement(component, props)
    }),
  )

  return [modalSetRef.current, modalNodes] as const
}

export default useModalSet
