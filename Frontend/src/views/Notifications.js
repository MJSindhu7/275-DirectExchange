import React from 'react';
import NotificationSystem from 'react-notification-system';

export default class Notifications extends React.Component {
  notificationSystem = React.createRef();

  addNotification = event => {
    event.preventDefault();
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message: 'Notification message',
      level: 'success'
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.addNotification}>Add notification</button>
        <NotificationSystem ref={this.notificationSystem} />
      </div>
    );
  }
}