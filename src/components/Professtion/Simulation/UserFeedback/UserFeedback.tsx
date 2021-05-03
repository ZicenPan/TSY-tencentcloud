import React from 'react';

import '@/scss/style.scss'

import './UserFeedback.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

interface PageProps {
    data: []
    handleNext: () => void
}

interface SubProps {
    data: {
        username: string
        comment: string
    }
}

class FeedbackPage extends React.Component<PageProps, {}> {
    render() {
        return (
            <div className="feedback-page" onClick={this.props.handleNext}>
                {this.props.data.map((item, index) => {
                    return (
                        <div id={"bubble"+index.toString()} key={index} >
                            <FeedbackBubble data={item} />
                        </div>
                    )
                })}
                <div className="mt-40">
                    <h4 className="text-grey-dark text-center">点击空白区域继续</h4>
                </div>
            </div>
        )
    }

}

class FeedbackBubble extends React.Component<SubProps, {}> {
    onClick = (e) => {
        e.stopPropagation();
    }

    render() {
        return (
            <div className="feedback-bubble">
                <button className="feedback-comment" onClick={this.onClick} >
                    {this.props.data.comment}
                </button>
                <div className="nameWrapper">
                    <button className="feedback-name" >
                        {this.props.data.username}
                    </button>
                </div>
            </div>
        )
    }
}

export default FeedbackPage;