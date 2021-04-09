import React from 'react'

import '@/scss/style.scss'
import './Professtion.scss'
import initData from '../../assets/product-manager.json'
import Simulation from './Simulation/Simulation'
import ProfessionVideo from './ProfesstionVideo/ProfesstionVideo'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'


interface Props {
    professtionName:string
    pid: number
}

interface State {
    type: string
    stage: number
}

export default class Professtion extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            type: "sketch",
            stage: 1,
        }
        this.handleChangeStage = this.handleChangeStage.bind(this);
        this.handeChangeType = this.handeChangeType.bind(this);
    }

    
    handleChangeStage(stage) {
        this.setState({
            stage: stage
        })
    }

    handeChangeType(type) {
        this.setState({
            type: type
        }) 
    }

    currentContent() {
        switch (this.state.type) {
            case "sketch": {  
                return (
                    <div>
                        <h1 className="mt-40">产品经理</h1>
                        <h2>模拟任务进行进度：{this.state.stage}</h2>
                        <button className="btn btn-blue" onClick={()=>{this.handeChangeType("simulation")}}>产品经理模拟</button>
                        <button className="btn btn-blue" onClick={()=>{this.handeChangeType("professtionVideo")}}>视频集中页面</button>
                    </div>
                )
            }
            case "simulation": {
                return (
                    <div>
                        <Simulation 
                            stage={this.state.stage} 
                            handleChangeStage={(stage)=>{this.handleChangeStage(stage)}}
                            handleChangeType={this.handeChangeType}
                        />
                    </div>
                    
                )
            }
            case "professtionVideo": {
                return (
                    <div>
                        <ProfessionVideo 
                            professtionName={this.props.professtionName}
                            stage={this.state.stage}
                            pid={this.props.pid}
                            handleChangeType={this.handeChangeType}
                            videoData={initData.videos}
                        />
                    </div>
                    
                ) 
            }
            default:
                return <div />
        }
    }

    render() {
        return(
            <div>
                <h1>个人中心</h1>
                {this.currentContent()}
            </div>
            
        )
    }
}