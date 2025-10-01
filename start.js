//Created By Qadeer-ai Coder and qadeer brahvi don't copy without permission of owner

const fs = require('fs');
const path = require("path");
const { File } = require("megajs");
const AdmZip = require("adm-zip");
const axios = require("axios");

const PLUGINS_DIR = './plugins'; // Directory where plugins will be extracted
const LIB_DIR = './lib';
const ZIP_DIR = './'
const auid = './assets'
const silsb = './sessions'
const mydt = './data'

async function downloadAndExtractZip() {
  try {

  const MEGA_ZIP_LINK = `enter here file link`;
  
    if (!fs.existsSync(mydt)) {
      fs.mkdirSync(mydt, { recursive: true });
    }
    if (!fs.existsSync(auid)) {
      fs.mkdirSync(auid, { recursive: true });
    }
    if (!fs.existsSync(silsb)) {
      fs.mkdirSync(silsb, { recursive: true });
    }
    if (!fs.existsSync(PLUGINS_DIR)) {
      fs.mkdirSync(PLUGINS_DIR, { recursive: true });
    }
    if (!fs.existsSync(LIB_DIR)) {
        fs.mkdirSync(LIB_DIR, { recursive: true });
      }

    console.log('FETCHING FILE FOR QADEER AI🚀❤️');
    
    const file = File.fromURL(MEGA_ZIP_LINK);
    const fileData = await file.downloadBuffer();

    const tempZipPath = path.join(__dirname, 'temp.zip');
    fs.writeFileSync(tempZipPath, fileData);
    console.log(` QADEER AI FILES DOWNLOADED SUCCESSFULLY ✅`);

    const zip = new AdmZip(tempZipPath);
    zip.extractAllTo(ZIP_DIR, true); 

    console.log('QADEER AI SUCCESSFULLY CONNECTED ENJOY ❤️✅');

    fs.unlinkSync(tempZipPath);
    require("./index.js");

  } catch (error) {
    console.error('Error:', error.message);
  }
}

downloadAndExtractZip();
