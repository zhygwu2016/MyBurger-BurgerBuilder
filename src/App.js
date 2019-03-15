import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  // For test
  // state={
  //   show: true
  // };
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({show: false});
  //   }, 5000);
  // }

  render() {
    return (
      <div>
        <Layout>
          {/* <BurgerBuilder /> */}
          {/* { this.state.show? <BurgerBuilder /> : null } */}
          {/* <Checkout /> */}
          
          {/* Wrap them with Switch so only load one of these routes, */}
          {/* the first one, which matches a path , the given path */}
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />       
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
