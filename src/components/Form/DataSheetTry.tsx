import React, { useEffect, useState } from 'react'
import ReactDataSheet from 'react-datasheet'
import Select from 'react-select'
import _ from 'lodash'

import 'react-datasheet/lib/react-datasheet.css'
import { any } from 'prop-types'

export interface GridElement extends ReactDataSheet.Cell<GridElement, number> {
    type: 'select' | 'title'
    value: number | null | string
}

class MyReactDataSheet extends ReactDataSheet<GridElement, number> {}

interface Props {
    data: GridElement[][]
}

interface State {
    grid: GridElement[][]
}

// You can also strongly type all the Components or SFCs that you pass into ReactDataSheet.
let cellRenderer: ReactDataSheet.CellRenderer<GridElement, number> = (props) => {
    if (props.cell.type) {
        if (props.cell.type === 'title') {
            return (
                <td
                    style={props.style}
                    onMouseDown={props.onMouseDown}
                    onMouseOver={props.onMouseOver}
                    onDoubleClick={props.onDoubleClick}
                    className="cell"
                >
                    <p style={{ fontWeight: 500 }}>{props.children}</p>
                </td>
            )
        } else if (props.cell.type === 'select') {
            return (
                <td
                    style={props.style}
                    onMouseDown={props.onMouseDown}
                    onMouseOver={props.onMouseOver}
                    onDoubleClick={props.onDoubleClick}
                    className="cell"
                >
                    {/* <Select
          autofocus
          openOnFocus
          value={props.cell.value}
          onChange={(opt) => this.setState({grocery: _.assign(this.state.grocery, {[id]: opt})})}
          options={props.}
        />      */}
                </td>
            )
        }
    }
    return (
        <td
            onMouseDown={props.onMouseDown}
            onMouseOver={props.onMouseOver}
            onDoubleClick={props.onDoubleClick}
            className="cell"
        >
            <p>{props.children}</p>
        </td>
    )
}

export default function DataSheet({ data }) {
    const [grid, setGrid] = useState(data)

    useEffect(() => {
        setGrid(data)
    }, [data])

    function onCellsChanged(changes: any) {
        const newGrid = grid.map((row: any) => [...row])
        changes.forEach(({ row, col, value }) => {
            newGrid[row][col] = { ...grid[row][col], value: value }
        })
        setGrid(newGrid)
    }

    console.log('here', grid)

    function generateGri () {
        grid.map((rows: any, indexr: number) => {
            return rows.map((items: any, index: number) => {
              console.log("here", items)
                if (items.type === 'select') {
                  console.log("row", indexr, "col", index)
                    return {
                        ...items,
                        component: (
                            <Select
                                autofocus
                                openOnFocus
                                value={grid[indexr][index].value}
                                onChange={(opt) =>
                                    onCellsChanged([{ row: indexr, col: index, value: opt }])
                                }
                                options={items.options}
                            />
                        )
                    }
                }
                return items
            })
        })
    }

    console.log('asdhere', grid)
    return (
        <MyReactDataSheet
            data={grid}
            valueRenderer={(cell) => cell.value}
            onCellsChanged={onCellsChanged}
            onContextMenu={(e, cell) => (cell.readOnly ? e.preventDefault() : null)}
            cellRenderer={cellRenderer}
        />
    )
}
