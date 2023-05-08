/**
 * 基础弹窗 props
 */
export interface ModalProps {
  visible?: boolean
  onCancel?: () => void
  onOpen?: (...props: any) => void
  onOk?: () => Promise<void> | void
}

/**
 * 基础弹窗 actions
 */
export interface ModalActions {
  /** 打开弹窗 */
  open: (...props: any) => void
  /** 关闭弹窗 */
  close: () => void
  /** 开始确定按钮 loading */
  startLoading: () => void
  /** 结束确定按钮 loading */
  endLoading: () => void
}

/**
 * 回调弹窗 props
 */
export interface ModalCallbackProps<DA = any> extends ModalProps {
  /** 打开弹窗 */
  onOpen?: (da?: DA) => void
}

/**
 * 回调弹窗 actions
 */
export interface ModalCallbackActions<DA = any> extends ModalActions {
  /** 打开弹窗 */
  open: (da?: DA) => void
}

/**
 * 表单弹窗 props
 */
export interface ModalFormProps<FD = any, DA = any>
  extends ModalCallbackProps<DA> {
  /** 表单提交 */
  onSubmit?: (formData: FD) => Promise<void> | void
}

/**
 * 表单弹窗 actions
 */
export interface ModalFormActions<DA = any> extends ModalCallbackActions<DA> {}
