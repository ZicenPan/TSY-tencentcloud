import React from 'react';
import QRCode from 'qrcode.react'

import '@/scss/style.scss'

import './EndPage.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

interface PageProps {
    data: any
    handleNext: () => void
}

class EndPage extends React.Component<PageProps, {}> {
    render() {
        return (
            <div className="finishingTextBox">
                <span className="bot" />
                <span className="top" />
                <div className="title">
                    恭喜！
                </div>
                <div className="subTitle">
                    你已成功完成 {this.props.data.job} 模拟！
                </div>
                <div className="qrcode">
                    <QRCode
                        value={this.props.data.qrcode}// 生成二维码的内容
                        size={120} // 二维码的大小
                        fgColor="#000000" // 二维码的颜色
                    />
                </div>
                <div className="content">
                    赶快扫码分享你的成就吧～
                </div>
                <div className="shareButton">
                    <button type="button" className="btn btn-primary">
                        查看全部分享视频
                    </button>
                </div>
            </div>
        );
    }
}

export default EndPage;
