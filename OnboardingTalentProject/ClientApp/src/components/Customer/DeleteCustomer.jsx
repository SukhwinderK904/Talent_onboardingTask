import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'
import axios from 'axios';

export default class DeleteCustomer extends Component {

  constructor(props) {
    super(props);
    this.state = { customerId: this.props.customerId, modalOpen: false };

    // Button handlers
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.deleteCustomer();
    this.handleClose();
  }

  // Modal Button Handler
  handleClose() {
    this.setState({ modalOpen: false })
  }

  handleOpen() {
    this.setState({ modalOpen: true })
  }

  deleteCustomer = () => {
    axios.delete(`Customers/DeleteCustomer/${this.state.customerId}`)
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
        size='mini'
        trigger={<Button>Delete</Button>}
      >
        <Modal.Header>Delete Customer</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <p>Are you sure you want to delete this record?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handleClose}>
            No
        </Button>
          <Button
            type='submit'
            onClick={this.handleSubmit}
            color='green'
            content="Yes"
          />
        </Modal.Actions>

      </Modal>
    )
  }
}