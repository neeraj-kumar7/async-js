const fs = require('fs');
const superagent = require("superagent");


///////////// using callbacks (callback hell) ////////
/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    if(err) return console.log(err.message);
    console.log(`Breed ${data}`);

    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
            .then(res => {
                console.log(res.body.message);
                fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message, (err) => {
                    if(err) return console.log(err.message);
                    console.log('Random dog image saved!');
                });
            })
            .catch(err => {
                console.log(err.message);
            });

});
*/

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) reject(err.message);
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data,  (err) => {
            if(err) reject(err.message);
            resolve('sucess');
        });
    });
};

//////////// using promises ///////////////

/*
readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Breed ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then(res => {
        console.log(res.body.message);
        return writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
    })
    .then(() => {
        console.log('Random dog image saved!');
    })
    .catch(err => {
        console.log("error! ");
        console.log(err.message);
    });
*/

//////////// using async/await /////////////////////
const getDogImage = async() => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed ${data}`);

        const resPro1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const resPro2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const resPro3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const res = await Promise.all([resPro1, resPro2, resPro3]);
        const images = res.map(elements => elements.body.message);

        console.log(images);

        await writeFilePro(`${__dirname}/dog-img.txt`, images.join('\n'));
        console.log('Random dog image saved!');
    }
    catch(err) {
        console.log(err);
        throw err;
    }
    return 'Got the image!';
};

(async() => {
    try {
        console.log('Want a dog image');
        const x = await getDogImage();
        console.log(x);
        console.log('Done');
    }
    catch(err){
        console.log(err);
    }
})();

/*
console.log('Want a dog image');
getDogImage()
    .then(x => {
        console.log(x);
        console.log('Done');
    })
    .catch(err => {
        console.log(err);
    });*/
