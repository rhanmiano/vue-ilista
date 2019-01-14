<template>
  <div class="app-wrapper">
    <div class="row">
      <CustomerList :customers="customers" :page="page"/>
      
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

        <AddCustomer :action="action" :page="page"/>
        <UpdateCustomer :action="action" :page="page" @select-customer="$emit('displayCustomer', customer)" :selectedCustomer="selectedCustomer"/>
        <DeleteCustomer :customers="customers" :action="action" :page="page" />
      </section>
    </div>    
  </div>
</template>

<script>
import CustomerList from './CustomerList';
import AddCustomer from './AddCustomer';
import UpdateCustomer from './UpdateCustomer';
import DeleteCustomer from './DeleteCustomer';

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
      customers: [
        {id: 1, clickable: false, name: "John Doe", email: 'johndoe@sample.com', age: 30},
        {id: 2, clickable: false, name: "Joe Doe", email: 'joedoe@sample.com', age: 25},
        {id: 3, clickable: false, name: "Jack Doe", email: 'jackdoe@sample.com', age: 32},
        {id: 4, clickable: false, name: "Jill Doe", email: 'jilldoe@sample.com', age: 40},
        {id: 5, clickable: false, name: "James Doe", email: 'jamesdoe@sample.com', age: 31}
      ],
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
        loading: false
      },
      selectedCustomer: {}
    };
  },
  methods: {
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
      if(this.actions.update){
        this.selectedCustomer = customer;
      }
    } 

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