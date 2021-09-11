import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'
import axios from 'axios';

export default class AddNewStore extends Component {

  constructor(props) {
    super(props);
    this.state = { storeName: '', storeAddress: '', modalOpen: false };

    this.handleName = this.handleName.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    
    // Button handlers
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.addNewStore();
    this.handleClose();
  }

  // Name Text Handler
  handleName(event) {
    this.setState({ storeName: event.target.value });
  }

  // Address Text Handler
  handleAddress(event) {
    this.setState({ storeAddress: event.target.value });
  }

  // Modal Button Handler
  handleClose() {
    this.setState({ modalOpen: false, storeName: '', storeAddress: '' })
  }

  handleOpen() {
    this.setState({ modalOpen: true })
  }


  addNewStore = () => {
    axios.post("Stores/PostStore", {
      storeName: this.state.storeName,
      storeAddress: this.state.storeAddress
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
        trigger={<Button primary>New Store</Button>}>
          
        <Modal.Header>Add new store</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Full Name</label>
                <input type="text" placeholder="Store_Name" value={this.state.storeName}
                  onChange={this.handleName} />

              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input type="text" placeholder="Store_Address" value={this.state.storeAddress}
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
            disabled={!this.state.storeName || !this.state.storeAddress}
            positive        
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
