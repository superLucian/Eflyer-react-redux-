import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export default class ConfirmBox extends Component {
  static defaultProps = {
    size: 'lg',
    text: 'Are you sure?',
    yesLabel: 'Yes',
    noLabel: 'No'
  };

  render() {
    const { visible, size, text, onYes, onNo, yesLabel, noLabel, ...props } = this.props;
    return (
      <Modal className="confirm-box" show={visible} bsSize={size} backdrop="static" onHide={onNo} {...props}>
        <Modal.Body>
          <p>{text}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={onYes}>{yesLabel}</button>
          <button className="btn btn-default" onClick={onNo}>{noLabel}</button>
        </Modal.Footer>
      </Modal>
    );
  }
}
