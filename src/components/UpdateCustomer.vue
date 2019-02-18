<template>
  <form class="mt-5 ml-2 mr-2" id="updateForm" v-if="action.update">
    <input type="text" name="name" class="form-control" placeholder="Name*" v-model="selectedCustomer.name">
    <input type="email" name="email" class="form-control" placeholder="Email*" v-model="selectedCustomer.email">
    <input type="text" name="age" class="form-control" placeholder="Age*" v-model="selectedCustomer.age">
    <button type="submit" class="btn btn-default btn-block mt-5" @click="submitUpdateCustomer(selectedCustomer)" :disabled="page.loading">Submit</button>         
  </form>
</template>

<script>
export default{
  name: 'UpdateCustomer',
  props: ['selectedCustomer', 'action', 'page'],
};
</script>