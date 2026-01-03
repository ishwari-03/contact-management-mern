import { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './index.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Backend URL from environment variable
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await fetch(`${API_URL}/api/contacts`);

      if (!res.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
      setError('Unable to load contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="page">
      <div className="container">
        <h2 className="header">Contact Management</h2>

        <div className="card">
          <ContactForm refreshContacts={fetchContacts} />
        </div>

        <div className="card">
          {loading && <p>Loading contacts...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <ContactList
              contacts={contacts}
              refreshContacts={fetchContacts}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
