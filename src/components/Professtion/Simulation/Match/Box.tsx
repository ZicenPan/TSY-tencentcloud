import React from 'react'
import {
    ConnectDragSource,
    DragSourceConnector,
    DragSourceMonitor,
    DragSourceSpec,
    useDrag
} from 'react-dnd'
import { getType } from './ItemTypes'
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
    onDrop: any
}

export const Box: React.FC<BoxProps> = ({ name, type, onDrop }) => {
    const [{ isDragging }, drag]: any = useDrag(() => ({
        type: getType(type),
        item: { name: name, type: getType(type) },
        end: (item, monitor) => {
            const dropResult: any = monitor.getDropResult()
            if (item && dropResult) {
                console.log(item);
                console.log("result", dropResult);
                if (item.type === dropResult.type) {
                    onDrop(true);
                    console.log("match", true);
                } else {
                    onDrop(false);
                    console.log("match", false)
                }
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
