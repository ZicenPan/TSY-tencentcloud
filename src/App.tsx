import React from 'react'

import './App.css'

import Professtion from './components/Professtion/Professtion'


export default class App extends React.Component<{}, {}> {

    render() {
        return (
            <div>
                <Professtion professtionName="产品经理" pid={1}/>
            </div>
        )
    }
}
