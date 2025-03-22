<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Contacts</h1>
            <p class="mt-1 text-sm text-gray-500">
              Manage your contacts and keep your address book organized
            </p>
          </div>
          <router-link
            to="/contact/new"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
          >
            <PlusIcon class="h-5 w-5 mr-2" />
            New Contact
          </router-link>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Search and Filters -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex space-x-4">
            <div class="flex-1">
              <div class="relative">
                <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Search contacts..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                />
              </div>
            </div>
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <span>{{ sortedFilteredContacts.length }} contacts</span>
            </div>
          </div>
        </div>

        <!-- Contact List -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-gray-50">
                <th class="w-12 px-6 py-3"></th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th class="w-12 px-6 py-3"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="contact in sortedFilteredContacts" 
                :key="contact.id"
                class="hover:bg-gray-50 transition-colors group"
              >
                <td class="px-6 py-4">
                  <div 
                    class="h-10 w-10 rounded-full flex items-center justify-center shadow-sm" 
                    :class="getAvatarColor(contact)"
                  >
                    <span class="text-white font-medium">
                      {{ getInitials(contact) }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <router-link 
                    :to="{ name: 'contact-details', params: { id: contact.id }}"
                    class="group flex flex-col"
                  >
                    <span class="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                      {{ contact.lastName }}, {{ contact.firstName }}
                    </span>
                    <span class="text-xs text-gray-500 mt-0.5" v-if="contact.notes">
                      {{ truncateText(contact.notes, 40) }}
                    </span>
                  </router-link>
                </td>
                <td class="px-6 py-4">
                  <a 
                    :href="'mailto:' + contact.email"
                    class="flex items-center text-sm text-gray-600 hover:text-blue-600 group-hover:text-blue-600"
                  >
                    <EnvelopeIcon class="h-4 w-4 mr-2 flex-shrink-0" />
                    {{ contact.email }}
                  </a>
                </td>
                <td class="px-6 py-4">
                  <a 
                    v-if="contact.phone"
                    :href="'tel:' + contact.phone"
                    class="flex items-center text-sm text-gray-600 hover:text-blue-600 group-hover:text-blue-600"
                  >
                    <PhoneIcon class="h-4 w-4 mr-2 flex-shrink-0" />
                    {{ formatPhoneNumber(contact.phone) }}
                  </a>
                </td>
                <td class="px-6 py-4">
                  <div v-if="contact.address" class="flex items-center text-sm text-gray-600">
                    <MapPinIcon class="h-4 w-4 mr-2 flex-shrink-0" />
                    {{ truncateText(contact.address, 30) }}
                  </div>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end space-x-2">
                    <router-link
                      :to="{ name: 'contact-details', params: { id: contact.id }}"
                      class="text-gray-400 hover:text-gray-500"
                    >
                      <ChevronRightIcon class="h-5 w-5" />
                    </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div 
            v-if="sortedFilteredContacts.length === 0" 
            class="p-12 text-center"
          >
            <UserGroupIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900">No contacts found</h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ searchQuery ? 'Try adjusting your search terms' : 'Get started by creating a new contact' }}
            </p>
            <div class="mt-6">
              <router-link
                to="/contact/new"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon class="h-5 w-5 mr-2" />
                New Contact
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { 
  ChevronRightIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PlusIcon
} from '@heroicons/vue/24/outline';
import { store, actions } from '../store';
import type { Contact } from '../types';

const searchQuery = computed({
  get: () => store.searchQuery,
  set: (value: string) => actions.setSearchQuery(value)
});

const sortedFilteredContacts = computed(() => {
  return store.contacts
    .filter(contact => {
      const query = searchQuery.value.toLowerCase();
      if (!query) return true;
      
      return (
        contact.firstName.toLowerCase().includes(query) ||
        contact.lastName.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        (contact.phone && contact.phone.toLowerCase().includes(query)) ||
        (contact.address && contact.address.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      const lastNameCompare = a.lastName.localeCompare(b.lastName);
      if (lastNameCompare !== 0) return lastNameCompare;
      return a.firstName.localeCompare(b.firstName);
    });
});

// Generate initials from name
const getInitials = (contact: Contact): string => {
  return (contact.firstName[0] + contact.lastName[0]).toUpperCase();
};

// Get a consistent color for the avatar based on the contact's name
const getAvatarColor = (contact: Contact): string => {
  const colors = [
    'bg-pink-500',
    'bg-purple-500',
    'bg-indigo-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-gray-500'
  ];
  const index = (contact.firstName.length + contact.lastName.length) % colors.length;
  return colors[index];
};

// Format phone numbers consistently
const formatPhoneNumber = (phone: string): string => {
  // Keep only digits
  const digits = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX if it's a 10-digit number
  if (digits.length === 10) {
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }
  
  return phone; // Return original if not 10 digits
};

// Truncate text with ellipsis
const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
</script>