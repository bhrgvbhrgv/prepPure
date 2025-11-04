// const ImageKit = require('imagekit');

// const client = new ImageKit({
//   privateKey: process.env.IMAGE_KIT_PRIVATE_KEY, // This is the default and can be omitted
// });

// const response = await client.files.upload({
//   file: fs.createReadStream('path/to/file'),
//   fileName: 'file-name.jpg',
// });

// console.log(response);




// Alternative implementation:





// const ImageKit = require('imagekit');

// const imageKitClient = new ImageKit({
//   publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
// });

// async function uploadFile(file, fileName) {
//   const result = await ImageKit.upload({
//     file: file,
//     fileName: fileName,

// })
//   return result;
// }

// module.exports = {uploadFile};

const ImageKit = require('imagekit');

const imageKitClient = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  const result = await imageKitClient.upload({
    file: file,
    fileName: fileName,

})
  return result;
}

module.exports = {uploadFile};