import * as fs from 'fs';
const readFile = require('util').promisify(fs.readFile);
const hbs = require('hbs');
import puppeteer from 'puppeteer';
var path = require('path');
hbs.registerHelper('inc', function(value) {
  return parseInt(value) + 1;
});



exports.print = async (req, res) => {
  const data = req;
  let options: any;
  let reqdata = data.data;
  console.log(reqdata)
  var file = path.join(__dirname, data.templateUrl);
  const content = await readFile(file, 'utf8');
  const template = hbs.compile(content);
    const getImageBase64 = (filePath?: string | null, type?: string) => {
  if (!filePath || typeof filePath !== 'string') {
    if (type) console.warn(`Skipping missing ${type} signature path.`);
    return '';
  }

  try {
    const fullPath = path.join(__dirname, '../../../../', filePath);
    return `data:image/png;base64,${fs.readFileSync(fullPath, { encoding: 'base64' })}`;
  } catch (err) {
    console.error(`Error reading ${type} image at path ${filePath}:`, err);
    return '';
  }
 };
  let sopCreatedDate = '';
  let footerContent;
  let headerContent;
  let sopDocHtml = '';
  let headerStyle;
  let footerStyle;
  let userImgSrc = '';
  let reviewerImgSrc = '';
  let approverImgSrc = '';
  let complaintInchargeSignature = '';
  let signature= ''

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  hbs.registerHelper('formatDate', function (date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
});

if (data.templateUrl === './templates/complaint.hbs') {
  complaintInchargeSignature = getImageBase64(reqdata.complaintInChargeSignature, 'Complaint Incharge');
}


  if (data.templateUrl === './templates/sop.hbs') {
    sopCreatedDate = new Date(reqdata.data.sopDetails.createdDate)
  .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }); // "10/10/25"
    // const getImageBase64 = (filePath?: string | null, type?: string) => {
    //   if (!filePath || typeof filePath !== 'string') {
    //     if (type) console.warn(`Skipping missing ${type} signature path.`);
    //     return null;
    //   }
    //   try {
    //     const fullPath = path.join(__dirname, '../../../../', filePath);
    //     return fs.readFileSync(fullPath, { encoding: 'base64' });
    //   } catch (err) {
    //     console.error(`Error reading ${type} image at path:`, filePath, err);
    //     return null;
    //   }
    // };

    // Only convert signatures if template is sop.hbs
    userImgSrc = getImageBase64(reqdata.data?.sopDetails.user?.signature, 'user')
      ? `data:image/png;base64,${getImageBase64(reqdata.data?.sopDetails.user?.signature, 'user')}`
      : '';

    reviewerImgSrc = getImageBase64(reqdata.data?.reviewer?.signature, 'reviewer')
      ? `data:image/png;base64,${getImageBase64(reqdata.data?.sopDetails.reviewer?.signature, 'reviewer')}`
      : '';

    approverImgSrc = getImageBase64(reqdata.data?.sopDetails.approver?.signature, 'approver')
      ? `data:image/png;base64,${getImageBase64(reqdata.data?.sopDetails.approver?.signature, 'approver')}`
      : '';
  }


  //  Use Aspose.Words to extract DOCX → HTML
  if (reqdata.data?.sopDetails.sopDoc && reqdata.data?.sopDetails.sopDoc.trim() !== '') {
    console.log('reqdata.data?.sopDetails.sopDoc',reqdata.data?.sopDetails.sopDoc)
   
  } else {
    console.log('Skipping doc conversion — sopDoc is empty, null, or undefined');
  }

  //  Inject extracted HTML into template
  const html = template({
    reqdata,
    formattedDate,
    sopDocHtml,
    reviewerImgSrc,
    userImgSrc,
    approverImgSrc,
    complaintInchargeSignature,
    signature
  });

  if (data.templateUrl === './templates/logBook.hbs') {
  headerContent = `
    <header style="width: 100%;">
    <table style="width:100%; border-collapse:collapse; font-size:9pt; border:1px solid #000;">
  <tr>
    <td colspan="8"
        style="border:1px solid #000; font-weight:bold; padding:15px;border-right:none">
      LabCode Data Science – Unit City Name
    </td>
    <td colspan="2"
        style="border:1px solid #000; font-weight:bold; padding:8px; text-align:right;border-left:none">
      Logo:
    </td>
  </tr>
  <tr>
    <td colspan="5"
        style="border:1px solid #000; padding:5px;font-size:8pt;width:50%">
      Issued For: ${reqdata[0].logBook.issuedFor}
    </td>
    <td colspan="5"
        style="border:1px solid #000; padding:5px;font-size:8pt;width:50%">
      Logbook No: ${reqdata[0].logBook.logBookNumber}
    </td>
  </tr>
  <tr>
    <td colspan="5"
        style="border:1px solid #000; padding:5px;font-size:8pt">
      Issue No: ${reqdata[0].logBook.issueNo}
    </td>
     <td colspan="5"
        style="border:1px solid #000; padding:5px;font-size:8pt">
        <span style="float:left;">Page No:<span class="pageNumber"></span> of <span class="totalPages"></span></span>
    </td>
  </tr>
  <tr>
  <td colspan = "12" style="height:18px"></td></tr>
</table>
    </body>
  </html>`;
    // for header outside space 
    headerStyle = 'width:100%; padding:7mm 5mm 5mm 5mm';
    footerContent = `<footer style="width: 100%; text-align: center; font-size: 10pt;"></footer>`;
    footerStyle = 'font-size: 14px; width: 100%; padding: 7mm;';
    options = {
      format: 'A4',
      margin: { top: '100mm', bottom: '20mm', left: '2mm', right: '3mm' },
      displayHeaderFooter: true
    };
  signature = getImageBase64(reqdata.signature, 'Sign');
}

  if (data.templateUrl === './templates/complaint.hbs'){
  console.log('hiiiiiiiiii----------------')
   headerStyle = 'width:100%; padding: 16mm 4mm 5mm 5mm;';
   footerContent = `<footer style="width: 100%; text-align: center; font-size: 10pt;"></footer>`;
    footerStyle = 'font-size: 14px; width: 100%; padding: 7mm;';
    options = {
      format: 'A4',
      margin: { top: '50mm', bottom: '20mm', left: '3mm', right: '2mm' },
      displayHeaderFooter: true
    };
  }

  if (data.templateUrl === './templates/sop.hbs') {
    headerContent = `
    <header style="width: 100%;">
     <div style="display: flex; align-items: center; justify-content:center;"> 
     <span style="font-weight: bold; font-size: 13pt;padding-bottom:8mm">${reqdata.data.sopDetails.title}</span> 
     </div> 
     <table style="width: 100%; border-collapse: collapse; font-size: 8pt;"> 
     <tr> 
     <td style="border: 1px solid #ccc; padding: 4px;width:50%">Department: ${reqdata.data.sopDetails.department}</td> 
     <td style="border: 1px solid #ccc; padding: 4px;width:50%">Date of Creation: ${sopCreatedDate}</td> </tr>
      <tr> <td style="border: 1px solid #ccc; padding: 4px;width:50%">SOP Number: ${reqdata.data.sopDetails.sopNumber}</td> <td style="border: 1px solid #ccc; padding: 4px;width:50%">
     Version No: ${reqdata.data?.sopDetails.version}</td> 
     </tr> 
     <tr> 
     <td style="border: 1px solid #ccc; padding: 4px;width:50%">Location: ${reqdata.data.sopDetails.location}</td> 
     <td style="border: 1px solid #ccc; padding: 4px;width:50%">SOP Status: ${reqdata.data.sopDetails.status}</td> 
     </tr>
     </table>
      </header>
    </body>
  </html>`;
    // for header outside space 
    headerStyle = 'width:100%; padding: 16mm 4mm 5mm 5mm;';
    footerContent = `<footer style="width: 100%; text-align: center; font-size: 10pt;"></footer>`;
    footerStyle = 'font-size: 14px; width: 100%; padding: 7mm;';
    options = {
      format: 'A4',
      margin: { top: '60mm', bottom: '20mm', left: '3mm', right: '2mm' },
      displayHeaderFooter: true
    };
  } else {
    options = {
      format: 'A4',
      margin: { top: '20mm', bottom: '10mm' },
      displayHeaderFooter: true
    };
  }

  //  Puppeteer render → PDF
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
      headless: true,
      devtools: false,
      defaultViewport: null,
    });
  } catch (launchError) {
    console.error('Error launching Puppeteer:', launchError);
    throw launchError;
  }

  const { v4: uuidv4 } = require('uuid');
  try {
    const uuid = uuidv4();
    const outputFileName = `upload/${uuid}.pdf`;
    const filePath = path.join(__dirname, '../../../../', outputFileName);
    const pdfUrl = `http://beqms.labsoft.in/${outputFileName}`;
    // const pdfUrl = `http://localhost:3000/${outputFileName}`;


    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await page.pdf({
      path: filePath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      ...options,
      headerTemplate: `<div style="${headerStyle}">${headerContent}</div>`,
      footerTemplate: `<div style="${footerStyle}">
        <div style="border-top: 1px solid #a7d7e7; padding-top: 5px;">
          ${footerContent} 
          <span style="float:right;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      </div>`
    });

    await browser.close();

    return { filePath: outputFileName, pdfUrl };
  } catch (err) {
    console.error('Error while generating PDF:', err);
    throw err;
  }
};
