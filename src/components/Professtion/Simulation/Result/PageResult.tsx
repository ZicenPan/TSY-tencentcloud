import React, { FC, Fragment, memo, useState } from 'react'
import ReactModal from 'react-modal'

import {errorLogoUrl,correctLogoUrl,pageResultCloseBtnUrl} from "../../../../assets/cdnUrlConfig"

import '@/scss/style.scss'
import './PageResult.scss'

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

    // 根据正确错误切换样式
    let logoUrl:string
    let modalClassName:string
    if(!checked) {
        logoUrl = errorLogoUrl
        modalClassName = "PageResult-Modal-error"
    } else  {
        logoUrl = correctLogoUrl
        modalClassName = "PageResult-Modal-correct"
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
                className={modalClassName+" centered"}
                 >
                <div className="d-flex flex-column">
                    <img className="align-self-end mt-10 mr-10  " src={pageResultCloseBtnUrl} onClick={handleCloseModal}/>

                    <img className="align-self-center mt-20" src={logoUrl}/>
                    <div className="PageResult-msg  text-center">
                        {getModelContent()}
                    </div>
                    
                </div>
                
            </ReactModal>
        </div>
    )
})
