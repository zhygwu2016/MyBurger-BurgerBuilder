import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  // state={
  //   ingredients: null,
  //   price: 0
  // }

  // componentWillMount () {
  //   const query = new URLSearchParams(this.props.location.search);
  //   // console.log(query);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     // ['salad', '1']
  //     if (param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ingredients: ingredients, price: price});
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
    // console.log(this.props.match.path);
  }

  render () {
    return (
      <div>
        <CheckoutSummary 
          // ingredients={this.state.ingredients} 
          ingredients={this.props.ings} 
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route 
          path={this.props.match.path + '/contact-data'} 
          component={ContactData} 
          // render = {(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
};

export default connect(mapStateToProps)(Checkout);

// If you only have mapDispatchToProps, you should write:
// export default connect(null, mapDispatchToProps)(Checkout);
// because mapDispatchToProps is always the second argument
