<template>
  <div>
    <page-header />
    <book-list />
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import BookList from "./BookList.vue";

export default {
    name: 'BookPage',
    components: {
      PageHeader, BookList
    }
}
</script>
<style scoped>
.page-login {
  min-height: 100vh;
  background-color: gray;
  box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.15);
}
.page-login > div.ant-row-flex {
  min-height: 100vh;
}
.col-form {
  background-color: white;
  padding: 50px 20px;
  width: 340px;
  border-radius: 5%;
}
</style>
