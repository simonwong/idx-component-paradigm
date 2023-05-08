import * as React from 'react';
import { Modal } from 'antd';
import type { ModalActions, ModalProps } from '@/hooks/ModalHooks/types';
import { useModalProps } from '@/hooks/ModalHooks/useModalProps';

const NormalModal = React.forwardRef<ModalActions, ModalProps>((props, ref) => {
  const { modalProps } = useModalProps(
    {
      ...props,
      onOpen: () => {
        console.log('弹窗被打开了');
      },
      onOk: async () => {
        await fetch('/api/fake', {
          method: 'post',
        });
      },
    },
    ref
  );

  return (
    <Modal title="普通弹窗" {...modalProps}>
      弹窗内容
    </Modal>
  );
});

export default NormalModal;
