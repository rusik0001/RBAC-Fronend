<template>
  <div class="q-pa-md">

    <q-form
      @submit="onSubmit"
      class="q-gutter-lg"
    >
      <q-input
        filled
        v-model="name"
        label="Role Name"
        hint="name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type a role name']"
      />
        <div class="q-pa-md">
          <div class="q-gutter-md row items-start">
            <q-select
              filled
              v-model="rolemodel"
              multiple
              :options="options"
              counter
              hint="Permissions"
              style="width: 250px"

            ></q-select>
          </div>
        </div>

        <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn flat label="Cancel" v-close-popup="popupSwitch" @click="togglePopupSwitch"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { roleStore } from "src/store/RoleStore";
import { permissionStore } from "src/store/PermissionStore";

export default defineComponent({
    name: "RoleCreateForm",
    setup(){
      const name = ref();
      const popupSwitch = ref(false)
      const rolemodel = ref(null)
      const options = permissionStore.permissions.map((permission)=> permission.name)

      const onSubmit = () => {
        let selectedRoleIds = []

        rolemodel.value.forEach((selectedRole)=>{
          selectedRoleIds.concat(getRoleIdByName(selectedRole))
        })

        const newRole = {name: name.value}

        fetch('http://localhost:3003/api/v1/roles', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRole)
        }).then((resp)=>{
          return resp.json()
        }).then((jsonResp)=>{
          const roleCache = roleStore.roles;
          roleCache.push(jsonResp.data) //including role _id
          roleStore.setRoles(roleCache)

          // fetch('http://localhost:3003/api/v1/userroles', {
          //   method: 'POST',
          //   headers: {
          //     'Accept': 'application/json',
          //     'Content-Type': 'application/json'
          //   },
          //   body: JSON.stringify({
          //     userid: jsonResp.data._id,
          //     roles: selectedRoleIds
          //   })
          // }).then((resp)=>{
          //   return resp.json()
          // }).then((jsonResp)=>{
          //   console.log(jsonResp)
          // })
          // .catch((e)=>{
          //   console.error(e)
          // })
          //
        })
        .catch((e)=>{
          console.error(e)
        })


      }

      const togglePopupSwitch = () =>{
        popupSwitch.value = !popupSwitch.value;
      }

      const getRoleIdByName = (rolename) => {
        const temp = roleStore.roles.map((role)=> role.name === rolename ? role._id : null)
        return temp.filter(val => val)
      }

      return { name, popupSwitch, rolemodel, options ,onSubmit , togglePopupSwitch , roleStore}
    }
})

</script>
