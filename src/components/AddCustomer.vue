<template>
  <form class="mt-5 ml-2 mr-2" id="addForm" v-if="action.add">
    <input type="text" name="name" class="form-control" placeholder="Name*" v-model="addCustomer.name">
    <input type="email" name="email" class="form-control" placeholder="Email*" v-model="addCustomer.email">
    <input type="text" name="age" class="form-control" placeholder="Age*" v-model="addCustomer.age">
    <button type="submit" class="btn btn-default btn-block mt-5" @click="submitAddCustomer(customer)" :disabled="page.loading">Submit</button>     
  </form>
</template>

<script>
export default{
  name: 'AddCustomer',
  props: ['action', 'page'],
  data() {
    return {
      addCustomer: {}
    }
  }
};
</script>