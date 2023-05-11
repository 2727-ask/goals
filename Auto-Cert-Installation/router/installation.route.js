const express = require('express');
const router = express.Router();
const subProcess = require("child_process");
const path = require('path')
const fs = require('fs')


let cert_path = path.join(__dirname, "../certs/ashutoshtest5.cer");
let userCertRootLoc = "cert:\\CurrentUser\\Root";
let installationScript = `powershell.exe Import-Certificate -FilePath "${cert_path}" -CertStoreLocation ${userCertRootLoc}`;
let logs = "";


router.get('/install', function (req, res, next) {
    console.log("Installing Certificate", installationScript);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    try {
        subProcess.exec(installationScript, (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              process.exit(1);
            } else {
                logs = stdout.toString();
                console.log(`The stdout Buffer from shell: ${stdout.toString()}`);
            }
        })
        return res.json({
            "status": "success",
            "logs":logs
        });
    } catch (error) {
        console.log("Error");
    }
   
    
   
}) 

module.exports.router = router;

