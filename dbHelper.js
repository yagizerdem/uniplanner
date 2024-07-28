const fs = require("fs");
const path = require("path");
const Path = require("path");
class DbHelper {
  constructor() {
    this.dbFolderPath = Path.join(process.cwd(), "database");
    if (!DbHelper.instance) {
      DbHelper.instance = this;
    } else return DbHelper.instance;
  }

  createStore() {
    try {
      if (!fs.existsSync(this.dbFolderPath)) {
        fs.mkdirSync(this.dbFolderPath);
        const fileNames = ["todolist.json", "timable.json"];
        for (var fileName of fileNames) {
          const fd = fs.openSync(Path.join(this.dbFolderPath, fileName), "wx");

          // Close the file descriptor
          fs.closeSync(fd);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  static invoke() {
    new DbHelper();
  }

  writeToDoList(data) {
    const jsonData = JSON.stringify(data, null, 2);
    const filePath = path.join(this.dbFolderPath, "todolist.json");
    try {
      fs.writeFileSync(filePath, jsonData);
      console.log("Data successfully written to file");
    } catch (err) {
      console.error("Error writing to file", err);
    }
  }
  getToDoList() {
    try {
      const filePath = path.join(this.dbFolderPath, "todolist.json");
      const data = fs.readFileSync(filePath, "utf8"); // 'utf8' specifies the encoding

      // Parse the JSON string into a JavaScript object
      const toDoList = JSON.parse(data);

      return toDoList;
    } catch (err) {
      console.error("Error reading file:", err);
      return [];
    }
  }
  writeTimable(data) {
    const jsonData = JSON.stringify(data, null, 2);
    const filePath = path.join(this.dbFolderPath, "timable.json");
    try {
      fs.writeFileSync(filePath, jsonData);
      console.log("Data successfully written to file");
    } catch (err) {
      console.error("Error writing to file", err);
    }
  }
  getTimable() {
    try {
      const filePath = path.join(this.dbFolderPath, "timable.json");
      const data = fs.readFileSync(filePath, "utf8"); // 'utf8' specifies the encoding

      // Parse the JSON string into a JavaScript object
      const result = JSON.parse(data);

      return result;
    } catch (err) {
      console.error("Error reading file:", err);
      return [];
    }
  }
}

module.exports = DbHelper;
