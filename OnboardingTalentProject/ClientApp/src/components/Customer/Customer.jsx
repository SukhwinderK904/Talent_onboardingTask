import React, { Component } from 'react';
import axios from 'axios';
import { Table, Header } from 'semantic-ui-react';
import AddNewCustomer from './AddNewCustomer';
import UpdateCustomer from './UpdateCustomer';
import DeleteCustomer from './DeleteCustomer';

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {Customer: []};
    this.populateCustomersDetails = this.populateCustomersDetails.bind(this);
  }
  componentDidMount(){
    this.populateCustomersDetails();
  }
  populateCustomersDetails() 
  {
    axios.get("Customers/GetCustomer")
      .then((result) =>{
        console.log(result)
        this.setState({Customer: result.data})
      })
      .catch((error) => {
        console.log(error)
      });
  }
  render(){
    return (
      <div>
        <Header as = "h2">Customer Table</Header>
  
        <AddNewCustomer updateTable={this.populateCustomersDetails}/>
           <Table striped>
           <Table.Header>
             <Table.Row>
               <Table.HeaderCell>Customer_Id</Table.HeaderCell>
               <Table.HeaderCell>Customer_Name</Table.HeaderCell>
               <Table.HeaderCell>Customer_Address</Table.HeaderCell>
               <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
             </Table.Row>
           </Table.Header>

           <Table.Body>

             {
               this.state.Customer.map((customer) => {
               return (
                 <Table.Row key={customer.customerId}>
                   <Table.Cell>{customer.customerId}</Table.Cell>
                   <Table.Cell>{customer.customerName}</Table.Cell>
                   <Table.Cell>{customer.customerAddress}</Table.Cell>
                   <Table.Cell textAlign="center">
                   <UpdateCustomer details={customer} updateTable={this.populateCustomersDetails} />
                   <DeleteCustomer customerId ={customer.customerId} updateTable={this.populateCustomersDetails} />
                
                 </Table.Cell>
                 </Table.Row> 
               )

             })}
           </Table.Body>
         </Table >
       </div>
     );
   } }