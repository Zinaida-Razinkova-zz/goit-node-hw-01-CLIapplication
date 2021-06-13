const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");

const contactsPath = path.join("./db/contacts.json");
const id = shortid.generate();

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const listContacts = JSON.parse(data);
    console.table(listContacts);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const listContacts = JSON.parse(data);
    const contact = listContacts.filter((contact) => contact.id === contactId);
    console.table(contact);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const listContacts = JSON.parse(data);
    const newListContacts = listContacts.filter(
      (contact) => contact.id != contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newListContacts), "utf8");
    console.table(newListContacts);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: id,
    name,
    email,
    phone,
  };
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const listContacts = JSON.parse(data);
    const contacts = [...listContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    return console.table(contacts);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
