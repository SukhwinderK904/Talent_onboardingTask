import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'
import axios from 'axios';

export default class UpdateStore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      storeID: this.props.details.storeId,
      storeName: this.props.details.storeName,
      storeAddress: this.props.details.storeAddress,
      modalOpen: false
    };

    this.handleName = this.handleName.bind(this);
    this.handleAddress = this.handleAddress.bind(this);

    // Button handlers
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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
    this.setState({ modalOpen: false })
  }

  handleOpen() {
    this.setState({ modalOpen: true })
  }

  handleSubmit(event) {
    this.updateStoreDetails();
    this.handleClose();
  }

  updateStoreDetails = () => {
    axios.put(`Stores/PutStore/${this.state.storeID}`,{ storeId: this.state.storeID, storeName: this.state.storeName, storeAddress: this.state.storeAddress })
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
        <Modal.Header>Edit Store</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Full Name</label>
                <input type="text" value={this.state.storeName}
                  onChange={this.handleName} />
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input type="text" value={this.state.storeAddress}
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
            content="Confirm"
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
