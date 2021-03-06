import { monitorEventLoopDelay } from 'perf_hooks'
import { ItemTypes } from './ItemTypes'
// import '../../scss/style.scss'
import React, { CSSProperties, FC, memo, useState } from 'react'
import { ConnectDropTarget, DropTargetMonitor, DropTarget } from 'react-dnd'
import { setFlagsFromString } from 'v8'

import './Match.scss'
const style: CSSProperties = {
    height: '3rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'black',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
    verticalAlign: 'center'
}

export interface DustbinProps {
    accepts: string[]
    lastDroppedItem?: any
    onDrop: (item: any) => void

    // Collected Props
    canDrop: boolean
    isOver: boolean
    connectDropTarget: ConnectDropTarget
}

export const Dustbin: FC<DustbinProps> = memo(function Dustbin({
    accepts,
    isOver,
    canDrop,
    connectDropTarget,
    lastDroppedItem
}) {
    const isActive = isOver && canDrop
    const [last, setLast] = useState("")

    let backgroundColor = 'white'
    return connectDropTarget(
        <div
            ref={connectDropTarget}
            role="Dustbin"
            style={{backgroundColor, width : "100%", height : "100%"}}
        >
            {lastDroppedItem ? (
                <p className="DropText" style={{ verticalAlign: 'center' }}>{lastDroppedItem.name}</p>
            ) : (
                <p style={{marginBottom : '0px', padding: 'auto'}}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
            )}
        </div>
    )
})

export default DropTarget(
    (props: DustbinProps) => props.accepts,
    {
        drop(props: DustbinProps, monitor: DropTargetMonitor) {
            props.onDrop(monitor.getItem())
        }
    },
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    })
)(Dustbin)
