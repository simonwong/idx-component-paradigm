import React, { useMemo } from 'react';
import type { ModalCallbackActions, ModalCallbackProps } from './types';
import type { SaveData } from '../useDataActionSave';
import { useDataActionSave } from '../useDataActionSave';
import { useModalProps } from './useModalProps';

/**
 * 弹窗控制 hook
 * open 时可以传入回调函数，并返回
 */
export const useModalCallbackProps = <DA extends SaveData = SaveData>(
  props: ModalCallbackProps<DA>,
  ref?: React.Ref<ModalCallbackActions<DA>>
) => {
  const [dataAction, saveDataAction, clearDataAction] = useDataActionSave<DA>();
  const { modalProps, actions } = useModalProps(props, ref);

  const modalCallbackActions: ModalCallbackActions<DA> = useMemo(
    () => ({
      ...actions,
      open: (da) => {
        saveDataAction(da);
        actions.open(da);
      },
      close: () => {
        clearDataAction();
        actions.close();
      },
    }),
    [actions, saveDataAction, clearDataAction]
  );

  React.useImperativeHandle(ref, () => modalCallbackActions, [
    modalCallbackActions,
  ]);

  return {
    modalProps,
    actions: modalCallbackActions,
    dataAction,
  };
};
