import React, {Component} from 'react';
import withRouter from "../../utils/withRouter";
import client from "../../utils/apollo";
import {gql} from "@apollo/client";
import './category.css';
import Products from "./components/products";

class Category extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      name: '',
      products: []
    };
  }


  getProducts = () =>
  {
    client.query({
      variables: {
        category_name: this.state.name
      },
      query: gql`
                query Category($category_name: String!){
  category(input: {title: $category_name }){
    name,
    products {
    id,
    name,
    brand,
    gallery,
     prices {
    amount,
    currency {
      symbol,
      label
    }
  }
    }
  }
}
            `,
    }).then((value) =>
    {
      this.setState({
        products: value.data.category.products
      });
    });
  };

  componentDidMount()
  {
    this.setState({
      name: this.props.name
    });
    this.getProducts();
  }

  /**REFETCH PRODUCTS WHEN ROUTE PARAM CHANGES... */
  componentDidUpdate(prevProps, prevState)
  {
    //console.log('updated');
    const {name} = this.props;
    if(prevProps.name !== name)
    {
      this.setState({name: name});
    }

    if(prevState.name !== this.state.name) this.getProducts();
  }
  render()
  {
    //console.log(this.state.products);
    return (
      <div className="category-container">
        <div>
          <h3 className="heading">
            {this.state.name}
          </h3>
        </div>
        <div className="products-wrapper">
          <Products products={this.state.products} />
        </div>
      </div>
    );
  }
}
export default withRouter(Category);
