<template>
  <div class="app-wrapper">
    <div class="row">
      <CustomerList :customers="filtered" @select-customer="displayCustomer" @search-customer="getSearchString" :page="page" :action="action"/>
      
      <section class="app-actions col-md-4">
        <a class="btn btn-default btn-small" title="See github documentation" href="https://github.com/rhanmiano/iLista" rel="noopener" target="_blank" role="button">About</a>
        <h1 class="text-center mb-5">Vue - iLista</h1>
        <div class="btn-actions">
          <button class="btn btn-add btn-lg shadow-sm" @click="addCustomer()">ADD</button>
          <button class="btn btn-update btn-lg shadow-sm" @click="updateCustomer()">UPDATE</button>
          <button class="btn btn-delete btn-lg shadow-sm" @click="deleteCustomer()">DELETE</button>
        </div>

        <div class="message" role="alert" v-text="message.caption" :class="{'message-default': message.status == 'default', 'message-success': message.status == 'success', 'message-failed': message.status == 'failed'}">
        </div>

        <AddCustomer :action="action" @add-customer="submitAddCustomer" :customerDetails="customerDetails" :page="page"/>
        <UpdateCustomer :action="action" @update-customer="submitUpdateCustomer" :selectedCustomer="selectedCustomer" :page="page"/>
        <DeleteCustomer :customers="customers" @delete-customer="submitDeleteCustomer" :action="action" :page="page" />
      </section>
    </div>    
  </div>
</template>

<script>
import CustomerList from './CustomerList';
import AddCustomer from './AddCustomer';
import UpdateCustomer from './UpdateCustomer';
import DeleteCustomer from './DeleteCustomer';
import axios from 'axios';

export default {
  name: 'AppWrapper',
  components: {
    CustomerList,
    AddCustomer,
    UpdateCustomer,
    DeleteCustomer
  },
  data() {
    return {
      customers: [],
      action: {
        add: false,
        update: false,
        delete: false
      },
      message: {
        status: "default",
        caption: "Choose an action"     
      },
      page: {
        loading: true
      },
      selectedCustomer: {},
      customerDetails: {},
      searchString: "",

    };
  },
  computed: {
      filtered(){
        var self=this;
        return this.customers.filter(function(customer){
          return customer.name.toLowerCase().includes(self.searchString.toLowerCase())
        });
      } 
  },
  methods: {
    getSearchString(search){
      console.log(search);
      this.searchString = search;      
    },
    addCustomer() {
      this.action.add = true;
      this.action.update = false;
      this.action.delete = false;

      this.message.status = "default";
      this.message.caption = "Add a customer";

      this.customers.forEach(function(val){
        val.clickable = false;
      });
    },
    updateCustomer() {
      this.selectedCustomer = {};      
      this.action.update   = true;
      this.action.add      = false;
      this.action.delete   = false;

      this.message.status  = "default";
      this.message.caption = "Choose a customer to be updated";

      this.customers.forEach(function(val){
        val.clickable = true;
      });
    },
    deleteCustomer(){        
      this.action.delete  = true;
      this.action.add     = false;
      this.action.update  = false;

      this.message.status  = "default";
      this.message.caption = "Choose a customer to be deleted";

      this.customers.forEach(function(val){
        val.clickable = false;
      });
    },
    displayCustomer(customer){
      if(this.action.update){        
        this.selectedCustomer = JSON.parse(JSON.stringify(customer));
      }
    },
    submitAddCustomer(customer){
      this.message.status = 'default';        
      this.message.caption = 'Waiting for response...';

      if(!(Object.keys(customer).length === 0 && customer.constructor === Object)) {
        axios({
          method: 'post',
          url: 'http://ilista:5001/api/add/customer',
          data: JSON.stringify(customer),
          responseType: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => {
          let data = response.data;
          if(data.status == 'success') {
            this.page.loading    = true;
            this.customers       = [];
            this.message.status  = data.status;        
            this.message.caption = data.message;
            this.customerDetails = {};
            this.getCustomers('add');
          } else if (data.status == 'failed'){
            this.message.status  = data.status;
            this.message.caption = data.message;
            this.customerDetails = {};
            this.page.loading    = false;
          } 
        })
      } else {
        this.message.status = "failed";
        this.message.caption = "Required fields must not be empty";
        this.page.loading = false;
      }      
    },
    submitUpdateCustomer(customer){
      this.message.status = 'default';        
      this.message.caption = 'Waiting for response...';

      if(!(Object.keys(customer).length === 0 && customer.constructor === Object)) {
        axios({
          method: 'post',
          url: 'http://ilista:5001/api/update/customer/' + customer.id,
          data: JSON.stringify(customer),
          responseType: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => {
          let data = response.data;
          if(data.status == 'success') {
            this.page.loading    = true;
            this.customers       = [];
            this.message.status  = data.status;        
            this.message.caption = data.message;
            this.selectedCustomer = {};
            this.getCustomers('update');

          } else if (data.status == 'failed'){
            this.message.status  = data.status;
            this.message.caption = data.message;
            this.selectedCustomer = {};
            this.page.loading    = false;
          } 
        })
      } else {
        this.message.status = "failed";
        this.message.caption = "Required fields must not be empty";
        this.page.loading = false;
      }
    },
    submitDeleteCustomer(customerID){
      this.message.status = 'default';        
      this.message.caption = 'Waiting for response...';
      if(customerID) {
        axios({
          method: 'post',
          url: 'http://ilista:5001/api/delete/customer/' + customerID,
          responseType: 'json',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => {
          let data = response.data;
          if(data.status == 'success') {
            this.page.loading    = true;
            this.customers       = [];
            this.message.status  = data.status;        
            this.message.caption = data.message;
            this.selectedCustomer = {};
            this.getCustomers('delete');

          } else if (data.status == 'failed'){
            this.message.status  = data.status;
            this.message.caption = data.message;
            this.selectedCustomer = {};
            this.page.loading    = false;
          } 
        })
      } else {
        this.message.status = "failed";
        this.message.caption = "Required fields must not be empty";
        this.page.loading = false;
      }
    },
    getCustomers(action){
      axios({
        method: 'get',
        // url: 'https://www.rhanmiano.com/api/ilista/customers',
        url: 'http://ilista:5001/api/customers',
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        this.customers = response.data.customers;

        this.page.loading = this.customers.length === 0 ? true : false;

        if (action == 'update' && this.customers.length > 0) {
          this.customers.forEach(function(val){
            val.clickable = true;
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    }

  },
  created(){
    this.getCustomers();
  }
};
</script>

<style lang="scss">
//@import "/../assets/scss/vars";

.app-wrapper{
  background-color: $layout-white;
  color: $layout-contrast-black;
  
  .row > section {
    padding: 30px 30px;

    &.app-actions{
      background-color: $layout-base;
      color: $layout-white;
      height: 600px;
      
      a{
        font-size: .7em !important;        
        color: $layout-base;
        background-color: $denotive-disabled-white;
        margin-left: 5px;
        transition: background-color 200ms ease-in;
        &:hover{
          background-color: darken($denotive-disabled-white, 5%);
          text-decoration: none;
        } 
      } 
      .btn-actions {
        display: flex;
        -webkit-justify-content: center;
                justify-content: center;
        
        .btn {
          color: white;
          -webkit-flex-grow: 1;
                flex-grow: 1;
          margin: 0 5px;
          padding: -10px;
          font-size: .9em;
        }
        
        .btn-add {
          background-color: $denotive-green;
        }
        .btn-update {
          background-color: $denotive-orange;
        }
        .btn-delete {
          background-color: $denotive-red;
        }        
      }

      .message{
        margin: 10px 5px;
        padding: 10px 10px 10px 20px;
        border-radius: 2px;        
      }
      
      .message-default{
        background-color: $base-lighten-2;
      }

      .message-success{
        background-color: $message-success;
      }

      .message-failed{
        background-color: $message-failed;
      }

      form{
        input, select {
          margin-top: 30px;
          background-color: $layout-base;
          border: none;
          -webkit-border-radius: 0;
                  border-radius: 0;
          border-bottom: 1px solid white;
          color: white;
          
          &::-webkit-input-placeholder {
            color: $layout-white;
            opacity: .5;
          }
          &::placeholder {
            color: $layout-white;
            opacity: .5;
          }
        }

        option {
          background-color: $base-lighten-2;
        }
      }
    }
  }
}
</style>