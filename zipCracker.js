const JSZip = require("jszip");
const fs = require("fs");

fs.readFile("test.zip", (err, data) => {
  if (err) throw err;
  const zip = new JSZip();
  zip.loadAsync(data).then(() => {
    fs.readFile("password.txt", "utf8", (err, passwords) => {
      if (err) throw err;
      const passwordList = passwords.split("\n");
      passwordList.forEach((password) => {
        zip
          .decrypt({ password: password.trim() })
          .then((plain) => {
            console.log("Password found: " + password);
          })
          .catch((error) => {
            console.log("Trying.......");
          });
      });
    });
  });
});
