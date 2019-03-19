import React, { Component } from 'react';
import { connect } from "react-redux";

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions'

// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7
// };

class BurgerBuilder extends Component{
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }
  state = {
    // ingredients: {
    //   salad:0,
    //   bacon:0,
    //   cheese:0,
    //   meat:0
    // },

    // ingredients: null,
    // totalPrice: 4,
    // 下面的都是UI State 没有必要使用Redux
    // purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    // axios.get('https://react-my-burger-42279.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({error: true});
    //   })
  }

  updatePurchaseState(ingredients){
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // this.setState({purchaseable: sum > 0});
    return sum > 0 ;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});  

  //   this.updatePurchaseState(updatedIngredients);
  // }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // alert('You continue!');
    // this.setState({loading: true});
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Max',
    //     address: {
    //       street: 'Teststreet 1',
    //       zipCode: '41351',
    //       country: 'Germany'
    //     },
    //     email: 'test@test.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }

    // // https://console.firebase.google.com/u/0/project/react-my-burger-42279/database/react-my-burger-42279/data
    // axios.post('/orders.json', order)
    //   .then(response => {
    //     this.setState( {loading: false, purchasing: false } );
    //   })
    //   .catch(error => {
    //     this.setState( {loading: false, purchasing: false} );
    //   });

    // this.props.history.push('/checkout');
    // const queryParams = [];
    // for (let i in this.state.ingredients){
    //   queryParams.push(encodeURIComponent(i) 
    //    + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + this.state.totalPrice);         
    // const queryString = queryParams.join('&');
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString
    // });
    // see Checkout.js, componentDidMount
    
    this.props.history.push('/checkout');
  }

  render () {
    const disabledInfo = {
      // ...this.state.ingredients
      ...this.props.ings
    };
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // {salad: true, meat: false, ...}
  
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner /> ;
    // if (this.state.ingredients) {
    if (this.props.ings) {
      burger = ( 
        <Aux>
          {/* <Burger ingredients = {this.state.ingredients} /> */}
          <Burger ingredients = {this.props.ings} />
          <BurgerControls 
            // ingredientAdded = {this.addIngredientHandler}
            // ingredientRemoved= {this.removeIngredientHandler}
            ingredientAdded = {this.props.onIngredientAdded}
            ingredientRemoved= {this.props.onIngredientRemoved}
            disabled = {disabledInfo}
            // purchaseable = {this.state.purchaseable}
            purchaseable = {this.updatePurchaseState(this.props.ings)}
            ordered = {this.purchaseHandler}
            // price = {this.state.totalPrice}
            price = {this.props.price}
          /> 
        </Aux>
      );

      orderSummary = <OrderSummary 
        // ingredients={this.state.ingredients} 
        ingredients={this.props.ings} 
        // price={this.state.totalPrice}
        price = {this.props.price}
        purchaseCanceled={this.purchaseCancelHandler} 
        purchaseContinued={this.purchaseContinueHandler} /> ;
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }   

    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
          >
          {orderSummary}
          {/* <OrderSummary 
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler} 
            purchaseContinued={this.purchaseContinueHandler}         
          /> */}
        </Modal> 
        {/* Burger */}
        {burger}
        {/* <Burger ingredients = {this.state.ingredients} />
        <BurgerControls 
          ingredientAdded = {this.addIngredientHandler}
          ingredientRemoved= {this.removeIngredientHandler}
          disabled = {disabledInfo}
          purchaseable = {this.state.purchaseable}
          ordered = {this.purchaseHandler}
          price = {this.state.totalPrice}
        /> */}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));