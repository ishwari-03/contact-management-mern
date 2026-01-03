import { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './index.css';

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await fetch('http://localhost:5000/api/contacts');
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="page">
    <div className="container">
      <h2 className='header'>Contact Management</h2>

      <div className="card">
        <ContactForm refreshContacts={fetchContacts} />
      </div>

      <div className="card">
        <ContactList contacts={contacts} refreshContacts={fetchContacts} />
      </div>
    </div>
    </div>
  );
}

export default App;
