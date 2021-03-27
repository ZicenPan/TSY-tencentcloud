import React from 'react'
import PropTypes from 'prop-types'

import initData from './assets/product-manager.json'

import CollapBtn from './components/CollapBtn/CollapBtn'
import Conversation from './components/Conversation/Conversation'

import PopUpBtn from './components/PopUpBtn/PopUpBtn'
import TopBar from './components/TopBar/TopBar'

import Match from './components/Match/Match'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './App.css'
import './scss/style.scss'

const onPopState = (handler: any) => {
    window.onpopstate = handler
}

interface State {
    stage: number
    step: number
    cap: number
    data: any
}

export default class App extends React.Component<{}, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            stage: 1,
            step: 0,
            cap: initData.stages[1].steps!.length,
            data: initData.stages[1].steps ? initData.stages[1].steps[0] : ''
        }
        this.handleNext = this.handleNext.bind(this)
    }

    componentDidMount() {
        console.log(this.state)
        onPopState(() => {
            this.setState({
                step: this.state.step
            })
        })
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

    handleNext = () => {
        console.log(this.state)
        console.log('beforeNext: ', this.state.stage, ' ', this.state.step)
        if (this.state.step < this.state.cap - 1) {
            this.setState(() => ({
              step: this.state.step + 1,
                data: initData.stages[this.state.stage].steps![this.state.step + 1]
            }))
        } else {
            this.setState(() => ({
                stage: this.state.stage + 1,
                step: 0,
                cap: initData.stages[this.state.stage + 1].steps!.length,
                data: initData.stages[this.state.stage + 1].steps![0]
            }))
        }
    }

    currentContent = () => {
        switch (this.state.data.type) {
            case 'conversation':
                return (
                    <Conversation
                        data={this.state.data.content.convo}
                        id={this.state.step}
                        handleNext={this.handleNext}
                    />
                )
            case 'match':
                return (
                    <div>
                        <DndProvider backend={HTML5Backend}>
                            <Match />
                        </DndProvider>
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
            //   case "selection":
            //     return (
            //       <Selection data={this.state.data} handleNext={this.handleNext} />
            //     );
            //   case "form":
            //     return (
            //       <div>
            //         <ComponentSheet />
            //         <div>
            //           <button
            //             onClick={this.handleNext}
            //             type="submit"
            //             className="btn btn-blue"
            //             style={{ position: "fixed", top: "85%", left: "70%" }}
            //           >
            //             Next
            //           </button>
            //         </div>
            //       </div>
            //     );
            default:
                return <div />
        }
    }

    render() {
        console.log(initData)
        console.log('current: ', this.state.stage, ' ', this.state.step)
        return (
            <div className="App">
                <TopBar />
                <div className="main-container d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column">
                        <div className="mt-40 ml-40">
                            <PopUpBtn
                                name="任务描述"
                                content="分析理解需求，自我思考并与需求对接方沟通，明确需求的真实目的以及竞品分析的目标"
                            />
                        </div>
                        <div className="mt-40 ml-40">
                            <PopUpBtn
                                name="操作指引"
                                content="操作-分析理解需求，自我思考并与需求对接方沟通，明确需求的真实目的以及竞品分析的目标"
                            />
                        </div>
                        <div className="mt-40 ml-40">
                            <PopUpBtn
                                name="资源库"
                                content="资源库-分析理解需求，自我思考并与需求对接方沟通，明确需求的真实目的以及竞品分析的目标"
                            />
                        </div>
                        <div className="side-container-240" />
                    </div>
                    <div className="flex-grow-1"> {this.currentContent()}</div>
                    <div className="name">
                        <div className="side-container-240" />
                    </div>
                </div>
            </div>
        )
    }
}
