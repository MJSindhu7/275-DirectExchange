import React, { Component } from "react";
import { Grid, Row, Col, Alert } from "react-bootstrap";

import {NotificationContainer, NotificationManager} from 'react-notifications';


export const createNotification = (type,msg) => {
    return () => {
      switch (type) {
        case 'info':
          console.log("heyy no")
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'fill-all-fields-error':
          NotificationManager.error('Please fill in all the fields.', 'Error', 5000);
          break;
      }
    };
  }
