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
  import ReactModal from "react-modal";
import '@/scss/style.scss'
import './ProfesstionVideo.scss'

interface Props {
    // professtionName:string
    // pid:number
    stage:number
    // handleChangeType: Function
    videoData:any
}

interface State {
    vid: number,
    showModal: boolean,
}

export default class ProfesstionVideo extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            vid: 1,
            showModal: false,
        }
        this.handleClickCover = this.handleClickCover.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
   }
    
    handleCloseModal() {
    this.setState({ showModal: false });
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
        this.handleOpenModal()
    }

    getModelContent() {
        let videoInfo:any;
        for(let i = 1; i < this.props.videoData.length; i++){
            if(this.state.vid === this.props.videoData[i].vid) {
                videoInfo = videoInfo = this.props.videoData[i] 
            }
        }
        let stageId = videoInfo.stage_id.toString()
        return(
            <div>
                <h1 className="video-title ">
                <span className="video-stageid mr-20">{stageId[1]?stageId:'0'+stageId}</span>
                    {videoInfo.name}
                </h1>
                <h3 className="video-introduction-title mt-10">简介</h3>
                <p className="mt-10 professionvideo-introduction-content">{videoInfo.introduction}</p>
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
            </div>
        )
    }

    render() {
        // 定位需要播放的视频,以及获得所有视频信息
        let videoList =[]
        for(let i = 1; i < this.props.videoData.length; i++){
            if (this.props.stage >= this.props.videoData[i].stage_id) {
                videoList.push(
                    <div>
                        <img className="video-cover mt-20 ml-40" src={this.props.videoData[i].cover_url} onClick ={()=>this.handleClickCover(this.props.videoData[i].vid)}/>
                        <h2 className="mt-10 ml-40">{this.props.videoData[i].stage_id}&nbsp;{this.props.videoData[i].name}</h2>
                        <h3 className="ml-40">已解锁</h3>
                    </div>
                )
            } else {
                videoList.push(
                    <div>
                        <img className="video-cover mt-10 ml-40" src={this.props.videoData[i].cover_url}/>
                        <h2 className="mt-10 ml-40">{this.props.videoData[i].stage_id}&nbsp;{this.props.videoData[i].name}</h2>
                        <h3 className="ml-40">未解锁</h3>
                    </div>
                )
            }
        }

        return(
        <div className="d-flex flex-column align-content-start">
            <h1>产品经理的视频</h1>

                <div className="d-flex flex-row  flex-wrap profession-video-list mt-80 ml-40">
                    <h2>模拟视频</h2>
                    {videoList}
                </div>
                

                <div className="d-flex flex-row profession-video-list mt-80 ml-40">
                    <h2>分享视频</h2>
                    {/* {videoList} */}
                </div>

            <ReactModal
                isOpen={this.state.showModal}
                contentLabel="onRequestClose Example"
                onRequestClose={this.handleCloseModal}
                className="Modal centered"
                overlayClassName="Overlay"
                > 
                {this.getModelContent()}
                <button className="btn btn-blue mt-40 btn-right"onClick={this.handleCloseModal}>关闭</button>
            </ReactModal>
        </div>)
    }
}