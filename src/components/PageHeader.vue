<template>
  <div class="header">
    <div/>
    <div>
      <a-popover
        v-model="visible"
        :title="$store.state.auth.user"
        trigger="click"
      >
        <a slot="content" @click="handleLogout">Log out</a>
        <a-avatar icon="user" class="dropdown" />
      </a-popover>
    </div>
  </div>
</template>

<script lang="ts">

import {mapActions} from "vuex";

export default {
  name: 'PageHeader',
  data() {
    return {
      visible: false
    };
  },
  methods: {
    ...mapActions('auth', ['logout']),
    handleLogout () {
      this.logout().then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
.header {
  display: grid;
  grid-template-columns: auto 10%;
  border-bottom: 1px solid gray;
  align-items: center;
  padding: 10px;
}

.ant-menu-horizontal {
  border-bottom: none;
}

.dropdown:hover {
  cursor: pointer;
}
</style>
