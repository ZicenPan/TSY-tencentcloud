import React, { FC, memo, useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'

import { PageResult } from './../Result/PageResult'
import StandardTip from './../../StandardTip/StandardTip'

import update from 'immutability-helper'

import './Form.scss'

interface Props {
    data: any
    handleNext: () => void
}

export const Form: FC<Props> = memo(function Form({ data, handleNext}) {
    const [columns, setColumns] = useState(data.columns)
    const [grid, setGrid] = useState(data.grid)
    const [answer] = useState(data.answer)
    const [pass, setPass] = useState(false);
    function getType(type: string) {
        switch (type) {
            case 'select':
                return Type.SELECT
        }
    }

    useEffect(() => {
        console.log(grid)
    }, [grid])

    console.log("data", data)
    console.log("rmsg", data.resultMsg)
    const handleDataChange = (data) => {
        console.log('changed', data)
    }
    // console.log(data.columns)
    // const newCol = columns.map((item, index) => {
    //     return update(item, {
    //         editor: {
    //             $apply: function (x) {
    //                 return getType(x)
    //             }
    //         }
    //     })
    // })

    function formEqual(object1: any, object2: any) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
      
        if (keys1.length !== keys2.length) {
          return false;
        }
      
        for (const key of keys1) {
          const val1 = object1[key];
          const val2 = object2[key];
          if (val1 !== "" && val1 !== val2) {
            return false;
          }
        }
      
        return true;
      }

      function afterSaveCell(oldValue: any, newValue: any, row: any) {
        console.log("grid", grid)
        console.log("answer", answer)
        let equal = true;
        for (let i in answer) {
            if (answer.hasOwnProperty(i)) {
                equal = equal && formEqual(answer[i], grid[i]);
            }
        }
        setPass(equal);
    }

    function handleCheck() {

    }

    function setShowStandardTip(){

    }
    if (data.columns) {
        return (
            <div className="mt-40">
                <BootstrapTable
                    onDataSizeChange={handleDataChange}
                    keyField="id"
                    data={grid}
                    columns={columns}
                    cellEdit={cellEditFactory({ mode: 'click', 
                    blurToSave: true, afterSaveCell })}
                    headerClasses="header-class"
                />
                            <PageResult checked={pass} handleNext={handleNext} resultMsg={(data.resultMsg)?data.resultMsg:""} handleCheck={handleCheck} setShowStandardTip={setShowStandardTip}/>

                            <button
                onClick={handleNext}
                type="submit"
                className="btn btn-blue"
                style={{ position: 'fixed', top: '85%', left: '90%' }}
            >
                Skip
            </button>

            </div>
        )
    } else {
        return <div />
    }
})
