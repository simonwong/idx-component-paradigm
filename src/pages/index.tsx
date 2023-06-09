import { Button, Divider, Space, Spin } from 'antd'
import { ElementRef, useRef, useState } from 'react'
import NormalModal from '@/components/ModalParadigm/NormalModal'
import CallbackModal from '@/components/ModalParadigm/CallbackModal'
import FormModal from '@/components/ModalParadigm/FormModal'
import useModalSet from '@/hooks/ModalHooks/useModalSet'

const SingleUseModal = () => {
  const [loading, setLoading] = useState(false)

  const normalRef = useRef<ElementRef<typeof NormalModal>>(null)
  const callbackRef = useRef<ElementRef<typeof CallbackModal>>(null)
  const formModalRef = useRef<ElementRef<typeof FormModal>>(null)

  const pageReload = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const handleClickModalA = () => {
    normalRef.current?.open()
  }

  const handleClickModalC = () => {
    callbackRef.current?.open({
      data: {
        id: '123123',
      },
      confirmCallback: () => {
        console.log('开始刷新页面')
        pageReload()
      },
    })
  }

  const handleClickModalB = () => {
    formModalRef.current?.open({
      data: {
        name: '阿斯顿',
        company: 'asd',
      },
      confirmCallback: () => {
        console.log('开始刷新页面')
        pageReload()
      },
    })
  }

  return (
    <>
      <Spin spinning={loading}>
        <Space>
          <Button onClick={handleClickModalA}>命令式打开普通弹窗</Button>
          <Button onClick={handleClickModalC}>
            命令式打开可以回调和传入数据的弹窗
          </Button>
          <Button onClick={handleClickModalB}>命令式打开表单弹窗弹窗</Button>
        </Space>
      </Spin>

      <NormalModal ref={normalRef} />
      <CallbackModal ref={callbackRef} />
      <FormModal ref={formModalRef} />
    </>
  )
}

const ModalSet = () => {
  const [loading, setLoading] = useState(false)

  const [modalActions, modalNode] = useModalSet({
    normal: NormalModal,
    callback: CallbackModal,
    form: FormModal,
  })

  const pageReload = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const handleClickModalA = () => {
    modalActions.normal?.open()
  }

  const handleClickModalC = () => {
    modalActions.callback?.open({
      data: {
        id: '123123',
      },
      confirmCallback: () => {
        console.log('开始刷新页面')
        pageReload()
      },
    })
  }

  const handleClickModalB = () => {
    modalActions.form?.open({
      data: {
        name: '阿斯顿',
        company: 'asd',
      },
      confirmCallback: () => {
        console.log('开始刷新页面')
        pageReload()
      },
    })
  }

  return (
    <>
      <Spin spinning={loading}>
        <Space>
          <Button onClick={handleClickModalA}>命令式打开普通弹窗</Button>
          <Button onClick={handleClickModalC}>
            命令式打开可以回调和传入数据的弹窗
          </Button>
          <Button onClick={handleClickModalB}>命令式打开表单弹窗弹窗</Button>
        </Space>
      </Spin>
      {modalNode}
    </>
  )
}

const Home = () => (
  <main style={{ padding: '100px' }}>
    <Space direction="vertical" split={<Divider />}>
      <SingleUseModal />
      <ModalSet />
    </Space>
  </main>
)

export default Home
