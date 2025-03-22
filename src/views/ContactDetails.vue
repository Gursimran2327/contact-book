<template>
  <div class="max-w-2xl mx-auto p-4">
    <div v-if="contact" class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-start mb-6">
        <h1 class="text-3xl font-bold">
          {{ contact.firstName }} {{ contact.lastName }}
        </h1>
        <div class="flex space-x-2">
          <router-link
            :to="{ name: 'edit-contact', params: { id: contact.id }}"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
          </router-link>
          <button
            @click="handleDelete"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <dl class="space-y-4">
        <div>
          <dt class="text-sm font-medium text-gray-500">Email</dt>
          <dd class="mt-1">{{ contact.email }}</dd>
        </div>
        <div v-if="contact.phone">
          <dt class="text-sm font-medium text-gray-500">Phone</dt>
          <dd class="mt-1">{{ contact.phone }}</dd>
        </div>
        <div v-if="contact.address">
          <dt class="text-sm font-medium text-gray-500">Address</dt>
          <dd class="mt-1">{{ contact.address }}</dd>
        </div>
        <div v-if="contact.notes">
          <dt class="text-sm font-medium text-gray-500">Notes</dt>
          <dd class="mt-1">{{ contact.notes }}</dd>
        </div>
      </dl>
    </div>
    <div v-else class="text-center text-gray-500">
      Contact not found
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { store, actions } from '../store';

const router = useRouter();
const route = useRoute();

const contact = computed(() => 
  store.contacts.find(c => c.id === route.params.id)
);

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this contact?')) {
    actions.deleteContact(route.params.id as string);
    router.push({ name: 'home' });
  }
};
</script>