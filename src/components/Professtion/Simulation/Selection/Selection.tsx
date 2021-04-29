/* eslint-disable */

import React, { FC, memo, useState, useCallback } from 'react'
import update from 'immutability-helper'
import { PageResult } from './../Result/PageResult'
import StandardTip from './../../StandardTip/StandardTip'
import '@/scss/style.scss'

interface Props {
    data: any
    handleNext: () => void
}

interface State {
    num: number
    img: any
}

export const Selection: FC<Props> = memo(function Selection({ data, handleNext }) {
    const [options, setOptions] = useState(data.content)
    const [showStandardTip, setShowStandardTip] = useState(false)

    const handleClick = useCallback(
        (index: number) => {
            setOptions(
                update(options, {
                    [index]: {
                        selected: {
                            $set: !options[index].selected
                        }
                    }
                })
            )
        },
        [options]
    )

    const matched = () => {
        const a = options.filter(function (item) {
            return item.selected !== item.answer
        })
        return a.length === 0
    }

    console.log('options', options)
    console.log(data.resultMsg)
    return (
        <div className="mt-40">
            <h2>{data.name}</h2>
            <div className="d-flex justify-content-around flex-wrap mt-20">
                {options.map((item: any, id: number) => {
                    // const requestImageFile = require.context('../../../../assets/', true, /.png$/)

                    return (
                        <div className="sel mt-20">
                            <button
                                style={{
                                    borderColor: item.selected ? '#131313' : '#ffffff',
                                    backgroundColor: '#ffffff'
                                }}
                                onClick={() => handleClick(id)}
                            >
                                <div className="d-flex flex-row">
                                    <img
                                        src="https://fyp-web-1gdzo8ub179215dc-1304731661.tcloudbaseapp.com/tys-website-assets/companyIcons/Bilibili.png"
                                        // src={require(`../../../../assets/${imgName}.png`)}
                                        width="50"
                                        height="50"
                                        alt="logo1"
                                    />
                                    <div className="ml-20">
                                        <h3>{data.content[id].title}</h3>
                                        <p className="mt-10">{data.content[id].description}</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    )
                })}
            </div>
            
            <PageResult 
                checked={matched()} 
                handleNext={handleNext} 
                resultMsg = {data.resultMsg}
                setShowStandardTip = {setShowStandardTip}
           />
           {showStandardTip?<StandardTip standardMsg={data.resultMsg.standardMsg}/>:<div/>}
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
})
