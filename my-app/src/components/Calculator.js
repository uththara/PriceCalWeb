import React, { Component, useState, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            productList: [],
            selected: {},
            selectAll: 0,
            price:0,
            cart:[]
        };
        this.toggleRow = this.toggleRow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
    }
    toggleRow = (product) => {

        if(!this.state.selected[product.productName]){
            console.log(product.productName);
            this.addToCart(product);
        }else{
            this.removeFromCart(product);
        }
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[product.productName] = !this.state.selected[product.productName];
        this.setState({
            selected: newSelected,
            selectAll: 2
        });
    }
    addToCart = (product) =>{
        console.log(product.productName);
        console.log(product.cartonPrice);
        console.log(product.unitsPerCarton);
        console.log(product.noOfUnits);

        const check = this.state.cart.some(item => product.productName === item.productName);
        console.log(check);
        if(!check){
            this.fetchProductPrice(product);
            const obj = {'product':product, 'noOfUnits':product.noOfUnits, 'price':this.state.price};
            this.state.cart.push(obj);
        }else{
            this.setState({cart: this.state.cart.filter(function(cart) {
                    return cart.product.productName !== product.productName
                })});
            this.fetchProductPrice(product);
            const obj = {'product':product, 'noOfUnits':product.noOfUnits, 'price':this.state.price};
            this.state.cart.push(obj);
        }
    }

    fetchProductPrice(product){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({product : {
                    productName:product.productName,
                    cartonPrice:product.cartonPrice,
                    unitsPerCarton:product.unitsPerCarton},
                noOfUnits:product.noOfUnits})
        }
        const apiUrl = 'http://localhost:8080/pricecalservice/getProductPrice';
         fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ price: data });
            });
    }

    removeFromCart = (product) =>{
        console.log("remove")
        const cart = this.state;
        const check = this.state.cart.some(item => product.productName === item.productName);
        console.log(check);
        if(!check){
            this.setState({cart: this.state.cart.filter(function(cart) {
                    return cart.product.productName !== product.productName
                })});
        }
    }


    toggleSelectAll() {
        let newSelected = {};

        if (this.state.selectAll === 0) {
            this.state.data.forEach(x => {
                newSelected[x.productName] = true;
            });
        }

        this.setState({
            selected: newSelected,
            selectAll: this.state.selectAll === 0 ? 1 : 0
        });
    }

    componentDidMount(){
        console.log("hello product");
        this.setState({isFetching: true})
        const apiUrl = 'http://localhost:8080/pricecalservice/productList';
        fetch(apiUrl)
            .then((response) => response.json())
            .then(productList => {
                this.setState({ productList: productList });
            });
    }

    handleChange(products,e) {
        // this.setState({price: e.target.value});
        console.log("onfocusout");
        console.log(e.target.value);
        console.log(products.productName);
        products.noOfUnits = e.target.value
        // this.addToCart(products);
    }
    handleClickAdd(id,e) {
        e.preventDefault();
        console.log("onclick"+id);
        // const data = new FormData(event.target);
        // console.log("On submit success::"+this['prodNameInput${id}'].value);
    }

    handleClickRemove(event){
        event.preventDefault();
        console.log("remove click");
        // const data = new FormData(event.target);
        console.log("On submit success::"+event.target.value);
    }

render() {

    const {isFetching,productList,cart} = this.state;


    console.log( this.state.productList);
    if(!isFetching){
        return(
            <div><h4>Loading</h4></div>
        );
    }else{
        return (
            <div>
                <div className="productList">
                    <h2>Products</h2>
                    {this.state.productList.map(( products, index ) => {
                        return (
                            <div className="innerClass">
                            <tr><td>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={this.state.selected[products.productName] === true}
                                    onChange={() => this.toggleRow(products)}
                                />
                            </td>
                            <td>
                                <div className="productName" >{products.productName}</div>
                            </td>
                                <td>
                                    <div>
                                        <form >
                                            <input type="text" name="quantity" placeholder="Enter no Of Units" />

                                            <button onClick={(e) => this.handleClickAdd(products,e)} >Add</button>
                                            <button onClick={this.handleClickRemove}>Remove</button>
                                        </form>
                                    </div>
                                </td>
                                <td>

                                </td>

                            </tr>
                            </div>
                        );
                    })}
                </div>
                <div className="calculator">
                    <h2>Calculator</h2>
                        <div>
                            <table>
                                <thead>
                                <tr>
                                    <td>Product</td>
                                    <td>Quantity</td>
                                    <td>Price</td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.cart.map(( cart, index ) => {
                                    return (
                                    <tr key={index}>
                                        <td>{cart.product.productName}</td>
                                        <td>{cart.noOfUnits}</td>
                                        <td>{cart.price}</td>
                                    </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    
            </div>
            </div>

    );
    }
}

}




export default Calculator;