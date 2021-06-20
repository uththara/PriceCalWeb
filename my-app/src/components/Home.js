// import React from 'react';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            productList: []
        };
    }

    componentDidMount(){
        console.log("hello product");
        this.setState({isFetching: true})
        const apiUrl = 'http://localhost:8080/pricecalservice/getPriceList';
        fetch(apiUrl)
            .then((response) => response.json())
            .then(productList => {
                this.setState({ productList: productList });
            });
    }

    render() {
        const {isFetching,productList} = this.state;
        console.log("Render");
        console.log( this.state.productList);
        if(!isFetching){
            return(
                <div><h4>Loading</h4></div>
            );
        }else{
            return (
                <div>
                    <h2>Product Price List</h2>
                    {this.state.productList.map(( products, index ) => {
                        return (
                            <div className="product" key={index}>
                                <div className="prodTitle">{products.product.productName}</div>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <td>No of Units</td>
                                        <td className="amount">Prices</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {products.priceList.map(( price, index ) => {
                                        return (
                                            <tr key={index}>
                                                <td>{price.quantity}</td>
                                                <td>{price.amount}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                </div>
            );
        }

    };
}

async function getProductPriceList() {
    this.setState({isFetching: true})
    const apiUrl = 'http://localhost:8080/pricecalservice/productList';
    const response = await fetch(apiUrl);
    console.log(response.json());
    // fetch(apiUrl)
    //     .then((response) => response.json())
    //     .then((data) => console.log('This is your data', data))
    //     .then(findresponse => {
    //         this.setState({
    //             products: [findresponse]
    //         });
    //     }).catch(e => {
    //         console.log(e);
    //         this.setState({...this.state, isFetching: false});
    //     });
}
// function Home() {
//     getProductPriceList();
//     const  {products, isFetching} = this.state;
//     return (
//         <div>
//             <h2>Home</h2>
//         </div>
//     );
// }
export default Product;