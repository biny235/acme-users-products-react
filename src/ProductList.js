import React from "react";
import store, { getProducts } from "./store";

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    store.dispatch(getProducts());
  }
  componentWillMount() {
    this.unsubscribe;
  }

  render() {
    const { products } = this.state;
    return (
      <ul>
        {products.map(product => <li key={product.id}>{product.name}</li>)}
      </ul>
    );
  }
}
