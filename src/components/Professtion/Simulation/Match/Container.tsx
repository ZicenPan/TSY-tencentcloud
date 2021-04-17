import React, { FC, memo, useState, useCallback } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import Dustbin from './Dustbins'
import Box from './Boxes'
import { ItemTypes } from './ItemTypes'
import update from 'immutability-helper'

interface DustbinState {
    accepts: string[]
    lastDroppedItem: any
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

export const Container: FC = memo(function Container() {
    const [dustbins, setDustbins] = useState<DustbinState[]>([
        { accepts: [ItemTypes.GLASS], lastDroppedItem: null, matched: false },
        { accepts: [ItemTypes.FOOD], lastDroppedItem: null, matched: false },
        {
            accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
            lastDroppedItem: null,
            matched: false
        },
        { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null, matched: false }
    ])

    const [boxes] = useState<BoxState[]>([
        { name: 'Bottle', type: ItemTypes.GLASS },
        { name: 'Banana', type: ItemTypes.FOOD },
        { name: 'Magazine', type: ItemTypes.PAPER }
    ])

    const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

    function isDropped(boxName: string) {
        return droppedBoxNames.indexOf(boxName) > -1
    }

    const handleDrop = useCallback(
        (index: number, item: BoxSpec) => {
            console.log('beforehandle', dustbins)
            setDroppedBoxNames(update(droppedBoxNames, item.name ? { $push: [item.name] } : { $push: [] }))
            setDustbins(
                update(dustbins, {
                    [index]: {
                        lastDroppedItem: {
                            $set: item.name
                        }
                    }
                })
            )
        },
        [droppedBoxNames, dustbins]
    )
    console.log(dustbins)
    return (
        <div>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                {dustbins.map(({ accepts, lastDroppedItem }, index) => (
                    <Dustbin
                        accepts={accepts}
                        lastDroppedItem={lastDroppedItem}
                        onDrop={(item) => handleDrop(index, item)}
                        key={index}
                    />
                ))}
            </div>

            <div style={{ overflow: 'hidden', clear: 'both' }}>
                {boxes.map(({ name, type }, index) => (
                    <Box name={name} type={type} isDropped={isDropped(name)} key={index} />
                ))}
            </div>
        </div>
    )
})
