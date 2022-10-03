import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import CartButton from "../CartButton";
import client from "../../utils/apollo";
import {gql} from "@apollo/client";
import './header.css';
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import Logo from "../Logo";

export default class Header extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            categories: []
        };
    }
    componentDidMount()
    {
        client.query({
            query: gql`
       query GetCategories{
  categories {
    name,
  }
}
    `
        }).then(res =>
        {
            this.setState(() => ({categories: res.data.categories}));
        });
    }
    render()
    {

        const {categories} = this.state;
        return (
            <header className="header">
                <nav className="nav-menu">
                    {
                        categories && categories.map((k, i) => (
                            <NavLink key={i}
                                to={`/categories/${k.name}`}
                                className={({isActive}) => (isActive ? 'navlink-active' : 'navlink')}>
                                {k.name}
                            </NavLink>
                        ))
                    }

                </nav>

                <span className="logo">
                    <Logo />
                </span>

                <span className="flex-auto"></span>

                <div className="header-btns">
                    <span>
                        <CurrencySwitcher
                        />
                    </span>
                    <span>
                        <CartButton toggleOverlay={this.props.toggleOverlay} />
                    </span>
                </div>
            </header>
        );
    }
}
