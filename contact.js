const { existsSync, mkdirSync, writeFileSync, readFileSync } = require('node:fs');
const validator = require('validator')

const dirPath = 'data';
const filePath = 'data/contacts.json';

if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
}

if (!existsSync(filePath)) {
    writeFileSync(filePath, '[]');
}



const makeContact = (...value) => {
    const contact = { ...value };

    if (!validator.isMobilePhone(contact[0]['phoneNumber'], 'any')) {
        console.log(`${contact[0]['phoneNumber']} not phone number`);
        return false;
    }

    if (contact[0]['email']) {
        if (!validator.isEmail(contact[0]['email'])) {
            console.log(`${contact[0]['email']} not Email`)
            return false;
        }
    }

    const fileBuffer = readFileSync(filePath, 'utf-8')
    const contacts = JSON.parse(fileBuffer);
    contacts.push(contact[0]);
    writeFileSync(filePath, JSON.stringify(contacts))
    console.log('Thanks for adding a contact');

}

const listContact = () => {
    const fileBuffer = readFileSync(filePath, 'utf-8')
    const contacts = JSON.parse(fileBuffer);
    contacts.forEach((element, i) => {
        console.log(`${i + 1}. ${element.name} - ${element.phoneNumber}`)
    });
}

const removeContact = (name) => {

    const fileBuffer = readFileSync(filePath, 'utf-8')
    const contacts = JSON.parse(fileBuffer);

    const newContacts = contacts.filter(n => n.name.toLowerCase() !== name.toLowerCase());

    if(contacts.length === newContacts.length){
        console.log(`${name} Not Found`)
        return false;
    }
    writeFileSync(filePath, JSON.stringify(newContacts))
    console.log(`Success : ${name} has been removed from contact`);
}

module.exports = { makeContact, listContact, removeContact }