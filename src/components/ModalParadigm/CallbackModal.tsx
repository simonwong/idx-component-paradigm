import * as React from 'react';
import { Modal } from 'antd';
import type {
  ModalCallbackActions,
  ModalCallbackProps,
} from '@/hooks/ModalHooks/types';
import { useModalCallbackProps } from '@/hooks/ModalHooks/useModalCallbackProps';

type CallbackData = {
  data: {
    id: string;
  };
  confirmCallback: () => void;
};

const NormalModal = React.forwardRef<
  ModalCallbackActions<CallbackData>,
  ModalCallbackProps<CallbackData>
>((props, ref) => {
  const { modalProps, dataAction } = useModalCallbackProps<CallbackData>(
    {
      ...props,
      onOk: async () => {
        await fetch('/api/fake', {
          method: 'post',
          body: JSON.stringify({ id: dataAction?.data.id }),
        });
        dataAction?.confirmCallback();
      },
      onOpen: (da) => {
        console.log('弹窗被打开了', da);
      },
    },
    ref
  );

  return (
    <Modal title="具有回调功能的弹窗" {...modalProps}>
      弹窗内容： id 是 {dataAction?.data.id}
    </Modal>
  );
});

export default NormalModal;
