import React, { Component } from 'react';
import { Button, Header, Modal, Form, Dropdown, Input } from 'semantic-ui-react'
import axios from 'axios';

export default class AddNewSale extends Component {

  constructor(props) {
    super(props);

    this.state = { customerId: '', storeId: '', productId: '', dateSold: '', modalOpen: false};

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

  handleDate(event) {
    this.setState({ dateSold: event.target.value });
  }

  // Modal Button Handler
  handleClose() {
    this.setState({
      storeId: '', productId: '', dateSold: '', modalOpen: false
    })
  }

  handleOpen() {
    this.setState({ modalOpen: true })
  }

  handleSubmit(event) {
    this.createSale();
    this.handleClose();
  }

  createNewSale = () => {
    axios.post("Sales/PostSales", {
      customerId: this.state.customerId,
      storeId: this.state.storeId,
      productId: this.state.productId,
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
        trigger={<Button primary>Create New Sale</Button>}>
        <Modal.Header>Create Sale</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Header>{this.state.productName} </Header>
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
            disabled={!this.state.customerId || !this.state.productId || !this.state.storeId || !this.state.dateSold}
            positive
          />
        </Modal.Actions>

      </Modal>
    )
  }
}


