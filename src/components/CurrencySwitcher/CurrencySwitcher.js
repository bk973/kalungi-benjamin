import React, {Component} from 'react';
import {gql} from "@apollo/client";
import client from "../../utils/apollo";
import {AppContextType} from "../../context/appContext";
import './currencyswitcer.css';


export default class CurrencySwitcher extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currencies: []
        };
    }
    static contextType = AppContextType;


    getCurrencies = () =>
    {
        client.query({
            query: gql`
                query Currencies{
  currencies{
  symbol,
  label
}
}
            `,
        }).then((value) =>
        {
            this.setState({
                currencies: value.data.currencies
            });
        });
    };

    componentDidMount()
    {
        this.getCurrencies();

    }
    setCurrency = (item) =>
    {
        this.context.updateCurrency(item);
        this.setState({
            currencyMenuOpen: true
        });

    };

    toggleMenu = () =>
    {
        this.context.setCurrencyMenuOpen(!this.context.currencyMenuOpen);
    };
    render()
    {
        console.log(this.context.currencyMenuOpen);
        const {currencies} = this.state;
        return (
            <div className="currency-switcher-container">
                <button
                    className="currency-switcher-btn"
                    onClick={this.toggleMenu}
                >
                    <span>
                        {this.context.currency.symbol}
                    </span>
                    <span className="carret">
                        {
                            this.context.currencyMenuOpen ?
                                (
                                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 3.5L4 0.5L7 3.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                ) :
                                (
                                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 0.5L4 3.5L7 0.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>


                                )
                        }
                    </span>
                </button>
                <div className={this.context.currencyMenuOpen ? 'currency-menu' : 'hidden'}>
                    {
                        currencies && currencies.map((currency, index) => (
                            <button
                                key={index}
                                className="currency-menu-item"
                                onClick={() => this.setCurrency({label: currency.label, symbol: currency.symbol})}
                            >
                                <span className="currency-symbol">
                                    {currency.symbol}
                                </span>
                                <span className="currency-label">
                                    {currency.label}
                                </span>
                            </button>
                        ))
                    }
                </div>
            </div>
        );
    }
}


