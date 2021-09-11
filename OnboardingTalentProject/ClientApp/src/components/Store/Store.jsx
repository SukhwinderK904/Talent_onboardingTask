import React, { Component } from 'react';
import axios from 'axios';
import { Table, Header } from 'semantic-ui-react';
import AddNewStore from './AddNewStore';
import UpdateStore from './UpdateStore';
import DeleteStore from './DeleteStore';


export default class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {Store: []};
    this.populateStoreDetails = this.populateStoreDetails.bind(this);
  }
  componentDidMount(){
    this.populateStoreDetails();
  }
  populateStoreDetails() 
  {
    axios.get("Stores/GetStore")
      .then((result) =>{
        this.setState({Store: result.data})
      })
      .catch((error) => {
        console.log(error)
      });
  }
  render(){
    return (
      <div>
        <Header as = "h2">Store Table</Header>
        <AddNewStore updateTable={this.populateStoreDetails}/>
  
           <Table striped>
           <Table.Header>
             <Table.Row>
               <Table.HeaderCell>Store_Id</Table.HeaderCell>
               <Table.HeaderCell>Store_Name</Table.HeaderCell>
               <Table.HeaderCell>Store_Address</Table.HeaderCell>
               <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
             </Table.Row>
           </Table.Header>

           <Table.Body>

             {
               this.state.Store.map((store) => {
               return (
                 <Table.Row key={store.storeId}>
                   <Table.Cell>{store.storeId}</Table.Cell>
                   <Table.Cell>{store.storeName}</Table.Cell>
                   <Table.Cell>{store.storeAddress}</Table.Cell>
                   <Table.Cell textAlign="center">
                   <UpdateStore details={store} updateTable={this.populateStoreDetails} />
                   <DeleteStore storeId ={store.storeId} updateTable={this.populateStoreDetails} />
                  
                 </Table.Cell>
                 </Table.Row> 

               )

             })}
           </Table.Body>
         </Table >
       </div>
     );
   } }