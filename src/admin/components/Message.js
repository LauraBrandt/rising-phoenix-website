import React from 'react';
import generalStyles from '../../styles/admin/generalStyles';
import Radium from 'radium';

let Message = (props) => {
  console.log('message rendering')
  return (
    <div style={generalStyles.message}>
      {props.message}
      <i 
        className="fa fa-times" 
        aria-hidden="true" 
        style={generalStyles.message.icon}
        onClick={props.closeMessage}
      ></i>
    </div>
  );
}
Message = Radium(Message);
  
export default Message;