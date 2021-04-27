import React from 'react'
import PropTypes from 'prop-types'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import initData from '../../../assets/product-manager.json'
import { Form } from './Form/Form'
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
    swtichMap: any
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
            stageChange: 0,
            swtichMap:{}
        }
        this.handleNext = this.handleNext.bind(this)
        this.handleChangeCurStage = this.handleChangeCurStage.bind(this)
        this.handleChangeStep = this.handleChangeStep.bind(this)
        this.handleSetInputData = this.handleSetInputData.bind(this)
        this.handleSwtichNum = this.handleSwtichNum.bind(this)

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

    handleChangeCurStage = (curStage:number) => {
        if (curStage <= this.props.stage) {
            this.setState({
                curStage: curStage,
                curStep: 0,
                data: initData.stages[curStage].steps ? initData.stages[curStage].steps[0] : '',
                stageChange: 0
            })
        }
    }

    handleChangeStep = (step:number) => {
        if (step < initData.stages[this.state.curStage].steps.length) {
            this.setState({
                data: initData.stages[this.state.curStage].steps[step],
                curStep: step
            })
        }
    }

    handleSwtichNum = (swtichId:string, num:number) => {
        let swtichMapTemp = this.state.swtichMap
        swtichMapTemp[swtichId] = num
        this.setState({
            swtichMap:swtichMapTemp
        })
    }

    parseSimulationContent = (templateData) => {
        let className = templateData.alignself?templateData.alignself:"";

        // className += " z-index-mid"
        switch (templateData.type) {
            case "combination": {
                className += " d-flex";
                if (templateData.direction === "row") {
                    className += " flex-row"
                } else if (templateData.direction === "column") {
                    className += " flex-column"
                }

                let childContents = []
                for(let child of templateData.content) {
                    childContents.push(this.parseSimulationContent(child))
                    childContents.push(<div className="ml-40 mt-40"/>)
                    // 此时state中已经存有对应swtich的状态
                    // 约定：如果是带有swtich的combination,只支持switch+对应数量的模板
                    if (child.type === "switch") {
                        childContents.push(this.parseSimulationContent(templateData.content[this.state.swtichMap[child.identify]]))
                        childContents.push(<div className="ml-40 mt-40"/>)
                        break
                    }
                    
                }
                return (
                    <div className={className}> 
                        {childContents}
                    </div>
                )
            }
            case 'switch': {
                // 获得切换按钮
                let swtichBtns = []
                for(let i = 0; i < templateData.num; i++) {
                    swtichBtns.push(
                        <button className="btn btn-white" onClick={()=>{this.handleSwtichNum(templateData.identify, i+1)}}>{templateData.switchNames[i]}</button>
                    )
                }
                // 设置state
                if (!this.state.swtichMap.hasOwnProperty(templateData.identify)) {
                    let swtichMapTemp = this.state.swtichMap
                    swtichMapTemp[templateData.identify] = 1
                    this.setState({
                        swtichMap:swtichMapTemp
                    })
                }

                return(
                    <div className={className}>
                        <span>{swtichBtns}</span>
                    </div>
                )
            }
            case 'conversation':
                return (
                    <div className={className}>
                        <Conversation
                            data={templateData.content.convo}
                            id={this.state.curStep}
                            handleNext={this.handleNext}
                        />
                    </div>
                )
            case 'match':
                return (
                    <div className={className}>
                        <DndProvider backend={HTML5Backend}>
                            <Match data={templateData} handleNext={this.handleNext} />
                        </DndProvider>
                    </div>
                )
            case 'explain':
                // className+=" nihao"
                return (
                    
                    <div className={className}>
                        <CollapBtn
                            name={this.state.data.content[0].name!+"是什么"}
                            content={this.state.data.content[0].content!}
                        />
                        <CollapBtn
                            name={this.state.data.content[1].name!+"为什么"}
                            content={this.state.data.content[1].content!}
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
            case 'selection': {
                return (
                    <div className={className}>
                        <Selection data={templateData} handleNext={this.handleNext} />
                    </div>
                )
            }
            case 'form':
                return (
                    <div className={className}>
                        <h2>{templateData.name}</h2>
                        <Form data={templateData} handleNext={this.handleNext} />
                        {/* <ComponentSheet data="" handleNext={this.handleNext} /> */}
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
                    if (initData.videos[i].vid === templateData.vid) {
                        findedFlag = true
                        videoInfo = initData.videos[i]
                    }
                }
                if (findedFlag) {
                    return (
                        <div className={className}>
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
                    <div className={className}>
                        <FakeUi data={templateData.content} />
                        <button
                            onClick={this.handleNext}
                            type="submit"
                            className="btn btn-blue"
                            style={{ position: 'fixed', top: '85%', left: '70%' }}
                        >
                            Next
                        </button>
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
                        <div className="d-flex PopUpNavList flex-column z-index-high">
                            <div className="mt-20 ml-40">
                                <PopUpBtn
                                    name="任务描述"
                                    content={this.state.data.taskDesc}
                                    stage={this.props.stage}
                                    data=""
                                    changeStage = {0}
                                    logoUrl = {taskDescLogoUrl}
                                />
                            </div>
                            <div className="mt-20 ml-40">
                                <PopUpBtn
                                    name="操作指引"
                                    content={this.state.data.opGuide}
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

                        <div className="z-index-mid d-flex">
                            {this.parseSimulationContent(this.state.data)}
                        </div>
                        
                        <div className="PopUpNavList ml-20" />
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
