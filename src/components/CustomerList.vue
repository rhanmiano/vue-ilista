<template>
  <section class="app-list col-md-8">
    <div class="row">            
      <header class="customer-header">
        <h2><i class="fas fa-user-circle fas-fw"></i>Customers</h2> 
      </header>        
    </div>
    <div class="row">
      <input type="text" name="search" class="form-control mb-5" ng-model="searchCustomer" placeholder="Search a customer">
    </div>
    <div class="row">            
      <div class="col-md-12">    
        <table class="table table-condensed">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
            </tr>
          </thead>                
          <tbody>
            <tr v-if="page.loading">
              <td colspan="4">
              <div class="ball-pulse">
                <div></div>
                <div></div>
                <div></div>
              </div>                    
              </td>
            </tr>
            <tr v-else v-bind:key="customer.id" v-for="customer in customers" v-bind:class="{'is-clickable': customer.clickable}" @click="$emit('select-customer', customer)">
              <td v-text="customer.id"></td>
              <td v-text="customer.name"></td>
              <td v-text="customer.email"></td>
              <td v-text="customer.age"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CustomerList',
  props: ['customers', 'page'],
}
</script>

<style lang="scss" scoped>

  .app-list{
    .row > .customer-header{
      width: 100%;
      margin-bottom: 25px;
      color: $layout-base;
      
      i.fas{
        font-size: 2.5 rem;
        margin-right: 10px;
      }        
    }
  }
</style>


