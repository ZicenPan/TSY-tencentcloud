/* eslint-disable max-params */
import React, { FC, memo, useState, useEffect, useCallback } from 'react'

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

    const [grid, setGrid] = useState(data.form.grid)
    const [columns, setColumns] = useState(data.form.columns)
    const [answer, setAnswer] = useState(data.form.answer)
    const [pass, setPass] = useState(false)

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

    function afterSaveCell(oldValue: any, newValue: any, row: any) {
        console.log('grid', grid)
        console.log('answer', answer)
        let equal = true
        for (let i in answer) {
            if (answer.hasOwnProperty(i)) {
                equal = equal && formEqual(answer[i], grid[i])
            }
        }
        setPass(equal)
    }

    //     }
    //     setPass(equal)
    // }

    const newCols = update(columns, {
        [columns.length - 1]: {
            $merge: {
                formatter: (cellContent, row, rowindex, extraData) => {
                    console.log("cell", cellContent)
                    console.log("row", row)
                    console.log("rowi", rowindex)
                    console.log("extra", extraData)
                    return (
                        <button
                            className="btn btn-blue"
                            onClick={() => {
                                console.log('click')
                            }}
                        >
                            截图
                        </button>
                    )
                }
            }
        }
    })

    console.log(newCols)
    function handleCheck() {}

    function setShowStandardTip() {}

    return (
        <div>
            <div className="d-flex flex-row">
                <div className="align-self-start">
                    <FakeUi data={data.fakeUI} />
                </div>
                <div className="ml-40 align-self-center">
                    <BootstrapTable
                        keyField="id"
                        data={grid}
                        columns={newCols}
                        cellEdit={cellEditFactory({
                            mode: 'click',
                            blurToSave: true,
                            afterSaveCell
                        })}
                        headerClasses={data.headerClass ? data.headerClass : 'header-class'}
                    />
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