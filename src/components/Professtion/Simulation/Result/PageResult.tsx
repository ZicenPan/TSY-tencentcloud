import React, { FC, Fragment, memo, useState } from 'react'
import ReactModal from 'react-modal'
import '@/scss/style.scss'

interface Props {
    checked: boolean
    handleNext: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    resultMsg: any

}

export const PageResult: FC<Props> = memo(function PageResult({ checked, handleNext, resultMsg}) {
    const [showStandard, setShowStandard] = useState(false)
    const [showModal, setShowModal] = useState(false)

    function handleOpenModal() {
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
    }

    function getModelContent() {
        let content:string
        if (showStandard&&checked) 
            content = resultMsg.standardMsg?resultMsg.standardMsg:""
        else if (checked) 
            content = resultMsg.correctMsg?resultMsg.correctMsg:"回答正确"
        else 
            content = resultMsg.errorMsg?resultMsg.errorMsg:"回答错误"

        return (
            <div>
                {' '}
                {content}
            </div>
        )
    }

    function handleStandard() {
        if (!checked)
            handleCloseModal()
        else {
            setShowStandard(true)
            handleOpenModal()
        }
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
                onRequestClose={showStandard ? handleNext : handleStandard}
                className="Modal centered"
                overlayClassName="Overlay"
            >
                {getModelContent()}
            </ReactModal>
        </div>
    )
})
