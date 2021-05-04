import React, { FC, memo, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import update from 'immutability-helper'

import './StaticDisplay.scss'
interface Props {
    templateData: any
}

export const StaticDisplay: FC<Props> = memo(function StaticDisplay({ templateData }) {

    let className = " d-flex";
    if (templateData.direction === "row") {
        className += " flex-row"
    } else if (templateData.direction === "column") {
        className += " flex-column"
    }
    
    let display = []
    for (const item of templateData.content) {
        if (item.type === "words") {
            display.push(
                <p className="common-font-style" style={item.style}>
                    {item.content}
                </p>
            )
        } else if (item.type === "image") {
            display.push(
               <img src={item.content} style={item.style}/>
            )
        }
    }
    return (
        <div className={className}>
            {display}
        </div>
    )
}
)
