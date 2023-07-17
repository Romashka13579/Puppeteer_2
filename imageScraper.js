const ExcelJS = require('exceljs');
const fs = require('fs');
const axios = require('axios');

async function downloadImage(link, fileName) {
    const response = await axios.get(link, {
        responseType: 'arraybuffer'
    });

    fs.writeFileSync(fileName, Buffer.from(response.data, 'binary'));
}

const workbook = XLSX.utils.book_new();

// Add a worksheet to the workbook
const worksheet = XLSX.utils.aoa_to_sheet([[]]);
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

// Define the link and filename of the image
const imageLink = 'https://example.com/image.jpg';
const imageFileName = 'image.jpg';

// Download the image file
await downloadImage(imageLink, imageFileName);

// Add the image to the worksheet
const image = XLSX.utils.image_add_from_file(imageFileName);
XLSX.utils.sheet_add_image(worksheet, image, {
  tl: { col: 0, row: 0 },
  ext: { width: 200, height: 200 }
});

// Save the workbook to a file
XLSX.writeFile(workbook, 'output.xlsx');