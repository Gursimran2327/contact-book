import { reactive } from 'vue';
import type { Contact, ContactStore } from './types';

const STORAGE_KEY = 'contact-book';


const sampleContacts: Contact[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Suite 100, Anytown, USA 12345',
    notes: 'Primary contact for project X'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 234-5678',
    address: '456 Oak Ave, Floor 3, Somewhere, USA 67890',
    notes: 'Marketing team lead'
  },
  {
    id: '3',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.j@example.com',
    phone: '(555) 345-6789',
    address: '789 Pine Rd, Elsewhere, USA 34567'
  },
  {
    id: '4',
    firstName: 'Robert',
    lastName: 'Brown',
    email: 'robert.b@example.com',
    phone: '(555) 456-7890',
    address: '321 Elm St, Nowhere, USA 89012'
  },
  {
    id: '5',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.d@example.com',
    phone: '(555) 567-8901',
    address: '654 Maple Ave, Anywhere, USA 45678'
  }
];

const loadState = (): ContactStore => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsedState = JSON.parse(stored);
    return parsedState.contacts.length > 0 ? parsedState : { contacts: sampleContacts, searchQuery: '' };
  }
  return { contacts: sampleContacts, searchQuery: '' };
};

export const store = reactive<ContactStore>(loadState());

// Save state to localStorage whenever it changes
const saveState = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};

export const actions = {
  addContact(contact: Omit<Contact, 'id'>) {
    const newContact: Contact = {
      ...contact,
      id: crypto.randomUUID()
    };
    store.contacts.push(newContact);
    saveState();
    return newContact;
  },

  updateContact(contact: Contact) {
    const index = store.contacts.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      store.contacts[index] = contact;
      saveState();
      return true;
    }
    return false;
  },

  deleteContact(id: string) {
    const index = store.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      store.contacts.splice(index, 1);
      saveState();
      return true;
    }
    return false;
  },

  setSearchQuery(query: string) {
    store.searchQuery = query;
  }
};