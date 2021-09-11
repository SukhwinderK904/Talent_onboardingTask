import React, { Component } from 'react';
import axios from 'axios';
import { Table, Header } from 'semantic-ui-react';
import moment from 'moment';
import AddNewSale from './AddNewSale';
import UpdateSale from './UpdateSale';
import DeleteSale from './DeleteSale';

export default class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = { sales: [], customerList: [], storeList: [], productList: [] };

    this.populateSalesDetails = this.populateSalesDetails.bind(this);
    this.getTableList = this.getTableList.bind(this);
  }

  componentDidMount() {
    this.populateSalesDetails();
    this.getTableList();

  }

  populateSalesDetails() {
    axios.get("Sales/GetSalesList")
      .then((result) => {
        this.setState({ sales: result.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getTableList() {
    axios.get("Customer/GetCustomerList")
      .then((result) => {
        this.setState({ customerList: result.data })
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get("Store/GetStoreList")
      .then((result) => {
        this.setState({ storeList: result.data })
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get("Product/GetProductList")
      .then((result) => {
        this.setState({ productList: result.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    // Initialize values for dropdown menus
    const customerList = this.state.customerList.map(c => ({ key: c.customerId, text: c.customerName, value: c.customerName }));
    const storeList = this.state.storeList.map(s => ({ key: s.storeId, text: s.storeName, value: s.storeName }));
    const productList = this.state.productList.map(p => ({ key: p.productId, text: p.productName, value: p.productName }));

    return (
      <div>
        <Header as='h2'>Sales Table</Header>

        <AddNewSale updateTable={this.populateSalesDetails} customerList={customerList} storeList={storeList} productList={productList} />

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Store</Table.HeaderCell>
              <Table.HeaderCell>Date Sold</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.sales.map((sale) => {
              return (
                <Table.Row key={sale.salesId}>
                  <Table.Cell>{sale.salesId}</Table.Cell>
                  <Table.Cell>{sale.customer.customerName}</Table.Cell>
                  <Table.Cell>{sale.product.productName}</Table.Cell>
                  <Table.Cell>{sale.store.storeName}</Table.Cell>
                  <Table.Cell>{moment(sale.dateSold).format("MMM Do YY")}</Table.Cell>
                  <Table.Cell textAlign="center">

                    <UpdateSale details={sale} updateTable={this.populateSalesDetails} customerList={customerList} storeList={storeList} productList={productList} />
                    <DeleteSale salesId={sale.salesId} updateTable={this.populateSalesDetails} />

                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table >
      </div>
    );
  }
}

