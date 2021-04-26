import React, { FC, memo, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import update from 'immutability-helper'

interface Props {
    data: any
    handleNext: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
  
export const Form: FC<Props> = memo(function Form({ data }) {
    const [columns, setColumns] = useState(data.columns)
    const [grid, setGrid] = useState(data.grid)

    console.log("here data", grid);
    function getType(type: string) {
        switch (type) {
            case 'select':
                return Type.SELECT
        }
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
    return (
        <BootstrapTable
            keyField="id"
            data={grid}
            columns={columns}
            cellEdit={cellEditFactory({ mode: "click", blurToSave: true})}
        />
    )
})
