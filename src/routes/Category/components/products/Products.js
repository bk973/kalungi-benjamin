import React, {Component} from 'react';
import {AppContextType} from "../../../../context/appContext";
import Item from "../Item";
import './products.css';

export default class Products extends Component
{
    static contextType = AppContextType;
    render()
    {
        const {products} = this.props;
        //console.log(Object.keys(products[0]));
        return (

            <div className="products-container">
                {
                    products && products.map((product, index) => (
                        <Item item={product} />
                    ))
                }
            </div>
        );
    }
}
