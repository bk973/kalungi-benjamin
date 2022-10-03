import React, {Component} from 'react';
import {AppContextType} from "../../context/appContext";
import './cartbutton.css';
export default class CartButton extends Component
{
    static contextType = AppContextType;
    render()
    {
        const {cart} = this.context;
        console.log(cart);
        return (
            <div className="cartbtn-wrapper">
                <span className={cart.length === 0 ? 'hidden' : 'badge'}>
                    {cart.length}
                </span>
                <button
                    onClick={this.props.toggleOverlay}
                    className="cartbtn-container"
                >
                    <span>
                        {this.props.toggleOverlay}
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                        </svg>
                    </span>
                </button>
            </div>

        );
    }
}
