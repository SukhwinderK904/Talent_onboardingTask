import React, { Component } from 'react';
import axios from 'axios';
import {Table, Header} from 'semantic-ui-react';
import AddNewProduct from './AddNewProduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';


export default class Product extends Component{
  constructor(props){
    super(props);
    this.state = {Product: []};
    this.populateProductDetails = this.populateProductDetails.bind(this);
  
  }
  componentDidMount()
  {
    this.populateProductDetails();
  }
  populateProductDetails(){
    axios.get("Products/GetProduct")
    .then((result) =>{
      this.setState({Product: result.data})
    })
    .catch((error) => {
      console.log(error)
    });
  }
  render(){
    return (
      <div>
        <Header as = "h2"> Product Table </Header>
        <AddNewProduct updateTable = {this.populateProductDetails}/>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product_ID</Table.HeaderCell>
              <Table.HeaderCell>Product_Name</Table.HeaderCell>
              <Table.HeaderCell>Product_Price</Table.HeaderCell>
              <Table.HeaderCell textAlign = "center">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              this.state.Product.map((product) => {
                return(
                  <Table.Row key ={product.productId}>
                  <Table.Cell>{product.productId}</Table.Cell>
                  <Table.Cell>{product.productName}</Table.Cell>
                  <Table.Cell>{product.productPrice}</Table.Cell>
                  <Table.Cell textAlign = "center">
                  <UpdateProduct details={product} updateTable={this.populateProductDetails}/>
                  <DeleteProduct productId ={product.productId} updateTable={this.populateProductDetails} />

                  </Table.Cell>

                  </Table.Row>
                )
              }
              )}
          </Table.Body>
        </Table>
      </div>
    );
  }

}