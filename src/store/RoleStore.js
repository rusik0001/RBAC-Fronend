import { reactive } from 'vue'

export const roleStore = reactive({
  roles: [],
  setRoles(roles){
    this.roles = roles;
  }
})
