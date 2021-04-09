import React from 'react'
import {
    Player,
    BigPlayButton,
    ControlBar,
    PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
    ReplayControl, // 后退按钮
    ForwardControl,  // 前进按钮
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,  // 倍速播放选项
    VolumeMenuButton
  } from 'video-react';

import '@/scss/style.scss'
import './ProfesstionVideo.scss'

interface Props {
    professtionName:string
    pid:number
    stage:number
    handleChangeType: Function
    videoData:any
}

interface State {
    vid: number,
}

export default class ProfesstionVideo extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            vid: 1
        }
        this.handleClickCover = this.handleClickCover.bind(this)
    }

    handleClickCover(vid) {
        for(let i = 1; i < this.props.videoData.length; i++){
            let stage_id = -1;
            if(vid === this.props.videoData[i].vid) {
                stage_id = this.props.videoData[i].stage_id;
            }
            if (stage_id > 0 && stage_id <= this.props.stage) {
                this.setState({
                    vid: vid
                })
            }
        }
        console.log("handleClickCover"+vid)
    }

    render() {
        // 定位需要播放的视频,以及获得所有视频信息
        let videoInfo:any;
        let videoList =[]
        for(let i = 1; i < this.props.videoData.length; i++){
            if(this.state.vid === this.props.videoData[i].vid) {
                videoInfo = this.props.videoData[i]
            }

            if (this.props.stage >= this.props.videoData[i].stage_id) {
                videoList.push(
                    <div>
                        <img className="video-cover mt-20" src={this.props.videoData[i].cover_url} onClick ={()=>this.handleClickCover(this.props.videoData[i].vid)}/>
                        <h2 className="mt-10">{this.props.videoData[i].stage_id}&nbsp;{this.props.videoData[i].name}</h2>
                        <h3>已解锁</h3>
                    </div>
                )
            } else {
                videoList.push(
                    <div>
                        <img className="video-cover mt-10" src={this.props.videoData[i].cover_url}/>
                        <h2 className="mt-10">{this.props.videoData[i].stage_id}&nbsp;{this.props.videoData[i].name}</h2>
                        <h3>未解锁</h3>
                    </div>
                )
            }
        }

        return(
        <div className="d-flex flex-column">
            <button className="btn btn-blue" onClick={()=>{this.props.handleChangeType("sketch")}}>个人中心</button>

            <div className="profession-video-sketch ml-40">
                <h1 className="text-center mt-40">{videoInfo.name}</h1>
                <h3 className="video-introduction">简介</h3>
                <p className="mt-10 ">{videoInfo.introduction}</p>
            </div>
            <div className="d-flex flex-row ml-40">
                {/* 播放界面 */}
                <div id = "profession-play">
                    <Player
                        playsInline
                        poster={videoInfo.cover_url}
                        src={videoInfo.src_url}
                    >
                        <BigPlayButton position="center"/>
                        <ControlBar autoHide={false} disableDefaultControls={false}>   
                            <ReplayControl seconds={10} order={1.1} />
                            <ForwardControl seconds={30} order={1.2} />
                            <PlayToggle />
                            <CurrentTimeDisplay order={4.1} />
                            <TimeDivider order={4.2} />
                            <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
                            <VolumeMenuButton />
                        </ControlBar>
                    </Player>
                </div>
                {/* 侧边栏 */}
                <div className="d-flex flex-column ml-40 profession-video-list">
                    {videoList}
                </div>
            </div>

            <div className="d-flex flex-row">
                <button id="professtion-video-buy" className="btn btn-blue ml-40 mt-20" >购买视频</button>
                <button id="professtion-video-simulation" className="btn btn-blue ml-800 mt-20" onClick={()=>{this.props.handleChangeType("simulation")}}>产品经理模拟</button>
            </div>
        </div>)
    }
}