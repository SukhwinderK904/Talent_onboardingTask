import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'
import axios from 'axios';

export default class AddNewCustomer extends Component {

  constructor(props) {
    super(props);
    this.state = { customerName: '', customerAddress: '', modalOpen: false };

    this.handleName = this.handleName.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    
    // Button handlers
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.addNewCustomer();
    this.handleClose();
  }

  // Name Text Handler
  handleName(event) {
    this.setState({ customerName: event.target.value });
  }

  // Address Text Handler
  handleAddress(event) {
    this.setState({ customerAddress: event.target.value });
  }

  // Modal Button Handler
  handleClose() {
    this.setState({ modalOpen: false, customerName: '', customerAddress: '' })
  }

  handleOpen() {
    this.setState({ modalOpen: true })
  }


  addNewCustomer = () => {
    axios.post("Customers/PostCustomer", {
      customerName: this.state.customerName,
      customerAddress: this.state.customerAddress
    })
      .then((result) => {
        //this.populateCustomersDetails();
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
        trigger={<Button primary>New Customer</Button>}>
          
        <Modal.Header>Add new customer</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Full Name</label>
                <input type="text" placeholder="Customer_Name" value={this.state.customerName}
                  onChange={this.handleName} />

              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input type="text" placeholder="Customer_Address" value={this.state.customerAddress}
                  onChange={this.handleAddress} />
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
            content="Create"
            icon='checkmark'
            labelPosition='right'
            onClick={this.handleSubmit}
            disabled={!this.state.customerName || !this.state.customerAddress}
            positive        
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
