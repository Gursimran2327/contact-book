import { createRouter, createWebHistory } from 'vue-router';
import ContactList from './views/ContactList.vue';
import ContactDetails from './views/ContactDetails.vue';
import ContactForm from './views/ContactForm.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: ContactList,
      name: 'home'
    },
    {
      path: '/contact/new',
      component: ContactForm,
      name: 'new-contact'
    },
    {
      path: '/contact/:id',
      component: ContactDetails,
      name: 'contact-details'
    },
    {
      path: '/contact/:id/edit',
      component: ContactForm,
      name: 'edit-contact'
    }
  ]
});