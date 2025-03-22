<template>
  <div class="max-w-2xl mx-auto p-4">
    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-3xl font-bold mb-6">
        {{ isEditing ? 'Edit Contact' : 'New Contact' }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            v-model="form.firstName"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            v-model="form.lastName"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <input
            v-model="form.phone"
            type="tel"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            v-model="form.address"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            v-model="form.notes"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <div class="flex justify-end space-x-2">
          <router-link
            to="/"
            class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {{ isEditing ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { store, actions } from '../store';
import type { Contact } from '../types';

const router = useRouter();
const route = useRoute();

const isEditing = computed(() => route.name === 'edit-contact');

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  notes: ''
});

onMounted(() => {
  if (isEditing.value) {
    const contact = store.contacts.find(c => c.id === route.params.id);
    if (contact) {
      form.value = { ...contact };
    } else {
      router.push({ name: 'home' });
    }
  }
});

const handleSubmit = () => {
  if (isEditing.value) {
    actions.updateContact({
      id: route.params.id as string,
      ...form.value
    });
    router.push({ name: 'contact-details', params: { id: route.params.id } });
  } else {
    const newContact = actions.addContact(form.value);
    router.push({ name: 'contact-details', params: { id: newContact.id } });
  }
};
</script>