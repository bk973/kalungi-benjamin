import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {AppContextType} from "../../context/appContext";
import './CartPage.css';

export default class CartPage extends Component
{
    static contextType = AppContextType;
    render()
    {
        const {cart, quantities, increaseQuatity, decreseQuatity} = this.context;
        const {label} = this.context.currency;
        console.log('context' + JSON.stringify(this.context.currency, null, 2));
        return (
            <div className="cartpage-container">
                <h3>CART</h3>
                <div className="cart-products-list">
                    {
                        cart.map((p, i) => (
                            <div
                                key={`${p.id}--${i}`}
                                className="cart-product"
                            >

                                <div>
                                    <p style={{
                                        ontWeight: '600',
                                        fontSize: '30px',
                                        lineHeight: '27px',
                                    }}
                                    >{p.brand}</p>
                                    <p
                                        style={{
                                            fontWeight: '400',
                                            fontSize: '30px',
                                            lineHeight: '27px',
                                        }}
                                    >{p.name}</p>
                                    <div className="product-price">
                                        {p.prices.map((c, i) => (
                                            <p
                                                key={i}
                                                style={{
                                                    fontWeight: '700',
                                                    fontSize: '24px',
                                                    lineHeight: '30px'
                                                }}
                                            >
                                                {
                                                    c.currency.label === label ?
                                                        <span>
                                                            {`${c.currency.symbol} ${c.amount} `}
                                                        </span> :
                                                        null
                                                }
                                            </p>
                                        ))}
                                    </div>
                                    <div className="cart-attribute-list">
                                        {p.attributes.map((a, i) => (
                                            <div
                                                key={`${a.name}--${i}`}
                                                className="cart-attribute-list-items"
                                            >
                                                <h3 style={{
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {a.name}
                                                </h3>
                                                <div className="cart-attribute-list-values">
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
                                <span className="flex-auto"></span>
                                <div className="increment-decrement">
                                    <button
                                        className="mini-btn"
                                        onClick={() => increaseQuatity(p.id)}
                                    >
                                        +
                                    </button>
                                    <div>
                                        {
                                            quantities.map((q, index) =>
                                            {
                                                if(q.pid === p.id)
                                                {
                                                    return (
                                                        <span>
                                                            {q.quantity}
                                                        </span>
                                                    );
                                                }
                                                return null;

                                            })
                                        }
                                    </div>
                                    <button
                                        className="mini-btn"
                                        onClick={() => decreseQuatity(p.id)}>
                                        -
                                    </button>
                                </div>
                                <div>
                                    <img
                                        alt="product-thumbnail"
                                        src={p.gallery[0]}
                                        width="200"
                                        height="288"
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="total-amount">
                    <span
                        style={{
                            marginRight: '10px'
                        }}
                    >
                        Tax 21%
                    </span>
                    <span>
                        $42.00
                    </span>
                </div>
                <div className="total-amount">
                    <span
                        style={{
                            marginRight: '10px'
                        }}
                    >
                        Quantity
                    </span>
                    <span
                        style={{
                            marginRight: '10px'
                        }}
                    >
                        {cart.length}
                    </span>
                </div>
                <div className="total-amount">
                    <span style={{
                        marginRight: '10px'
                    }}>
                        Total
                    </span>
                    <span>
                        99.99
                    </span>
                </div>
                <div className="button-wrapper">
                    <Link
                        to='/'
                        className=" checkout-btn"
                    >
                        CHECKOUT
                    </Link>
                </div>
            </div>
        );
    }
}



