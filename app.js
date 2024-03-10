const { membuatKontak, pertanyaan } = require("./contact");


const main = async () => {
    const name = await pertanyaan('Enter Your Name : ');
    const phoneNumber = await pertanyaan('Enter Your Phone Number : ')

    membuatKontak( {name, phoneNumber} );
}

main();