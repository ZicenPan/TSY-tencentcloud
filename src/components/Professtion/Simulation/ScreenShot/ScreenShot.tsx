import React, { FC, memo, useState, useEffect } from 'react'

import { Form } from '../Form/Form'
import FakeUi from '../FakeUi/FakeUi'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'

import { PageResult } from '../Result/PageResult'
import StandardTip from '../../StandardTip/StandardTip'

import update from 'immutability-helper'

interface Props {
    data: any
    handleNext: () => void
}

export const ScreenShot: FC<Props> = memo(function ScreenShot({ data, handleNext }) {
    const [UInum, setUInum] = useState(0)

    const [pass, setPass] = useState(false)
    function getType(type: string) {
        switch (type) {
            case 'select':
                return Type.SELECT
        }
    }

    function formEqual(object1: any, object2: any) {
        const keys1 = Object.keys(object1)
        const keys2 = Object.keys(object2)

        if (keys1.length !== keys2.length) {
            return false
        }

        for (const key of keys1) {
            const val1 = object1[key]
            const val2 = object2[key]
            if (val1 !== '' && val1 !== val2) {
                return false
            }
        }

        return true
    }

    // function afterSaveCell(oldValue: any, newValue: any, row: any) {
    //     console.log('grid', grid)
    //     console.log('answer', answer)
    //     let equal = true
    //     for (let i in answer) {
    //         if (answer.hasOwnProperty(i)) {
    //             equal = equal && formEqual(answer[i], grid[i])
    //         }
    //     }
    //     setPass(equal)
    // }

    function handleCheck() {}

    function setShowStandardTip() {}

    return (
        <div>
            <div className="d-flex flex-row">
                <div className="align-self-start">
                    <FakeUi data={data.fakeUI} />
                </div>
                <div className="ml-40 align-self-center">
                    <Form data={data.form} handleNext={handleNext} />
                </div>
            </div>
            <button
                onClick={handleNext}
                type="submit"
                className="btn btn-blue"
                style={{ position: 'fixed', top: '85%', left: '70%' }}
            >
                下一步
            </button>
        </div>
    )
})
