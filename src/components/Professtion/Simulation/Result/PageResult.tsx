import React, { FC, Fragment, memo, useState } from 'react'
import ReactModal from 'react-modal'

import {errorLogoUrl,correctLogoUrl,pageResultCloseBtnUrl,pageResultErrorCloseBtnUrl} from "../../../../assets/cdnUrlConfig"

import '@/scss/style.scss'
import './PageResult.scss'

interface Props {
    checked: boolean
    handleNext: () => void
    handleCheck: () => void
    resultMsg: any
    setShowStandardTip:(boolean) => void
}

export const PageResult: FC<Props> = memo(function PageResult({ checked, handleNext, handleCheck, resultMsg, setShowStandardTip}) {

    const [btnName, setBtnName] = useState<string>("确认")
    const [showModal, setShowModal] = useState(false)
    let btnRef = React.createRef<HTMLButtonElement>()
    

    function handleOpenModal() {
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
        
    }

    function handleCloseCorrectModal() {
        handleCloseModal()
        setShowStandardTip(true)
    }

    function ButtonRouter() {
        if (checked && btnName ==="下一步") {
            handleNext()
        } else {
            handleSubmit()
        }
    }

    function handleSubmit() {
        handleOpenModal()
        handleCheck()
        if (checked) {
            setBtnName("下一步")
        } else {
            setBtnName("确认")
        }
    }

    function getModelContent() {
        let content:string
        if (checked) 
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

    // 根据正确错误切换样式
    let logoUrl:string
    let modalClassName:string
    let closeBtnUrl:string
    let btnContent:string
    if(!checked) {
        logoUrl = errorLogoUrl
        modalClassName = "PageResult-Modal-error"
        closeBtnUrl = pageResultErrorCloseBtnUrl

    } else  {
        logoUrl = correctLogoUrl
        modalClassName = "PageResult-Modal-correct"
        closeBtnUrl = pageResultCloseBtnUrl
    }
    return (
        <div>
            <button
                ref={btnRef}
                onClick={ButtonRouter}
                type="submit"
                className="btn btn-blue"
                style={{ position: 'fixed', top: '85%', left: '70%', maxWidth: "352px"}}
            >
                {checked?btnName:"确认"}
            </button>

            <ReactModal
                isOpen={showModal}
                contentLabel="onRequestClose Example"
                onRequestClose={checked?handleCloseCorrectModal:handleCloseModal}
                className={modalClassName+" centered"}
                 >
                <div className="d-flex flex-column">
                    <img className="align-self-end mt-10 mr-10" src={closeBtnUrl} onClick={checked?handleCloseCorrectModal:handleCloseModal}/>

                    <img className="align-self-center mt-20" src={logoUrl}/>
                    <div className="PageResult-msg  text-center">
                        {getModelContent()}
                    </div>
                    
                </div>
                
            </ReactModal>
        </div>
    )
})
