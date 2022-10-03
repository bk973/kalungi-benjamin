import React, {Component} from 'react';

export const AppContextType = React.createContext();

export default class AppContextProvider extends Component
{
    constructor()
    {
        super();
        this.state = {
            currencyMenuOpen: false,
            cart: [],
            currency: {
                symbol: '$',
                label: 'USD'
            },
            activeAttributes: [],
            quantities: [],
        };
    }


    updateCart = (item) =>
    {


        const {cart, quantities} = this.state;

        if(cart.length !== 0 && quantities.length !== 0)
        {
            let filtered = cart.filter((p) => p.id === item.id);
            if(filtered.length !== 0)
            {
                let {id} = filtered[0];
                let filteredQuantities = quantities.filter((q) => q.pid === id);
                if(filteredQuantities.length !== 0)
                {
                    let {pid, quantity} = filteredQuantities[0];
                    let quantityNumber = quantity; // Preserve quantiy in variable
                    let indexOfItem = quantities.findIndex((q) => q.pid === pid);
                    quantities.splice(indexOfItem, 1); // delete previous data to allow override of quantity...

                    this.setState((state) => ({
                        quantities: [...state.quantities, {
                            pid: item.id,
                            quantity: quantityNumber + 1
                        }]
                    }));
                }
            } else
            {
                let q = {
                    pid: item.id,
                    quatity: 1
                };
                this.setState((state) => ({
                    quantities: [...state.quantities, q]
                }));
                this.setState((state) => ({
                    cart: [...state.cart, item]
                }));
            }
        } else
        {
            let q = {
                pid: item.id,
                quantity: 1
            };
            this.setState((state) => ({
                quantities: [...state.quantities, q]
            }));
            this.setState((state) => ({
                cart: [...state.cart, item]
            }));
        }

    };

    increaseQuatity = (id) =>
    {
        let {quantities} = this.state;
        let filteredQuantities = quantities.filter((q) => q.pid === id);
        if(filteredQuantities.length !== 0)
        {
            let {pid, quantity} = filteredQuantities[0];
            let quantityNumber = quantity; // Preserve quantiy in variable...
            let quantityId = pid; // preserver product id in variable...
            let indexOfItem = quantities.findIndex((q) => q.pid === pid);
            quantities.splice(indexOfItem, 1); // delete previous data to allow override of quantity...

            this.setState((state) => ({
                quantities: [...state.quantities, {
                    pid: quantityId,
                    quantity: quantityNumber + 1
                }]
            }));
        }
        return;
    };

    decreseQuatity = (id) =>
    {
        let {quantities, cart} = this.state;
        let filteredQuantities = quantities.filter((q) => q.pid === id);
        if(filteredQuantities.length !== 0)
        {
            let {pid, quantity} = filteredQuantities[0];

            if(quantity === 1)
            {
                let indexOfProduct = cart.findIndex((p) => p.id === pid);
                cart.splice(indexOfProduct, 1);
            }
            let quantityNumber = quantity; // Preserve quantiy in variable...
            let productId = pid; //preserver product id after deletion...
            let indexOfItem = quantities.findIndex((q) => q.pid === pid);
            quantities.splice(indexOfItem, 1); // delete previous data to allow override of quantity...


            this.setState((state) => ({
                quantities: [...state.quantities, {
                    pid: productId,
                    quantity: quantityNumber - 1
                }]
            }));
        }
    };

    updateAttributes = (id, name, value) =>
    {

        //check if an attribute exists and delete it...
        // then replace it with new values....
        const filteredAttributes = this.state.activeAttributes.filter((a) => a.name === name);

        if(filteredAttributes.length !== 0)
        {
            // If an existing attribute is found (with existing name);
            // delete it
            const indexOfAttribute = this.state.activeAttributes.findIndex((a) => a.name === name);
            this.state.activeAttributes.splice(indexOfAttribute, 1);

            //Replace with another attribute of different value...
            const newData = {
                pid: id,
                name: name,
                value: value
            };
            this.setState(state => ({
                activeAttributes: [...state.activeAttributes, newData]
            }));

        } else
        {
            const newData = {
                pid: id,
                name: name,
                value: value
            };
            this.setState(state => ({
                activeAttributes: [...state.activeAttributes, newData]
            }));
        }



    };

    updateCurrency = (item) =>
    {
        this.setState({
            currency: item
        });
    };

    setCurrencyMenuOpen = (value) =>
    {
        this.setState({
            currencyMenuOpen: value
        });
    };
    render()
    {
        return (
            <AppContextType.Provider value={{
                cart: this.state.cart,
                updateCart: this.updateCart,
                currency: this.state.currency,
                quantities: this.state.quantities,
                activeAttributes: this.state.activeAttributes,
                updateAttributes: this.updateAttributes,
                currencyMenuOpen: this.state.currencyMenuOpen,
                setCurrencyMenuOpen: this.setCurrencyMenuOpen,
                updateCurrency: this.updateCurrency,
                increaseQuatity: this.increaseQuatity,
                decreseQuatity: this.decreseQuatity
            }}>
                {this.props.children}
            </AppContextType.Provider>
        );
    }
}
