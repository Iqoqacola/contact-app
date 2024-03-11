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
    const fileBuffer = readFileSync(filePath, 'utf-8')


    if (!validator.isMobilePhone(contact[0]['phoneNumber'], 'id-ID')) {
        console.log(`${contact[0]['phoneNumber']} not phone number`);
        return false;
    }

    if (contact[0]['email']){
        if(!validator.isEmail(contact[0]['email'])){
            console.log(`${contact[0]['email']} not Email`)
            return false;
        }
    }
    
    const contacts = JSON.parse(fileBuffer);
    contacts.push(contact[0]);
    writeFileSync(filePath, JSON.stringify(contacts))
    console.log('Thanks for adding a contact');

}

module.exports = { makeContact }