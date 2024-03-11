const yargs = require("yargs");
const { makeContact, listContact, removeContact } = require("./contact");

yargs
    .command({
        command: 'add',
        describe: 'Add Contact',
        builder: {
            // Change here if you want to add other personal data
            name: {
                alias: 'na',
                describe: 'Full Name',
                demandOption: true,
                type: 'string'
            },
            number: {
                alias: 'nu',
                describe: 'Phone Number',
                demandOption: true,
                type: 'string'
            },
            email: {
                alias: 'e',
                describe: 'Email',
                demandCommand: false,
                type: 'string',
            }
        },
        handler(argv) {
            // Change here too (Change contact variable)
            const contact = {
                name: argv.name,
                phoneNumber: argv.number,
                email: argv.email,
            }

            makeContact(contact)
        },

    })
    .demandCommand()

yargs
    .command({
        command: 'list',
        describe: 'See All Contact',
        handler() {
            listContact();
        }
    })

yargs
    .command({
        command: 'remove',
        describe: 'Remove Contact',
        builder: {
            name: {
                alias: 'na',
                describe: 'Full Name',
                demandOption: true,
                type: 'string'
            },
        },
        handler(argv) {
            removeContact(argv.name);
        }
    })

yargs.parse()

