import React, { FC, Fragment, memo, useState } from 'react'
import ReactModal from 'react-modal'
import '@/scss/style.scss'

interface Props {
    checked: boolean
    handleNext: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const PageResult: FC<Props> = memo(function PageResult({ checked, handleNext }) {
    const [showModal, setShowModal] = useState(false)

    function handleOpenModal() {
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    function getModelContent() {
        return (
            <div>
                {' '}
                {checked
                    ? '恭喜，你已经成功明确分析目标啦！'
                    : '很遗憾，你的答案不正确哦。不要气馁，再试一次吧！'}
            </div>
        )
    }

    return (
        <div>
            <button
                onClick={handleOpenModal}
                type="submit"
                className="btn btn-blue"
                style={{ position: 'fixed', top: '85%', left: '70%' }}
            >
                Next
            </button>
            <ReactModal
                isOpen={showModal}
                contentLabel="onRequestClose Example"
                onRequestClose={checked ? handleNext : handleCloseModal}
                className="Modal centered"
                overlayClassName="Overlay"
            >
                {getModelContent()}
            </ReactModal>
        </div>
    )
})
