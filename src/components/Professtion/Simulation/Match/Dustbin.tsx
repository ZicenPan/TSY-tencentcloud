import { monitorEventLoopDelay } from 'perf_hooks'
import React, { CSSProperties, useState } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import '../../scss/style.scss'

const style: CSSProperties = {
    height: '3rem',
    // width: '7rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'black',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left'
}
export const Dustbin = ({ onDrop, lastItem }) => {
    const [last, setLast] = useState("")
    const [{ canDrop, isOver, item }, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop: (box: any) => {
            setLast(box.name)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            item: monitor.getItem()
        })
    }))
    const isActive = canDrop && isOver
    // if (didDrop) {
    //     setLastDropped(item.name)
    // }
    let backgroundColor = 'white'
    if (isActive) {
        backgroundColor = '#cccccc'
        // console.log(item.name)
    }
    console.log(last)
    return (
        <div
            ref={drop}
            role="Dustbin"
            style={{ ...style, backgroundColor, border: 'solid 1px black', textAlign: 'center' }}
        >
            {last ? (
                <p style={{ textAlign: 'center' }}>{last}</p>
            ) : (
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
            )}
        </div>
    )
}
