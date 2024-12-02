// excelReader.js
import * as XLSX from 'xlsx';

const readExcelFile = async () => {
  try {
    const fileLink = 'https://docs.google.com/spreadsheets/d/1oPmgx35g89TxO17dfbvFVejk9fNIPNeIKhFXZIxRuyE/export?format=xlsx';

    const response = await fetch(fileLink);

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      

      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // console.log(sheet);
      


      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // console.log(formattedData);
      return jsonData;
    } else {
      console.error('Failed to fetch Excel file:', response.statusText);
    }
  } catch (err) {
    console.error('Something went wrong:', err);
  }
};

export default readExcelFile;
