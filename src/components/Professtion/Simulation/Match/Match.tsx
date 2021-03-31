import React, { useCallback, useState } from 'react'
import { Dustbin } from './Dustbin'
import { Box } from './Box'
import update from 'immutability-helper'
import '@/scss/style.scss'

interface Props {
    data: any
    handleNext: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface State {
    num: number
    img: any
}

export const Match: React.FC<Props> = ({ data }) => {
    const [droppedBoxes, setDroppedBoxes] = useState(new Set())
    const [dustbins, setDustbins] = useState([
        {
            name: '1',
            lastItem: null
        },
        {
            name: '2',
            lastItem: null
        },
        {
            name: '3',
            lastItem: null
        },
        {
            name: '4',
            lastItem: null
        },
        {
            name: '5',
            lastItem: null
        }
    ])

    // // Init the dustbins
    // setDustbins(
    //     update(dustbins, {
    //         $push: [
    //             {
    //                 type: 'dustbin',
    //                 lastItem: '',
    //             }
    //         ]
    //     })
    // )
    function isDropped(boxName) {
        return droppedBoxNames.indexOf(boxName) > -1
    }

    const [droppedBoxNames, setDroppedBoxNames] = useState([])

    const handleDrop = useCallback(
        (index, item) => {
            // setDroppedBoxNames(update(droppedBoxNames, item.name ? { $push: [item.name] } : { $push: [] }))
            setDustbins(
                update(dustbins, {
                    [index]: {
                        lastItem: {
                            $set: item
                        }
                    }
                })
            )
        },
        [droppedBoxNames, dustbins]
    )

    // Dustbin layouts
    const temp = [...dustbins];

    const items = data.content.map((item: any, index: number) => {
        if (item.type === 'dustbin') {
            console.log("id",item.id)
            console.log("dustbin", dustbins)
            console.log("temp", temp)
            return (
                <div
                    className="align-self-center"
                    style={{ overflow: 'hidden', clear: 'both', marginLeft: '10px' }}
                >
                    <Dustbin
                        lastItem={temp[item.id].lastItem}
                        onDrop={(box: any) => handleDrop(item.id, box)}
                    />
                </div>
            )
        } else {
            return <p style={{ lineHeight: 2.5 }}>{item.data}</p>
        }
    })

    const boxes = data.boxes.map((item: any, index: number) => {
        return <Box key={index} name={item.name} />
    })

    return (
        <div>
            <h2 className="mt-160">{data.name}</h2>
            <div className="mt-40 d-flex flex-row flex-wrap">{items}</div>
            <div
                className="d-flex justify-content-center mt-80"
                style={{ overflow: 'hidden', clear: 'both' }}
            >
                {boxes}
            </div>
        </div>
    )
}
