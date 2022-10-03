import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {AppContextType} from "../../context/appContext";
import './cartOverlay.css';
export default class CartOverlay extends Component
{
    static contextType = AppContextType;
    render()
    {
        const {cart} = this.context;
        const {label} = this.context.currency;
        return (
            <div
                className={this.props.isVisible ? 'wrapper' : 'hidden'}
                onClick={this.props.handleClick}
            >
                <div className="overlay-content">
                    <h3>
                        {`My Bag: ${cart && cart.length} items`}
                    </h3>

                    <div className="overlay-products-list">
                        {
                            cart.map((p, i) => (
                                <div
                                    key={`${p.id}--${i}`}
                                    className="overlay-product"
                                >

                                    <div>
                                        <p>{p.brand}</p>
                                        <p>{p.name}</p>
                                        <div className="product-price">
                                            {p.prices.map((c, i) => (
                                                <p key={i}>
                                                    {
                                                        c.currency.label === label ?
                                                            (
                                                                <span>
                                                                    {`${c.currency.symbol} ${c.amount}`}
                                                                </span>
                                                            ) : null
                                                    }
                                                </p>
                                            ))}
                                        </div>
                                        <div className="attribute-list">
                                            {p.attributes.map((a, i) => (
                                                <div
                                                    key={`${a.name}--${i}`}
                                                    className="attribute-list-items"
                                                >
                                                    <h3>{a.name}</h3>
                                                    <div className="overlay-attribute-list-values">
                                                        {
                                                            a.items.map((item, i) => (
                                                                <div
                                                                    key={`${item.name}--${i}`}
                                                                    className="overlay-attr-list-value"
                                                                    style={{
                                                                        backgroundColor: a.name === 'Color' ? item.value : '#fff',
                                                                    }}
                                                                >
                                                                    {a.name === 'Color' ? '' : item.value}
                                                                </div>
                                                            ))
                                                        }
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            alt="product-thumbnail"
                                            src={p.gallery[0]}
                                            width="150"
                                            height="auto"
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="total-amount">
                        <span>
                            Total
                        </span>
                        <span className="flex-auto"></span>
                        <span>
                            99.99
                        </span>
                    </div>
                    <div className="overlay-btns">
                        <Link
                            to="/cart"
                            className=" viewbag-btn"
                        >
                            VIEW BAG
                        </Link>
                        <Link
                            to='/'
                            className=" checkout-btn"
                        >
                            CHECKOUT
                        </Link>
                    </div>

                </div>
            </div>
        );
    }
}
