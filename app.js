const yargs = require("yargs");
const { makeContact } = require("./contact");

yargs
    .command({
        command: 'add',
        describe: 'Add Contact',
        builder: {
            name: {
                describe: 'Full Name',
                demandOption: true,
                type: 'string'
            },
            number: {
                describe: 'Phone Number',
                demandOption: true,
                type: 'string'
            },
            email : {
                describe: 'Email',
                demandCommand: false,
                type: 'string',
            }
        },
        handler(argv) {
            const contact = {
                name : argv.name,
                phoneNumber : argv.number,
                email: argv.email,
            }
            
            makeContact(contact)
        },

    })
    .demandCommand()
    .parse()

