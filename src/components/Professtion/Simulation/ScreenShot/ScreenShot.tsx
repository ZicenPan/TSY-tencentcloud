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
    showStandardTip: boolean
}

export default class ScreenShot extends React.Component<Props, SState> {
    constructor(props: any) {
        super(props)
        this.state = { 
            data: this.props.data,
            pass: false,
            figure :{src:"null", zoom:false},
            showStandardTip: false
        }
        this.afterSaveCell = this.afterSaveCell.bind(this)
        this.setShowStandardTip = this.setShowStandardTip.bind(this)
    }

    setZoomFigure(zoom: ZoomFigure) {
        console.log("zoom!",zoom)
        this.setState( 
            {
                figure: zoom
            })
    }

    setShowStandardTip(status:boolean) {
        this.setState({
            showStandardTip:status
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
            // 不允许提交的答案有空白
            if (val2 === '')
                return false
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
            pass:equal
        })
    }
    setImg(imgSrc, e){
        console.log("Set img!")
        this.setZoomFigure( {src:imgSrc, zoom:true})
    }

    
    fullScreenImg = () => {
    
    return <ReactModal
    isOpen= {this.state.figure.zoom}
    contentLabel="onRequestClose Example"
    className="centered"
    style={{overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex:64
      }}}
    >
    <div className="d-flex flex-column" onClick={() =>this.setZoomFigure( {src: this.state.figure.src, zoom:false})}>
        <img className="align-self-center mt-40" src={this.state.figure.src} style={{width:"340px", height:"740px"}}/>
        
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


        return (
            <div>
                <div className="d-flex flex-row">
                    <div className="align-self-start">
                        <FakeUi data={this.props.data.fakeUI} nextType={undefined} handleNext={this.props.handleNext}/>
                    </div>
                    <div className="ml-40 align-self-center">
                        <BootstrapTable
                            keyField="id"
                            data={grid}
                            columns={newCols}
                            cellEdit={cellEditFactory({
                                mode: 'click',
                                blurToSave: true,
                                nonEditableRows: () =>  this.props.data.form.name === "Messenger"? []:["步骤一"],
                                afterSaveCell:this.afterSaveCell
                            })}
                            headerClasses={this.props.data.headerClass ? this.props.data.headerClass : 'header-class'}
                        />
                    </div>
                </div>
                {this.fullScreenImg()}

                <PageResult
                    checked={this.state.pass}
                    handleNext={this.props.handleNext}
                    resultMsg={this.props.data.resultMsg ? this.props.data.resultMsg : ''}
                    handleCheck={()=>{}}
                    setShowStandardTip={this.setShowStandardTip}
                />
                {this.state.showStandardTip?<StandardTip standardMsg={this.props.data.resultMsg.standardMsg}/>:<div/>}
                <button
                    onClick={this.props.handleNext}
                    type="submit"
                    className="btn btn-blue"
                    style={{ position: 'fixed', top: '85%', left: '90%' }}
                >
                    Skip
                </button>
            </div>
        )
    }
}