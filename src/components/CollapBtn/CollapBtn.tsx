import React from 'react'
import PropTypes from 'prop-types'
import '../../scss/style.scss'

interface Props {
    name: string
    content: string
}

interface State {
    display: boolean
}

class CollapBtn extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            display: false
        }
    }

    handleClk = (event: any) => {
        event.preventDefault()
        this.setState({
            display: !this.state.display
        })
    }
    displayC = () => {
        if (this.state.display) {
            return <div>{this.props.content}</div>
        }
        return
    }
    render() {
        return (
            <div className="mt-40">
                <button onClick={this.handleClk} type="submit" className="btn btn-clp">
                    <h2>{this.props.name}</h2>
                </button>
                <h4 className="mt-40">{this.displayC()}</h4>
            </div>
        )
    }
}

export default CollapBtn
