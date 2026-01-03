const ContactList = ({ contacts, refreshContacts }) => {
  const deleteContact = async (id) => {
    await fetch(`http://localhost:5000/api/contacts/${id}`, {
      method: 'DELETE',
    });
    refreshContacts();
  };

 return (
  <div>
    <h3>Submitted Contacts</h3>

    {contacts.length === 0 ? (
      <p>No contacts yet.</p>
    ) : (
        <div className="table-wrapper">
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.message || '-'}</td>
              <td>
                <button
                  className="danger"
                  onClick={() => deleteContact(contact._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )}
  </div>
);


};

export default ContactList;
