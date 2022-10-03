import React, {Component} from 'react';
import CartOverlay from "../../components/CartOverlay";
import Header from "../../components/Header/Header";
import {AppContextType} from "../../context/appContext";
import './mainLayout.css';

export default class MainLayout extends Component
{
    constructor()
    {
        super();
        this.state = {
            overlayVisible: false,
            currencyMenuOpen: false,
        };
    }
    static contextType = AppContextType;
    toggleCartOverlay = () =>
    {
        this.setState((state) => ({
            overlayVisible: !state.overlayVisible
        }));
    };
    closeCartOverlay = () =>
    {
        this.setState((state) => ({
            overlayVisible: false
        }));
    };

    closeCurrencyMenu = () =>
    {
        if(this.context.currencyMenuOpen === true)
        {
            this.context.setCurrencyMenuOpen(false);
        }
        return;
    };
    render()
    {
        return (
            <div className="main" onClick={this.closeCurrencyMenu}>
                <Header
                    toggleOverlay={this.toggleCartOverlay}
                />
                <CartOverlay
                    isVisible={this.state.overlayVisible}
                    handleClick={this.closeCartOverlay}
                />
                <section className="main-content">
                    <div className="container">
                        {this.props.children}
                    </div>
                </section>
            </div>
        );
    }
}


