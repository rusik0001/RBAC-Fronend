<template>
  <q-btn color="primary" icon="add_circle_outline" label="Create User" class="q-mt-md q-ml-md" @click="toggleUserCreateModal"/>

    <div class="q-pa-md">
      <q-table
        title="Users"
        :rows="userStore.users"
        :columns="columns"
        row-key="name"
        @row-click="userEdit"
      />
    </div>
    <q-dialog v-model="prompt" persistent>
      <q-card>
          <q-card-actions align="right" class="text-primary">
            <UserCreateForm />
          </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import UserCreateForm from 'src/components/Users/UserCreateForm.vue'
  import { userStore } from "../store/UserStore"

  const columns =  [{
        name: 'firstname',
        label: 'Firstname',
        align: 'left',
        field:'firstname'
    },
    {
        name: 'lastname',
        label: 'Lastname',
        align: 'left',
        field:'lastname'
    },
    {
        name: 'email',
        label: 'E-Mail',
        align: 'left',
        field:'email'
    },
    {
        name: 'tel',
        label: 'Tel.',
        align: 'left',
        field:'tel'
    }
  ]

  export default defineComponent({
    name: "UserPage",
    components: {
    UserCreateForm
    },
    setup() {
        const prompt = ref(false)

        const toggleUserCreateModal = () => {
          prompt.value = !prompt.value;
        }

        const userEdit = (event, row) => {
          console.log(`Edit ${row.firstname}`)
        }

        return { columns, userEdit , toggleUserCreateModal, prompt, userStore};
    },

})
  </script>
