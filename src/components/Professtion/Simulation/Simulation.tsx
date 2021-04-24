import React from 'react'
import PropTypes from 'prop-types'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import initData from '../../../assets/product-manager.json'

import CollapBtn from './CollapBtn/CollapBtn'
// import ComponentSheet from './Form/ComponentSheet'
import ComponentSheet from '../../Form/Form'
import Conversation from './Conversation/Conversation'
import PopUpBtn from './PopUpBtn/PopUpBtn'
import { Selection } from './Selection/Selection'
import TopBar from './TopBar/TopBar'
import Video from './SimulationVideo/SimulationVideo'
import ProfesstionsVideos from './ProfesstionVideo/ProfesstionVideo'
import {Match} from './Match/Match'
import StepNav from './StepNav/StepNav'
import FakeUi from './FakeUi/FakeUi'
import TestInput from './TestInput/TestInput'

import linesImg from '@/assets/lines.png'
import conversionBack from '@/assets/conversation-back.png'
import {rscLogoUrl, opGuideLogoUrl, taskDescLogoUrl} from "../../../assets/cdnUrlConfig"
import './Simulation.css'
import { url } from 'node:inspector'

const tysPrefix = "tys_sim_"
const userPrefix = "user1"
const pid = 1

const onPopState = (handler: any) => {
    window.onpopstate = handler
}

interface Props {
    stage: number
    step: number
    handleChangeStage: Function
    handleChangeType: Function
    handleChangeStep:Function
    type:string
}

// 由于存在顶部栏的任务跳转curStage与props中的stage不一定相等
interface State {
    curStage: number
    curStep: number
    data: any
    stageChange: number
}

export default class Simulation extends React.Component<Props, State> {
    inputData = {}
    constructor(props: any) {
        super(props)
        this.state = {
            curStage: this.props.stage,
            curStep: this.props.step,
            data: initData.stages[this.props.stage].steps
                ? initData.stages[this.props.stage].steps[this.props.step]
                : '',
            stageChange: 0
        }
        this.handleNext = this.handleNext.bind(this)
        this.handleChangeCurStage = this.handleChangeCurStage.bind(this)
        this.handleChangeStep = this.handleChangeStep.bind(this)
        this.handleSetInputData = this.handleSetInputData.bind(this)
        this.getInputData()
    }

    componentDidMount() {
        console.log(this.state)
        onPopState(() => {
            this.setState({
                curStep: this.state.curStep
            })
        })
    }

    getInputData() {
        let userSimInput = JSON.parse(localStorage.getItem(tysPrefix+userPrefix + "_" + pid.toString()))
        if (userSimInput !== null) {
            this.inputData = userSimInput["inputInfo"]
            // console.log("userSimInput" + JSON.stringify(userSimInput["inputInfo"]))
            // console.log("userSimInput" + JSON.stringify(this.inputData))
        }
    }

    handleSetInputData(stage:number, step:number, content) {
        let stageStr = this.state.curStage.toString()
        let stepStr = this.state.curStep.toString()
        let userSimInput = JSON.parse(localStorage.getItem(tysPrefix+userPrefix+ "_" + pid.toString()))

        let inputStageInfo = {}
        let inputStepInfo = {}
        inputStepInfo[stepStr] = content
        inputStageInfo[stageStr] = inputStepInfo

        if (userSimInput === null) {    
            userSimInput = {}
            userSimInput["inputInfo"] = {}
            userSimInput["inputInfo"][stageStr] = inputStepInfo
        } else {
            if(!userSimInput["inputInfo"].hasOwnProperty(stageStr)) {
                userSimInput["inputInfo"] = {}
                userSimInput["inputInfo"][stageStr] = inputStepInfo
            } else if (!userSimInput["inputInfo"][stageStr].hasOwnProperty(stepStr)) {
                userSimInput["inputInfo"][stageStr] = inputStepInfo
            } else {
                userSimInput["inputInfo"][stageStr][stepStr] = content
            }
        }
        
        this.inputData = userSimInput["inputInfo"]

        localStorage.setItem(tysPrefix+userPrefix+ "_" + pid.toString(), JSON.stringify(userSimInput))

    }

    isStepInputFilled(stage, step) {
        console.log("isStepInputFilled" + JSON.stringify(this.inputData))

        if (this.inputData.hasOwnProperty(stage.toString())) {
            if (this.inputData[stage.toString()].hasOwnProperty(step.toString())) {
                return true;
            }
        }
        return false
    }

    componentWillUnmount() {
        onPopState(null)
    }

    // fetch data

    // fetchContest = (contestId) => {
    //   pushState({ currentContestId: contestId }, `/contest/${contestId}`);
    //   api.fetchContest(contestId).then((contest) => {
    //     this.setState({
    //       currentContestId: contest._id,
    //       contests: {
    //         ...this.state.contests,
    //         [contest._id]: contest,
    //       },
    //     });
    //   });
    // };
    // fetchContestList = () => {
    //   pushState({ currentContestId: null }, "/");
    //   api.fetchContestList().then((contests) => {
    //     this.setState({
    //       currentContestId: null,
    //       contests,
    //     });
    //   });
    // };
    // fetchNames = (nameIds) => {
    //   if (nameIds.length === 0) {
    //     return;
    //   }
    //   api.fetchNames(nameIds).then((names) => {
    //     this.setState({
    //       names,
    //     });
    //   });
    // };

    setBackgroundImg = () => {
        let imgUrl = this.state.data.backgroundImg ? this.state.data.backgroundImg:"";

    }

    handleNext = () => {
        console.log(this.state)
        console.log('beforeNext: ', this.state.curStage, ' ', this.state.curStep)
        const cap = initData.stages[this.state.curStage].steps!.length
        if (this.state.curStep < cap - 1) {
            this.setState(() => ({
                curStep: this.state.curStep + 1,
                data: initData.stages[this.state.curStage].steps![this.state.curStep + 1],
                stageChange: 0
            }))

            if (this.state.curStep >= this.props.step) {
                this.props.handleChangeStep(this.props.step + 1)
            }
        } else if (this.state.curStage >= initData.stages.length-1) {
            console.log("over")
        } else {
            this.setState(() => ({
                curStage: this.state.curStage + 1,
                curStep: 0,
                data: initData.stages[this.state.curStage + 1].steps![0],
                stageChange: this.state.curStage >= this.props.stage ? 1 : 0
            }))

            if (this.state.curStage >= this.props.stage) {
                this.props.handleChangeStage(this.props.stage + 1)
                this.props.handleChangeStep(0)
            }
        }
    }

    handleChangeCurStage = (curStage) => {
        if (curStage <= this.props.stage) {
            this.setState({
                curStage: curStage,
                curStep: 0,
                data: initData.stages[curStage].steps ? initData.stages[curStage].steps[0] : '',
                stageChange: 0
            })
        }
    }

    handleChangeStep = (step) => {
        if (step < initData.stages[this.state.curStage].steps.length) {
            this.setState({
                data: initData.stages[this.state.curStage].steps[step],
                curStep: step
            })
        }
    }

    currentSimulationContent = () => {
        switch (this.state.data.type) {
            case 'conversation':
                return (
                    <Conversation
                        data={this.state.data.content.convo}
                        id={this.state.curStep}
                        handleNext={this.handleNext}
                    />
                )
            case 'match':
                return (
                    <div>
                        <DndProvider backend={HTML5Backend}>
                            <Match data={this.state.data} handleNext={this.handleNext} />
                        </DndProvider>
                    </div>
                )
            case 'why':
                return (
                    <div className="nihao">
                        <CollapBtn
                            name="是什么"
                            content="竞品调研是设计产品或产品功能前的必备步骤，通过对竞争对手的产品进行比较、分析和总结，了解市场情况并得出产品规划建议的过程。"
                        />
                        <CollapBtn
                            name="为什么"
                            content={
                                '-价值：了解竞争对手的产品和市场动态，取其精华，去其糟粕 \n-影响：为产品制定可行且优于竞品的方 \n-对接方：帮助研发和设计团队快速了解市场标准及目前已经被采用的方案，提升开发效率'
                            }
                        />
                        <div>
                            <button
                                onClick={this.handleNext}
                                type="submit"
                                className="btn btn-blue"
                                style={{ position: 'fixed', top: '85%', left: '70%' }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )
            case 'selection':
                return <Selection data={this.state.data} handleNext={this.handleNext} />
            case 'form':
                return (
                    <div>
                        <h2>{this.state.data.name}</h2>
                        <ComponentSheet data="" handleNext={this.handleNext} />
                        <div>
                            <button
                                onClick={this.handleNext}
                                type="submit"
                                className="btn btn-blue"
                                style={{ position: 'fixed', top: '85%', left: '70%' }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )
            case 'video': {
                let videoInfo: any
                let findedFlag = false
                for (let i = 1; i < initData.videos.length; i++) {
                    if (initData.videos[i].vid === this.state.data.vid) {
                        findedFlag = true
                        videoInfo = initData.videos[i]
                    }
                }
                if (findedFlag) {
                    return (
                        <div>
                            <Video videoInfo={videoInfo} />
                            <div>
                                <button
                                    onClick={this.handleNext}
                                    type="submit"
                                    className="btn btn-blue"
                                    style={{
                                        position: 'fixed',
                                        top: '90%',
                                        left: '88%',
                                        padding: '10px 100px'
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )
                } else {
                    return <div>视频资源未找到</div>
                }
            }
            case 'fakeui': {
                return (
                    <div>
                        <FakeUi data={this.state.data.content} />
                        <div>
                            <button
                                onClick={this.handleNext}
                                type="submit"
                                className="btn btn-blue"
                                style={{ position: 'fixed', top: '85%', left: '70%' }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )
            }

            default:
                return <div />
        }
    }

    currentContent = () => {
        switch (this.props.type) {
            case "simulation": {
                return (
                    <div className="main-container d-flex flex-row justify-content-between">
                        <div className="d-flex flex-column z-index-high">
                            <div className="mt-20 ml-40">
                                <PopUpBtn
                                    name="任务描述"
                                    content="分析理解需求，自我思考并与需求对接方沟通，明确需求的真实目的以及竞品分析的目标"
                                    stage={this.props.stage}
                                    data=""
                                    changeStage = {0}
                                    logoUrl = {taskDescLogoUrl}
                                />
                            </div>
                            <div className="mt-20 ml-40">
                                <PopUpBtn
                                    name="操作指引"
                                    content="操作-分析理解需求，自我思考并与需求对接方沟通，明确需求的真实目的以及竞品分析的目标"
                                    stage={this.props.stage}
                                    data=""
                                    changeStage = {0}
                                    logoUrl = {opGuideLogoUrl}
                                />
                            </div>
                            <div className="mt-20 ml-40">
                                <PopUpBtn
                                    name="资源库"
                                    content="资源库-分析理解需求，自我思考并与需求对接方沟通，明确需求的真实目的以及竞品分析的目标"
                                    stage={this.props.stage}
                                    data={initData.recources}
                                    changeStage = {this.state.stageChange}
                                    logoUrl = {rscLogoUrl}
                                />
                            </div>

                            <div className="mt-40 ml-20">
                                <StepNav
                                    stage={this.props.stage}
                                    curStage={this.state.curStage}
                                    curStep={this.state.curStep}
                                    step={this.props.step}
                                    stepInfo={initData.stages[this.state.curStage].steps}
                                    handleChangeStep={this.handleChangeStep}
                                />
                            </div>
                            <div className="side-container-240" />
                        </div>
                        <div className="flex-grow-1 z-index-mid"> {this.currentSimulationContent()}</div>
                    </div>
                )
            }
            case "professtionVideo": {
                return (
                    <div className="main-container">
                        <ProfesstionsVideos 
                            stage = {this.props.stage}
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
        console.log(initData)
        console.log('current: ', this.state.curStage, ' ', this.state.curStep)

        // TopBar 参数准备
        const stageStrs = []
        for (let i = 1; i < initData.stages.length; i++) {
            stageStrs.push(initData.stages[i].name)
        }

        // 背景图片获取
        let backStyle = {}
        if(this.props.type === "simulation"){
            backStyle = {
                background:`url("${linesImg}"),url("${this.state.data.backgroundImg ? this.state.data.backgroundImg:""}")`,
            }
        }
        // 背景图片获取
        return (
            <div className="Simulation z-index-lowest" 
                style={backStyle}
            >
                <div className="z-index-highest">
                    <TopBar 
                        stage = {this.props.stage}
                        stageStrs = {stageStrs} 
                        curStage = {this.state.curStage} 
                        handleChangeType={this.props.handleChangeType}
                        handleChangeCurStage={this.handleChangeCurStage}
                    />
                </div>

                {this.currentContent()}
            </div>
        )
    }
}
