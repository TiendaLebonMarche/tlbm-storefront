const https = require('https');
https.get('https://res.cloudinary.com/dgo9tm9e2/image/upload/v1776805039/upscalemedia-transformed_5_tkeab1.png', (res) => {
  const chunks = [];
  res.on('data', (c) => chunks.push(c));
  res.on('end', () => {
    const buffer = Buffer.concat(chunks);
    // basic PNG dimensions reader
    // PNG signature is 8 bytes. Then IHDR chunk: 4 bytes length, 4 bytes type ('IHDR'), 4 bytes width, 4 bytes height
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    console.log(`Width: ${width}, Height: ${height}`);
  });
});
