import React from 'react'
import PropTypes from 'prop-types'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './Simulation.css'
import initData from '../../../assets/product-manager.json'
import { Form } from './Form/Form'
import { StaticDisplay } from './StaticDisplay/StaticDisplay'
import CollapBtn from './CollapBtn/CollapBtn'
// import ComponentSheet from './Form/ComponentSheet'
import Conversation from './Conversation/Conversation'
import PopUpBtn from './PopUpBtn/PopUpBtn'
import { Selection } from './Selection/Selection'
import TopBar from './TopBar/TopBar'
import Video from './SimulationVideo/SimulationVideo'
import ProfesstionsVideos from './ProfesstionVideo/ProfesstionVideo'
import { Match } from './Match/Match'
import StepNav from './StepNav/StepNav'
import FakeUi from './FakeUi/FakeUi'
import { ScreenShot } from './ScreenShot/ScreenShot'
import TestInput from './TestInput/TestInput'
import UserFeedback from './UserFeedback/UserFeedback'

import linesImg from '@/assets/lines.png'
import {
    rscLogoUrl,
    opGuideLogoUrl,
    taskDescLogoUrl,
    rscLightLogoUrl,
    opGuideLightLogoUrl,
    taskDescLightLogoUrl
} from '../../../assets/cdnUrlConfig'
import EndPage from './EndPage/EndPage'

const tysPrefix = 'tys_sim_'
const userPrefix = 'user1'
const pid = 1

const onPopState = (handler: any) => {
    window.onpopstate = handler
}

interface Props {
    stage: number
    step: number
    handleChangeStage: Function
    handleChangeType: Function
    handleChangeStep: Function
    type: string
}

// 由于存在顶部栏的任务跳转curStage与props中的stage不一定相等
interface State {
    curStage: number
    curStep: number
    data: any
    stageChange: number
    swtichMap: any
    multiPageIndex: number
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
            swtichMap: {},
            multiPageIndex: 0
        }
        this.handleNext = this.handleNext.bind(this)
        this.handleChangeMultiPageIndex = this.handleChangeMultiPageIndex.bind(this)
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
        let userSimInput = JSON.parse(
            localStorage.getItem(tysPrefix + userPrefix + '_' + pid.toString())
        )
        if (userSimInput !== null) {
            this.inputData = userSimInput['inputInfo']
            // console.log("userSimInput" + JSON.stringify(userSimInput["inputInfo"]))
            // console.log("userSimInput" + JSON.stringify(this.inputData))
        }
    }

    handleSetInputData(stage: number, step: number, content) {
        let stageStr = this.state.curStage.toString()
        let stepStr = this.state.curStep.toString()
        let userSimInput = JSON.parse(
            localStorage.getItem(tysPrefix + userPrefix + '_' + pid.toString())
        )

        let inputStageInfo = {}
        let inputStepInfo = {}
        inputStepInfo[stepStr] = content
        inputStageInfo[stageStr] = inputStepInfo

        if (userSimInput === null) {
            userSimInput = {}
            userSimInput['inputInfo'] = {}
            userSimInput['inputInfo'][stageStr] = inputStepInfo
        } else {
            if (!userSimInput['inputInfo'].hasOwnProperty(stageStr)) {
                userSimInput['inputInfo'] = {}
                userSimInput['inputInfo'][stageStr] = inputStepInfo
            } else if (!userSimInput['inputInfo'][stageStr].hasOwnProperty(stepStr)) {
                userSimInput['inputInfo'][stageStr] = inputStepInfo
            } else {
                userSimInput['inputInfo'][stageStr][stepStr] = content
            }
        }

        this.inputData = userSimInput['inputInfo']

        localStorage.setItem(
            tysPrefix + userPrefix + '_' + pid.toString(),
            JSON.stringify(userSimInput)
        )
    }

    isStepInputFilled(stage, step) {
        console.log('isStepInputFilled' + JSON.stringify(this.inputData))

        if (this.inputData.hasOwnProperty(stage.toString())) {
            if (this.inputData[stage.toString()].hasOwnProperty(step.toString())) {
                return true
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

    // setBackgroundImg = () => {
    //     let imgUrl = this.state.data.backgroundImg ? this.state.data.backgroundImg:"";

    // }

    handleChangeMultiPageIndex = (isNext: boolean) => {
        if (isNext) {
            if (this.state.multiPageIndex >= this.state.data.content.length - 1) this.handleNext()
            else {
                this.setState({
                    multiPageIndex: this.state.multiPageIndex + 1
                })
            }
        } else {
            if (this.state.multiPageIndex > 0) {
                this.setState({
                    multiPageIndex: this.state.multiPageIndex - 1
                })
            }
        }
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
        } else if (this.state.curStage >= initData.stages.length - 1) {
            console.log('over')
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

    handleChangeCurStage = (curStage: number) => {
        if (curStage <= this.props.stage) {
            this.setState({
                curStage: curStage,
                curStep: 0,
                data: initData.stages[curStage].steps ? initData.stages[curStage].steps[0] : '',
                stageChange: 0
            })
        }
    }

    handleChangeStep = (step: number) => {
        if (step < initData.stages[this.state.curStage].steps.length) {
            this.setState({
                data: initData.stages[this.state.curStage].steps[step],
                curStep: step,
                stageChange: 0
            })
        }
    }

    handleSwtichNum = (swtichId: string, num: number) => {
        let swtichMapTemp = this.state.swtichMap
        swtichMapTemp[swtichId] = num
        this.setState({
            swtichMap: swtichMapTemp
        })
    }
    /* eslint-disable */
    parseSimulationContent = (templateData) => {
        let className = templateData.alignself ? templateData.alignself : ''
        let style = templateData.style ? templateData.style : {}
        className += templateData.marginTop ? templateData.marginTop : ''
        // className += " z-index-mid"
        switch (templateData.type) {
            case 'multiPage': {
                return (
                    <div>
                        {this.state.multiPageIndex < templateData.content.length
                            ? this.parseSimulationContent(
                                  templateData.content[this.state.multiPageIndex]
                              )
                            : ''}
                        <div>
                            {this.state.multiPageIndex > 0 ? (
                                <button
                                    onClick={() => {
                                        this.handleChangeMultiPageIndex(false)
                                    }}
                                    type="submit"
                                    className="btn btn-blue"
                                    style={{
                                        position: 'fixed',
                                        top: '85%',
                                        left: '60%',
                                        width: '130px'
                                    }}
                                >
                                    返回
                                </button>
                            ) : (
                                <div />
                            )}

                            <button
                                onClick={() => {
                                    this.handleChangeMultiPageIndex(true)
                                }}
                                type="submit"
                                className="btn btn-blue"
                                style={{
                                    position: 'fixed',
                                    top: '85%',
                                    left: '70%',
                                    width: '130px'
                                }}
                            >
                                {this.state.multiPageIndex >= this.state.data.content.length - 1
                                    ? '下一步'
                                    : '继续'}
                            </button>
                        </div>
                    </div>
                )
            }
            case 'combination': {
                className += ' d-flex'
                if (templateData.direction === 'row') {
                    className += ' flex-row'
                } else if (templateData.direction === 'column') {
                    className += ' flex-column'
                }

                let childContents = []
                for (let child of templateData.content) {
                    childContents.push(this.parseSimulationContent(child))
                    childContents.push(<div className="ml-40 mt-40" />)
                    // 此时state中已经存有对应swtich的状态
                    // 约定：如果是带有swtich的combination,只支持switch+对应数量的模板
                    if (child.type === 'switch') {
                        childContents.push(
                            this.parseSimulationContent(
                                templateData.content[this.state.swtichMap[child.identify]]
                            )
                        )
                        childContents.push(<div className="ml-40 mt-40" />)
                        break
                    }
                }
                return (
                    <div className={className} style={style}>
                        {childContents}
                    </div>
                )
            }
            case 'switch': {
                // 获得切换按钮
                let swtichBtns = []
                for (let i = 0; i < templateData.num; i++) {
                    swtichBtns.push(
                        <button
                            className={
                                this.state.swtichMap.hasOwnProperty(templateData.identify) &&
                                this.state.swtichMap[templateData.identify] == i + 1
                                    ? 'Simulation-swtichBtn-blue'
                                    : 'Simulation-swtichBtn-grey'
                            }
                            onClick={() => {
                                this.handleSwtichNum(templateData.identify, i + 1)
                            }}
                        >
                            {templateData.switchNames[i]}
                        </button>
                    )
                }
                // 设置state
                if (!this.state.swtichMap.hasOwnProperty(templateData.identify)) {
                    let swtichMapTemp = this.state.swtichMap
                    swtichMapTemp[templateData.identify] = 1
                    this.setState({
                        swtichMap: swtichMapTemp
                    })
                }

                return (
                    <div className={className} style={style}>
                        <div className="d-flex flex-column">
                            <h2 className="Simulation-switchTitle">
                                {templateData.title ? templateData.title : ''}
                            </h2>
                            <div className="d-flex">{swtichBtns}</div>
                        </div>
                    </div>
                )
            }
            case 'conversation':
                return (
                    <div className={className} style={style}>
                        <Conversation
                            data={templateData.content.convo}
                            id={this.state.curStep}
                            handleNext={this.handleNext}
                        />
                    </div>
                )
            case 'match':
                return (
                    <div className={className} style={style}>
                        <DndProvider backend={HTML5Backend}>
                            <Match data={templateData} handleNext={this.handleNext} />
                        </DndProvider>
                    </div>
                )
            case 'explain':
                // className+=" nihao"
                return (
                    <div className={className} style={style}>
                        <CollapBtn
                            name={'什么是' + this.state.data.content[0].name!}
                            content={this.state.data.content[0].content!}
                        />
                        <CollapBtn
                            name={'为什么要做' + this.state.data.content[1].name!}
                            content={this.state.data.content[1].content!}
                        />
                        <div>
                            <button
                                onClick={this.handleNext}
                                type="submit"
                                className="btn btn-blue"
                                style={{ position: 'fixed', top: '85%', left: '70%' }}
                            >
                                下一步
                            </button>
                        </div>
                    </div>
                )
            case 'selection': {
                return (
                    <div className={className} style={style}>
                        <Selection data={templateData} handleNext={this.handleNext} />
                    </div>
                )
            }
            case 'form':
                return (
                    <div className={className} style={style}>
                        <h2 className="SimulationHeader">{templateData.name}</h2>
                        <Form data={templateData} handleNext={this.handleNext} />
                        {/* <ComponentSheet data="" handleNext={this.handleNext} /> */}
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
                        <div className={className} style={style}>
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
                                    下一步
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
                    <div className={className} style={style}>
                        <FakeUi data={templateData.content} />
                        <button
                            onClick={this.handleNext}
                            type="submit"
                            className="btn btn-blue"
                            style={{ position: 'fixed', top: '85%', left: '70%' }}
                        >
                            下一步
                        </button>
                    </div>
                )
            }
            case 'screenshot': {
                return (
                    <div className={className} style={style}>
                        <ScreenShot data={templateData} handleNext={this.handleNext}/>
                    </div>
                )
            }
            case 'userFeedback': {
                // this.setBackgroundImg();
                return (
                    <div className={className} style={style}>
                        <UserFeedback data={this.state.data.content} handleNext={this.handleNext} />
                    </div>
                )
            }
            case 'finish': {
                return (
                    <div className={className} style={style}>
                        <EndPage data={this.state.data} handleNext={this.handleNext} />
                    </div>
                )
            }
            case 'staticDisplay': {
                return (
                    <div className={className} style={style}>
                        <StaticDisplay templateData={templateData} />
                    </div>
                )
            }
            default:
                return <div />
        }
    }
    /* eslint-enable */
    currentContent = () => {
        switch (this.props.type) {
            case 'simulation': {
                return (
                    <div className="main-container d-flex flex-row justify-content-between">
                        {(this.props.stage !== 6 || this.props.step !== 1) && ( // for not displaying side panel in the finish page
                            <div className="d-flex PopUpNavList flex-column z-index-high">
                                <div className="mt-20 ml-40">
                                    <PopUpBtn
                                        name="任务描述"
                                        content={this.state.data.taskDesc}
                                        stage={this.props.stage}
                                        data=""
                                        changeStage={0}
                                        logoUrl={taskDescLogoUrl}
                                        logoLightUrl={taskDescLightLogoUrl}
                                    />
                                </div>
                                <div className="mt-20 ml-40">
                                    <PopUpBtn
                                        name="操作指引"
                                        content={this.state.data.opGuide}
                                        stage={this.props.stage}
                                        data=""
                                        changeStage={0}
                                        logoUrl={opGuideLogoUrl}
                                        logoLightUrl={opGuideLightLogoUrl}
                                    />
                                </div>
                                <div className="mt-20 ml-40">
                                    <PopUpBtn
                                        name="资源库"
                                        content="资源库-分析理解需求，自我思考并与需求对接方沟通，明确需求的真实目的以及竞品分析的目标"
                                        stage={this.props.stage}
                                        data={initData.recources}
                                        changeStage={this.state.stageChange}
                                        logoUrl={rscLogoUrl}
                                        logoLightUrl={rscLightLogoUrl}
                                    />
                                </div>

                                <div className="mt-40 ml-20 Simulation-StepNav">
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
                        )}

                        <div className="z-index-mid d-flex">
                            {this.parseSimulationContent(this.state.data)}
                        </div>

                        <div className="PopUpNavList ml-20" />
                    </div>
                )
            }
            case 'professtionVideo': {
                return (
                    <div className="main-container">
                        <ProfesstionsVideos stage={this.props.stage} videoData={initData.videos} />
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
        if (this.props.type === 'simulation') {
            backStyle = {
                background: `url("${linesImg}"),url("${
                    this.state.data.backgroundImg ? this.state.data.backgroundImg : ''
                }")`
            }
        }
        // 背景图片获取
        return (
            <div className="Simulation z-index-lowest" style={backStyle}>
                <div className="z-index-highest">
                    <TopBar
                        stage={this.props.stage}
                        stageStrs={stageStrs}
                        curStage={this.state.curStage}
                        handleChangeType={this.props.handleChangeType}
                        handleChangeCurStage={this.handleChangeCurStage}
                    />
                </div>

                {this.currentContent()}
            </div>
        )
    }
}
