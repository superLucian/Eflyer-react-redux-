import React, { Component } from 'react';
import { connect } from 'react-redux';

class Notification extends Component {

  render() {
    const { notifications } = this.props;
    if (!notifications.length) {
      return null;
    }
    const ntf = notifications[notifications.length - 1];
    return (
      <div className={'top-notification ' + ntf.type}>
        {ntf.text}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: _.get(state, 'notifications', [])
});

export default connect(mapStateToProps)(Notification);
