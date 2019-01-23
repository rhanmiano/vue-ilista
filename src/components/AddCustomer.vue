<template>
  <form class="mt-5 ml-2 mr-2" id="addForm" v-if="action.add">
    <input type="text" name="name" class="form-control" placeholder="Name*" v-model="customerDetails.name">
    <input type="email" name="email" class="form-control" placeholder="Email*" v-model="customerDetails.email">
    <input type="text" name="age" class="form-control" placeholder="Age*" v-model="customerDetails.age">
    <button type="submit" class="btn btn-default btn-block mt-5" @click.prevent="emitAddCustomer()" :disabled="page.loading">Submit</button>     
  </form>
</template>

<script>
import axios from 'axios';

export default{
  name: 'AddCustomer',
  props: ['customerDetails', 'action', 'page'],
  methods: {
    emitAddCustomer(){
      this.$emit('add-customer', this.customerDetails);
    }
  }
};
</script>