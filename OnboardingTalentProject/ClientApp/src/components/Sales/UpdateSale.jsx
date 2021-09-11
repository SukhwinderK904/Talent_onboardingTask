import React, { Component } from 'react';
import { Button, Modal, Form, Dropdown, Input } from 'semantic-ui-react'
import axios from 'axios';

export default class updateSale extends Component {

  constructor(props) {
    super(props);
    this.state = {
      salesID: this.props.details.id,
      modalOpen: false,
      customerId: this.props.details.customer.customerId,
      storeId: this.props.details.store.storeId,
      productId: this.props.details.product.productId,
      dateSold: this.props.details.dateSold
    };



    // Drop downbox handler     
    this.handleCustomer = this.handleCustomer.bind(this);
    this.handleStore = this.handleStore.bind(this);
    this.handleProduct = this.handleProduct.bind(this);
    this.handleDate = this.handleDate.bind(this);

    // Button handlers
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  // Customer Dropdown handler
  handleCustomer(event, data) {
    const { value } = data;
    const { key } = data.options.find(o => o.value === value);
    this.setState({ customerId: key });
  }

  // Store Dropdown handler
  handleStore(event, data) {
    const { value } = data;
    const { key } = data.options.find(o => o.value === value);
    this.setState({ storeId: key });
  }

  // Product Dropdown handler
  handleProduct(event, data) {
    const { value } = data;
    const { key } = data.options.find(o => o.value === value);
    this.setState({ productId: key });
  }

  // Date picker handler
  handleDate(event) {
    this.setState({ dateSold: event.target.value });
  }

  // Modal Button Handler
  handleClose() {
    this.setState({ modalOpen: false })
  }

  handleOpen() {
    this.setState({ modalOpen: true })
  }

  handleSubmit(event) {
    this.updateSale();
    this.handleClose();
  }

  updateSale = () => {
    axios.put(`Sales/PutSales/${this.state.salesID}`,
      {
        id: this.state.salesID,
        customerid: this.state.customerId,
        storeid: this.state.storeId,
        productid: this.state.productId,
        dateSold: this.state.dateSold
      })
      .then((result) => {
        this.props.updateTable();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    return (
      <Modal
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        open={this.state.modalOpen}
        size='tiny'
        trigger={<Button>Edit</Button>}
      >
        <Modal.Header>Edit Sale</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Form>

              <Form.Field>
                <label>Date sold</label>
                <Input type='date' placeholder='Select date' onChange={this.handleDate} value={this.state.dateSold} />
              </Form.Field>


              <Form.Field>
                <label>Customer</label>
                <Dropdown
                  placeholder='Select customer'
                  fluid
                  selection
                  options={this.props.customerList}
                  defaultValue={this.props.details.customer.customerName}
                  onChange={this.handleCustomer}

                />
              </Form.Field>

              <Form.Field>
                <label>Product</label>
                <Dropdown
                  placeholder='Select product'
                  fluid
                  selection
                  options={this.props.productList}
                  defaultValue={this.props.details.product.productName}
                  onChange={this.handleProduct}
                />
              </Form.Field>

              <Form.Field>
                <label>Store</label>
                <Dropdown
                  placeholder='Select store'
                  fluid
                  selection
                  options={this.props.storeList}
                  defaultValue={this.props.details.store.storeName}
                  onChange={this.handleStore}
                />
              </Form.Field>

            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={this.handleClose}>
            Close
        </Button>
          <Button
            type='submit'
            content="Confirm"
            icon='checkmark'
            labelPosition='right'
            onClick={this.handleSubmit}
            disabled={!this.state.dateSold}
            positive
          />
        </Modal.Actions>

      </Modal>
    )
  }
}
