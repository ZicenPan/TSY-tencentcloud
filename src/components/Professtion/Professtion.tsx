import React from 'react'

import '@/scss/style.scss'
import './Professtion.scss'
import initData from '../../assets/product-manager.json'
import Simulation from './Simulation/Simulation'
import ProfessionVideo from './ProfesstionVideo/ProfesstionVideo'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'

const tysPrefix = "tys_sim_"
const userPrefix = "user1"
const pid = 1

interface Props {
    professtionName:string
    pid: number
}

interface State {
    type: string
    stage: number
    step: number
}

export default class Professtion extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            type: "sketch",
            stage: 1,
            step: 0
        }
        this.handleChangeStage = this.handleChangeStage.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeStep = this.handleChangeStep.bind(this);
        this.handleCleanUpProgress = this.handleCleanUpProgress.bind(this);
    }


    componentDidMount() {
        console.log(this.state)

        let userProfesstion = JSON.parse(localStorage.getItem(tysPrefix+userPrefix))
        if (userProfesstion === null) {
            userProfesstion = {}
            userProfesstion["pinfos"] = {}
            userProfesstion["pinfos"][pid] = {"stage":1,"step":0}
            localStorage.setItem(tysPrefix+userPrefix, JSON.stringify(userProfesstion))
        } else {
            if (userProfesstion.hasOwnProperty("pinfos")) {
                if(userProfesstion["pinfos"].hasOwnProperty(pid)) {
                    this.setState({
                        stage:userProfesstion["pinfos"][pid].stage,
                        step:userProfesstion["pinfos"][pid].step
                    })
                }
            }
        }
    }

    handleChangeStage(stage) {
        this.setState({
            stage: stage
        })

        let userProfesstion = JSON.parse(localStorage.getItem(tysPrefix+userPrefix))
        if (userProfesstion === null) {
            userProfesstion = {}
            userProfesstion["pinfos"] = {}
            userProfesstion["pinfos"][pid.toString()] = {"stage":stage,"step":0}
        } else {
            console.log(userProfesstion.pinfos)
            if (userProfesstion.hasOwnProperty("pinfos")) {
                if(userProfesstion["pinfos"].hasOwnProperty(pid.toString())) {
                    userProfesstion["pinfos"][pid.toString()]["stage"] = stage
                    userProfesstion["pinfos"][pid.toString()]["step"] = 0
                }
            }
        }
        
        localStorage.setItem(tysPrefix+userPrefix, JSON.stringify(userProfesstion))
    }



    handleChangeStep(step) {
        this.setState({
            step: step
        })

        let userProfesstion = JSON.parse(localStorage.getItem(tysPrefix+userPrefix))
        if (userProfesstion === null) {
            userProfesstion = {}
            userProfesstion["pinfos"] = {}
            userProfesstion["pinfos"][pid.toString()] = {"stage":this.state.stage,"step":step}
        } else {
            if (userProfesstion.hasOwnProperty("pinfos")) {
                if(userProfesstion["pinfos"].hasOwnProperty(pid.toString())) {
                    userProfesstion["pinfos"][pid.toString()]["step"] = step
                }
            }
        }
        
        localStorage.setItem(tysPrefix+userPrefix, JSON.stringify(userProfesstion))
    }

    handleCleanUpProgress() {
        // let userProfesstion = JSON.parse(localStorage.getItem(tysPrefix+userPrefix))
        // if (userProfesstion !== null) {
        //     if (userProfesstion.hasOwnProperty("pinfos")) {
        //         if(userProfesstion.hasOwnProperty(pid)) {
        //             userProfesstion["pinfos"][pid]["stage"] = 1
        //             userProfesstion["pinfos"][pid]["step"] = 0
        //         }
        //     }
        //     localStorage.setItem(tysPrefix+userPrefix, JSON.stringify(userProfesstion))
        // }
        this.setState({
            stage: 1,
            step:0
        })
        localStorage.clear()
    }

    handleChangeType(type) {
        this.setState({
            type: type
        }) 
    }

    currentContent() {
        switch (this.state.type) {
            case "sketch": {  
                return (
                    <div>
                        <h1>个人中心</h1>
                        <h1 className="mt-40">产品经理</h1>
                        <h2>模拟任务进行进度：stage:{this.state.stage}step:{this.state.step}</h2>
                        <button className="btn btn-blue" onClick={()=>{this.handleChangeType("simulation")}}>产品经理模拟</button>
                        <button className="btn btn-blue" onClick={()=>{this.handleCleanUpProgress()}}>清空模拟进度</button>
                        <button className="btn btn-blue" onClick={()=>{this.handleChangeType("professtionVideo")}}>视频集中页面</button>
                    </div>
                )
            }
            case "simulation": {
                return (
                    <div>
                        <Simulation 
                            stage={this.state.stage} 
                            step={this.state.step}
                            handleChangeStage={(stage)=>{this.handleChangeStage(stage)}}
                            handleChangeType={this.handleChangeType}
                            handleChangeStep={this.handleChangeStep}
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
                            handleChangeType={this.handleChangeType}
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
                {this.currentContent()}
            </div>
            
        )
    }
}