// import React, { useCallback, useState, FC, memo } from 'react'
// import { Dustbin } from './Dustbin'
// import { Box } from './Box'
// import { getType } from './ItemTypes'
// import update from 'immutability-helper'
// import { isJSDocCommentContainingNode } from 'typescript'
// import '@/scss/style.scss'

// interface Props {
//     data: any
//     handleNext: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
// }

// interface State {
//     num: number
//     img: any
// }

// interface BoxState {
//     name: string
//     type: string
//     matched: boolean
// }
// export const Match: FC<Props> = memo(function Match({ data }) {
//     // export const Match: React.FC<Props> = ({ data }) => {
//     const [matched, setMatched] = useState(true)
//     const [droppedBoxes, setDroppedBoxes] = useState(new Set())
//     const [boxes, setBoxes] = useState<BoxState[]>(data.boxes)
//     const [dustbins, setDustbins] = useState([
//         {
//             name: '1',
//             lastItem: null
//         },
//         {
//             name: '2',
//             lastItem: null
//         },
//         {
//             name: '3',
//             lastItem: null
//         },
//         {
//             name: '4',
//             lastItem: null
//         },
//         {
//             name: '5',
//             lastItem: null
//         }
//     ])

//     // // Init the dustbins
//     // setDustbins(
//     //     update(dustbins, {
//     //         $push: [
//     //             {
//     //                 type: 'dustbin',
//     //                 lastItem: '',
//     //             }
//     //         ]
//     //     })
//     // )
//     function isDropped(boxName) {
//         return droppedBoxNames.indexOf(boxName) > -1
//     }

//     const [droppedBoxNames, setDroppedBoxNames] = useState([])

//     const handleDrop = useCallback(
//         (index, item) => {
//             console.log('index', index)
//             console.log('item', item)

//             // setDroppedBoxNames(update(droppedBoxNames, item.name ? { $push: [item.name] } : { $push: [] }))
//             setDustbins(
//                 update(dustbins, {
//                     [index]: {
//                         lastItem: {
//                             $set: item
//                         }
//                     }
//                 })
//             )
//         },
//         [droppedBoxNames, dustbins]
//     )

//     // Dustbin layouts
//     const temp = [...dustbins]

//     const a = useCallback(
//         (val: boolean) => {
//             setMatched(matched && val)
//             console.log('curV', val)
//             console.log('curM', matched)
//         },
//         [matched]
//     )

//     // const check=useCallback(())

//     // const items = data.content.map((item: any, index: number) => {
//     //     if (item.type === 'dustbin') {
//     //         return (
//     //             <div
//     //                 className="align-self-center"
//     //                 style={{ overflow: 'hidden', clear: 'both', marginLeft: '10px' }}
//     //             >
//     //                 <Dustbin
//     //                     type={getType(item.data)}
//     //                     onDrop={(box: any) => handleDrop(item.id, box)}
//     //                 />
//     //             </div>
//     //         )
//     //     } else {
//     //         return <p style={{ lineHeight: 2.5 }}>{item.data}</p>
//     //     }
//     // })

//     console.log('before', boxes)

//     const handleDropBox = useCallback(
//         (index, item) => {
//             console.log('indexB', index)
//             console.log('itemB', item)
//             console.log(boxes)

//             // setDroppedBoxNames(update(droppedBoxNames, item.name ? { $push: [item.name] } : { $push: [] }))
//             setBoxes(
//                 update(boxes, {
//                     [index]: {
//                         matched: {
//                             $set: item
//                         }
//                     }
//                 })
//             )
//         },
//         [boxes]
//     )

//     console.log('all: ', matched)
//     console.log('here', boxes)
//     return (
//         <div>
//             <h2 className="mt-160">{data.name}</h2>
//             <div className="mt-40 d-flex flex-row flex-wrap">
//                 {data.content.map((item: any, index: number) => {
//                     if (item.type === 'dustbin') {
//                         return (
//                             <div
//                                 className="align-self-center"
//                                 style={{ overflow: 'hidden', clear: 'both', marginLeft: '10px' }}
//                             >
//                                 <Dustbin
//                                     key={item.id}
//                                     type={getType(item.data)}
//                                     onDrop={(box: any) => handleDrop(item.id, box)}
//                                 />
//                             </div>
//                         )
//                     } else {
//                         return <p style={{ lineHeight: 2.5 }}>{item.data}</p>
//                     }
//                 })}
//             </div>
//             <div
//                 className="d-flex justify-content-center mt-80"
//                 style={{ overflow: 'hidden', clear: 'both' }}
//             >
//                 {boxes.map((item: any, index: number) => {
//                     console.log('boxes', index, boxes)

//                     return (
//                         <Box
//                             key={index}
//                             name={item.name}
//                             type={item.type}
//                             onDrop={(matched: boolean) => handleDropBox(index, matched)}
//                         />
//                     )
//                 })}
//             </div>
//         </div>
//     )
// })

import React, { FC, memo, useState, useCallback } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import Dustbin from './Dustbins'
import Box from './Boxes'
import { ItemTypes, availTypes } from './ItemTypes'
import update from 'immutability-helper'
import '@/scss/style.scss'

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
    matched: boolean
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

export const Match: FC<Props> = memo(function Match({ data }) {
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
    console.log(dustbins)
    return (
        <div>
            <h2 className="mt-160">{data.name}</h2>
            <div className="mt-40 d-flex flex-row flex-wrap">
                {dustbins.map((item: any, index) => {
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
        </div>
    )
})
