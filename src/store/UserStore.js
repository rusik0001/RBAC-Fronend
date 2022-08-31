import { reactive } from 'vue'

export const userStore = reactive({
  users: [],
  setUsers(users){
    this.users = users;
  }
})
