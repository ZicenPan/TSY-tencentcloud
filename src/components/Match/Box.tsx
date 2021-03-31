import React from 'react'
import {
    ConnectDragSource,
    DragSourceConnector,
    DragSourceMonitor,
    DragSourceSpec,
    useDrag
} from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import '../../scss/style.scss'

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
}

export const Box: React.FC<BoxProps> = ({ name }) => {
    const [{ isDragging }, drag]: any = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { name: name, type: ItemTypes.BOX },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                console.log(item);
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
