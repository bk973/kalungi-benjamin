import React, {Component} from 'react';
import {AppContextType} from "../../../../context/appContext";
import {Link} from "react-router-dom";

export default class Item extends Component
{
    constructor()
    {
        super();
        this.state = {
            isActive: false
        };
    }

    static contextType = AppContextType;

    setHover = (value) =>
    {
        console.log('hovered');
        this.setState({
            isActive: value
        });
    };

    render()
    {
        const {label} = this.context.currency;
        const {name, gallery, prices, inStock, id} = this.props.item;
        return (
            <div className={this.state.isActive ? 'item-wrap' : ''}
                onMouseOver={() => this.setHover(true)}
                onMouseOut={() => this.setHover(false)}
            >
                <Link
                    to={`/product/${id}`}
                    className="product"
                >
                    <img
                        alt={name}
                        src={gallery[0]}
                        width='356'
                        height='338'
                        className="product-picture"
                    />
                    <div className="item-name">{name}</div>
                    <div className="product-price">
                        {prices && prices.map((p, i) => (
                            <p key={i}>
                                {
                                    p.currency.label === label ?
                                        (
                                            <span className="item-price">
                                                {`${p.currency.symbol} ${p.amount}`}
                                            </span>
                                        ) : null
                                }
                            </p>
                        ))}
                    </div>
                </Link>
            </div>
        );
    }
}
