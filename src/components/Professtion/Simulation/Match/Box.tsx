import React from 'react'
import {
    ConnectDragSource,
    DragSourceConnector,
    DragSourceMonitor,
    DragSourceSpec,
    useDrag
} from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import '@/scss/style.scss'

const style: React.CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.7rem 1rem 0rem 1rem',
    marginRight: '1.5rem',
    cursor: 'move',
    float: 'left',
    verticalAlign: 'middle',
    lineHeight: 1.5
}

export interface BoxProps {
    key: number
    name: string
    type: string
}

export const Box: React.FC<BoxProps> = ({ name, type }) => {
    const [{ isDragging }, drag]: any = useDrag(() => ({
        type: getType(type),
        item: { name: name, type: getType(type) },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult && typeof dropResult === "object") {
                console.log(item);
                console.log(dropResult);
                //  alert(`You dropped ${item.name} into ${dropResult.name}!`);
            }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId()
        })
    }))
    const opacity = isDragging ? 0.4 : 1
    return (
        <div ref={drag} role="Box" style={{ ...style, opacity }} data-testid={`box-${name}`}>
            <p>{name}</p>
        </div>
    )
}
