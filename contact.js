const { existsSync, mkdirSync, writeFileSync, readFileSync } = require('node:fs');
const validator = require('validator')
const readline = require('node:readline');

const dirPath = 'data';
const filePath = 'data/contacts.json';

if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
}

if (!existsSync(filePath)) {
    writeFileSync(filePath, '[]');
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const membuatKontak = (...value) => {
    const contact = { ...value };
    const fileBuffer = readFileSync(filePath, 'utf-8')

    
    if (!validator.isMobilePhone(contact[0]['phoneNumber'], 'id-ID')) {
        console.log(`${contact[0]['phoneNumber']} not phone number`);
    } else {
        const contacts = JSON.parse(fileBuffer);
        contacts.push(contact[0]);
        writeFileSync(filePath, JSON.stringify(contacts))
    }
    rl.close();
}

const pertanyaan = (ask) => {
    return new Promise((resolve, rejects) => {
        rl.question(ask, result => {
            resolve(result);
        });
    })

}

module.exports = { pertanyaan, membuatKontak }