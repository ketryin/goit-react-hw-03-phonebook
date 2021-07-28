import React, { Component } from "react";
import shortid from "shortid";
import Form from "./components/Form";
import ContactsList from "./components/ContactsList";
import Filter from "./components/Filter";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  addContact = (name, number) => {
    if (this.state.contacts.find((contact) => contact.name === name)) {
      alert("Attempt to create existing contact!");
      return;
    }

    this.setState((prevState) => ({
      contacts: [
        ...prevState.contacts,
        { id: shortid.generate(), name, number },
      ],
    }));
  };
  handleFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };
  onDeleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.todos;

    if (nextContacts !== prevContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
      console.log(localStorage.getItem("contacts"));
    }
  }
  componentDidMount() {
    if (localStorage.getItem("contacts")) {
      this.setState({ contacts: JSON.parse(localStorage.getItem("contacts")) });
    }
  }

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        {contacts.length > 0 && (
          <>
            <h1>Contacts</h1>
            <Filter filter={filter} handleFilter={this.handleFilter} />
            <ContactsList
              filter={filter}
              contacts={contacts}
              onDeleteContact={this.onDeleteContact}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
