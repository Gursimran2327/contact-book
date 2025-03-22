export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export interface ContactStore {
  contacts: Contact[];
  searchQuery: string;
}