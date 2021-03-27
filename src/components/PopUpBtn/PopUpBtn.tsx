import React from "react";
import ReactModal from "react-modal";
import './PopUpBtn.css'

interface Props {
    name: string;
    content: string;
}

interface State {
    showModal: boolean;
}

export default class PopUpBtn extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <button className="btn btn-white" onClick={this.handleOpenModal}><p>{this.props.name}</p></button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="Modal centered"
          overlayClassName="Overlay"
        >
            <h2>{this.props.name}</h2>
          <p className="mt-20">{this.props.content}</p>
          <button className="btn btn-blue mt-40 btn-right"onClick={this.handleCloseModal}>明白了</button>
        </ReactModal>
      </div>
    );
  }
}