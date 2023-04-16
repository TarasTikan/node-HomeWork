const { program } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./db/contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.log(contactsList);
      break;

    case "get":
      const getId = await getContactById(id);
      console.log(getId);
      break;

    case "add":
      const add = await addContact({ name, email, phone });
      console.log(add);
      break;

    case "remove":
      const remove = await removeContact(id);
      console.log(remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse(process.argv);

const argv = program.opts();
console.table(argv);
invokeAction(argv);
