<template>
  <form class="mt-5 ml-2 mr-2" id="deleteForm" v-if="action.delete" v-cloak>
    <select name="deleteCustomer" :value="selectedID" @change="changeSelectedId($event.target.value)" class="form-control">
      <option value="">Choose a customer</option>
      <option v-for="customer in customers" :key="customer.id" :value="customer.id" v-text="customer.name"></option>
    </select>
    <button type="submit" class="btn btn-default btn-block mt-5" @click.prevent="emitDeleteCustomer()" :disabled="page.loading">Submit</button>  
  </form>
</template>

<script>
export default{
  name: 'DeleteCustomer',
  props: ['customers', 'action', 'page'],
  data() {
    return {
      selectedID: ""
    };
  },
  methods: {  
    changeSelectedId(id){
      this.selectedID = id;
    },  
    emitDeleteCustomer(){
      this.$emit('delete-customer', this.selectedID);
      this.selectedID = "";
    }
  }
};
</script>