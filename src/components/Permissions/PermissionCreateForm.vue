<template>
  <div class="q-pa-md">

    <q-form
      @submit="onSubmit"
      class="q-gutter-lg"
    >
      <q-input
        filled
        v-model="name"
        label="Permission Name"
        hint="name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type a permission name']"
      />
        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn flat label="Cancel" v-close-popup="popupSwitch" @click="togglePopupSwitch"/>
        </div>
    </q-form>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { permissionStore } from "src/store/PermissionStore";

export default defineComponent({
    name: "PermissionCreateForm",
    setup(){
      const name = ref();
      const popupSwitch = ref(false)

      const onSubmit = () => {
        let selectedRoleIds = []

        const newPermission = {name: name.value}

        fetch('http://localhost:3003/api/v1/permissions', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newPermission)
        }).then((resp)=>{
          return resp.json()
        }).then((jsonResp)=>{
          const permissionCache = permissionStore.permissions;
          permissionCache.push(jsonResp.data) //including role _id
          permissionStore.setPermissions(permissionCache)

          fetch('http://localhost:3003/api/v1/userroles', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userid: jsonResp.data._id,
              roles: selectedRoleIds
            })
          }).then((resp)=>{
            return resp.json()
          }).then((jsonResp)=>{
            console.log(jsonResp)
          })
          .catch((e)=>{
            console.error(e)
          })

        })
        .catch((e)=>{
          console.error(e)
        })
      }

      const togglePopupSwitch = () =>{
        popupSwitch.value = !popupSwitch.value;
      }

      return { name, popupSwitch ,onSubmit , togglePopupSwitch}
    }
})

</script>
