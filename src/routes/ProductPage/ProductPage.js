import React, {Component} from 'react';
import withRouter from "../../utils/withRouter";
import client from "../../utils/apollo";
import {gql} from "@apollo/client";
import {AppContextType} from "../../context/appContext";
import './ProductPage.css';

class ProductPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            preview: '',
            product: {}
        };
    }
    static contextType = AppContextType;
    getProductById = () =>
    {
        client.query({
            variables: {
                id: this.props.id
            },
            query: gql`
                query ProductById($id: String!){
                    product(id: $id) {
        id        
name,
  brand,
  prices {
    amount,
    currency {
      symbol,
      label
    }
  }
  description,
  gallery,
  attributes {
    name,
    items {
      value
    }
  }

                    }
                }
            `,
        }).then((value) =>
        {
            this.setState({
                product: value.data.product
            });

            this.setState({
                preview: value.data.product.gallery[0]
            });
        });
    };

    componentDidMount()
    {
        this.getProductById();
    }

    changeThumbnail = (uri) =>
    {
        this.setState({
            preview: uri
        });
    };

    addToCart = (item) =>
    {
        this.context.updateCart(item);
    };
    render()
    {
        const {product} = this.state;
        const {name, brand, prices, attributes, description, currency, gallery} = product;
        const {label} = this.context.currency;
        const {activeAttributes, updateAttributes} = this.context;
        const filteredActiveAttributes = activeAttributes.filter((a) => a.pid === product.id);

        console.log('Active Attributes' + JSON.stringify(filteredActiveAttributes, null, 2));
        return (
            <div className="product-page-container">
                <div className="product-gallery">
                    <div className="product-gallery-list">
                        {
                            gallery && gallery.map((image, i) => (
                                <img
                                    alt="thumnail"
                                    key={i}
                                    src={image}
                                    className="product-thumbnails"
                                    onClick={() => this.changeThumbnail(image)}
                                />
                            ))
                        }
                    </div>
                    <div className="product-preview">
                        <img
                            alt="preview"
                            src={this.state.preview}
                            width="450"
                            height="450"
                            className="product-preview-image"
                        />
                    </div>
                </div>

                <div className="product-description">
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-name">{product.name}</div>
                    <div className="attribute-list">
                        {attributes && attributes.map((a, i) => (
                            <div
                                key={`${a.name}--${i}`}
                                className="attribute-list-items"
                            >
                                <h3>{a.name}</h3>
                                <div className="attribute-list-values">
                                    {
                                        a.items.map((item, i) => (
                                            <div
                                                key={`${item.name}--${i}`}
                                                className="attr-list-value"
                                                style={{
                                                    backgroundColor: a.name === 'Color' ? item.value : '#fff',
                                                    border: '2px solid #1D1F22'
                                                }}
                                                onClick={() => updateAttributes(product.id, a.name, item.value)}
                                            >
                                                {a.name === 'Color' ? '' : item.value}
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="product-price">
                        {prices && prices.map((p, i) => (
                            <p key={i}>
                                {
                                    p.currency.label === label ?
                                        (
                                            <span>
                                                {`${p.currency.symbol} ${p.amount}`}
                                            </span>
                                        ) : null
                                }
                            </p>
                        ))}
                    </div>

                    <button
                        className="add-to-cart-btn"
                        onClick={() => this.addToCart(this.state.product)}
                    >
                        ADD TO CART
                    </button>

                    <div className="product-description">
                        <p dangerouslySetInnerHTML={{__html: `${description}`}}>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(ProductPage);
