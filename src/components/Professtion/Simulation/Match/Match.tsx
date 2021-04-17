import React, { FC, memo, useState, useCallback } from 'react'
import Dustbin from './Dustbin'
import Box from './Box'
import { ItemTypes, availTypes } from './ItemTypes'
import update from 'immutability-helper'
import '@/scss/style.scss'
import { PageResult } from './../Result/PageResult'

interface Props {
    data: any
    handleNext: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
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

    const [boxes] = useState<BoxState[]>(data.boxes)

    const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

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
                            <Dustbin
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
            <PageResult checked={matched()} handleNext={handleNext} />
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
