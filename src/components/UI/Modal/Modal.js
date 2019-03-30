import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    // return true or false
    return nextProps.show !== this.props.show 
      || nextProps.children !== this.props.children;
      // 第二个条件，为了让 spinner 能够显示
  }

  componentWillUpdate() {
    // console.log('[Modal] WillUpdate');
  }

  render () {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div 
          className={classes.Modal}
          style={{
            transform: this.props.show? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show? '1' : '0'
          }}
          >
          {this.props.children}
        </div>
      </Aux>
    );
  }
  
}

export default Modal;
