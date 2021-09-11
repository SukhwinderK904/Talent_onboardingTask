import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'
import axios from 'axios';

export default class UpdateProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productID: this.props.details.productId,
      productName: this.props.details.productName,
      productPrice: this.props.details.productPrice,
      modalOpen: false
    };

    this.handleName = this.handleName.bind(this);
    this.handlePrice = this.handlePrice.bind(this);

    // Button handlers
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  // Name Text Handler
  handleName(event) {
    this.setState({ productName: event.target.value });
  }

  // Price Text Handler
  handlePrice(event) {
    this.setState({ productPrice: event.target.value });
  }

  // Modal Button Handler
  handleClose() {
    this.setState({ modalOpen: false })
  }

  handleOpen() {
    this.setState({ modalOpen: true })
  }

  handleSubmit(event) {
    this.updateProductDetails();
    this.handleClose();
  }

  updateProductDetails = () => {
    axios.put(`Products/PutProduct/${this.state.productID}`,{ productId: this.state.productID, productName: this.state.productName, productPrice: this.state.productPrice })
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
        <Modal.Header>Edit Product</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Product Name</label>
                <input type="text" value={this.state.productName}
                  onChange={this.handleName} />
              </Form.Field>
              <Form.Field>
                <label>price</label>
                <input type="text" value={this.state.productPrice}
                  onChange={this.handlePrice} />
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
            disabled={!this.state.productName || !this.state.productPrice}
            positive
          />
        </Modal.Actions>

      </Modal>
    )
  }
}
