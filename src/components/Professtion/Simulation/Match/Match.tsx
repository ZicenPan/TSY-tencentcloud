import React, { FC, memo, useState, useCallback, useEffect } from 'react'
import DropTarget from './Dustbin'
import Box from './Box'
import { ItemTypes, availTypes } from './ItemTypes'
import update from 'immutability-helper'

import { PageResult } from './../Result/PageResult'
import StandardTip from './../../StandardTip/StandardTip'

import '@/scss/style.scss'
interface Props {
    data: any
    handleNext: () => void
}

interface DustbinState {
    accepts: string[]
    lastDroppedItem: any
    type: string
    matched: boolean
}

interface BoxState {
    name: string
    type: string
}

export interface DustbinSpec {
    accepts: string[]
    lastDroppedItem: any
}
export interface BoxSpec {
    name: string
    type: string
}

export interface ContainerState {
    droppedBoxNames: string[]
    dustbins: DustbinSpec[]
    boxes: BoxSpec[]
}

export const Match: FC<Props> = memo(function Match({ data, handleNext }) {
    const [dustbins, setDustbins] = useState(data.content)

    const [boxes, setBoxes] = useState<BoxState[]>(data.boxes)

    const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

    const [showStandardTip, setShowStandardTip] = useState(false)

    function isDropped(boxName: string) {
        return droppedBoxNames.indexOf(boxName) > -1
    }

    const handleDrop = useCallback(
        (index: number, item: BoxSpec) => {
            setDroppedBoxNames(
                update(droppedBoxNames, item.name ? { $push: [item.name] } : { $push: [] })
            )
            setDustbins(
                update(dustbins, {
                    [index]: {
                        lastDroppedItem: {
                            $set: item
                        },
                        matched: {
                            $set: item.type === dustbins[index].data
                        }
                    }
                })
            )
        },
        [droppedBoxNames, dustbins]
    )

    // Re-render when data updates.
    useEffect(() => {
        setDustbins(data.content)
        setBoxes(data.boxes)
    }, [data])

    const matched = () => {
        const a = dustbins.filter(function (item) {
            return item.matched === false
        })
        return a.length === 0
    }

    return (
        <div>
            <h2 className="mt-160">{data.name}</h2>
            <div className="mt-40 d-flex flex-row flex-wrap">
                {dustbins.map((item: any, index: number) => {
                    if (item.type === 'dustbin') {
                        return (
                            <DropTarget
                                accepts={availTypes}
                                lastDroppedItem={item.lastDroppedItem}
                                onDrop={(box) => handleDrop(index, box)}
                                key={index}
                            />
                        )
                    } else {
                        return <p style={{ lineHeight: 2.5 }}>{item.data}</p>
                    }
                })}
            </div>

            <div
                className="d-flex justify-content-center mt-80"
                style={{ overflow: 'hidden', clear: 'both' }}
            >
                {boxes.map(({ name, type }, index) => (
                    <Box name={name} type={type} isDropped={isDropped(name)} key={index} />
                ))}
            </div>
            <PageResult checked={matched()} handleNext={handleNext} setShowStandardTip={setShowStandardTip} resultMsg={data.resultMsg}/>
            
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
