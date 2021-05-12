/* eslint-disable max-params */
import React, { FC, memo, useState, useEffect, useCallback } from 'react'
import "./ScreenShot.scss"

import { Form } from '../Form/Form'
import FakeUi from '../FakeUi/FakeUi'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'

import { PageResult } from '../Result/PageResult'
import StandardTip from '../../StandardTip/StandardTip'

import update from 'immutability-helper'
import ReactModal from 'react-modal'
import { PassThrough } from 'node:stream'
import { bool } from 'prop-types'


interface Props {
    data: any
    handleNext: () => void
}

interface ZoomFigure {
    src : any
    zoom: boolean
}
interface SState {
    data: any
    pass: boolean
    figure: ZoomFigure
}

export default class ScreenShot extends React.Component<Props, SState> {
    constructor(props: any) {
        super(props)
        this.state = { 
            data: this.props.data,
            pass: false,
            figure :{src:"null", zoom:false}
        }
    }

    setZoomFigure(zoom: ZoomFigure) {
        this.setState( 
            {
                figure: zoom
            })
    }
    formEqual(object1: any, object2: any) {
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

    afterSaveCell(oldValue: any, newValue: any, row: any) {
        const grid = this.props.data.form.grid
        const columns = this.props.data.form.columns
        const answer = this.props.data.form.answer
        console.log('grid', grid)
        console.log('answer',answer)
        let equal = true
        for (let i in answer) {
            if (answer.hasOwnProperty(i)) {
                equal = equal && this.formEqual(answer[i], grid[i])
            }
        }
        
        this.setState({
            pass:true
        })
    }
    setImg(imgSrc, e){
        console.log("Set img!")
        this.setZoomFigure( {src:imgSrc, zoom:true})
    }

    
    fullScreenImg = () => {
    return <ReactModal
    isOpen= {this.state.figure.src.zoom}
    contentLabel="onRequestClose Example"
    className="centered"
    >
    <div className="d-flex flex-column" onClick={() =>this.setZoomFigure( {src: this.state.figure.src, zoom:false})}>
        <img className="align-self-center mt-40" src={this.state.figure.src} style={{width:"90%", height:"90%"}}/>
        
    </div>
    </ReactModal>;
    }

    render() {

        console.log("state!", this.state)
        let columns = this.props.data.form.columns
        console.log(columns)
        console.log("columns!", columns)
        let clength = columns.length - 1
        let grid = this.props.data.form.grid
        const newCols = update(columns, {
            [clength]: {
                $merge: {
                    formatter: (cellContent, row, rowindex, extraData) => {
                        console.log("cell", cellContent)
                        console.log("row", row)
                        console.log("rowi", rowindex)
                        console.log("extra", extraData)
                        return (
                            <div onClick={(e)=> this.setImg(row.vision, e)}>
                            <img src={row.vision} style={{width:"100%", height:"100%"}} />
                            </div>
                        )
                    }
                }
            }
        })
        console.log("recolumns!", columns)

        return (
            <div>
                <div className="d-flex flex-row">
                    <div className="align-self-start">
                        <FakeUi data={this.props.data.fakeUI} />
                    </div>
                    <div className="ml-40 align-self-center">
                        <BootstrapTable
                            keyField="id"
                            data={grid}
                            columns={newCols}
                            cellEdit={cellEditFactory({
                                mode: 'click',
                                blurToSave: true,
                                nonEditableRows: () => ["步骤一"],
                                afterSaveCell:this.afterSaveCell
                            })}
                            headerClasses={this.props.data.headerClass ? this.props.data.headerClass : 'header-class'}
                        />
                    </div>
                </div>
                {this.fullScreenImg()}
                <button
                    onClick={this.props.handleNext}
                    type="submit"
                    className="btn btn-blue"
                    style={{ position: 'fixed', top: '85%', left: '70%' }}
                >
                    下一步
                </button>
            </div>
        )
    }
}