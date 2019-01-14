<template>
  <form class="mt-5 ml-2 mr-2" id="deleteForm" v-if="action.delete" ng-cloak>
    <select name="deleteCustomer" class="form-control" v-model="deleteCustomer.id" @change="checkValue(customer)">
      <option value="">Choose a customer</option>
      <option v-for="customer in customers" :key="customer.id" :value="customer.id" v-text="customer.name"></option>
    </select>
    <button type="submit" class="btn btn-default btn-block mt-5" @click="submitDeleteCustomer(customer.id)" :disabled="page.loading">Submit</button>  
  </form>
</template>

<script>
export default{
  name: 'DeleteCustomer',
  props: ['customers', 'action', 'page'],
  data() {
    return {
      deleteCustomer: {}
    }
  }
};
</script>