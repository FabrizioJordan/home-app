const fs = require('fs');
const path = require('path');
const existsSync = fs.existsSync
const readdirSync = fs.readdirSync
const lstatSync = fs.lstatSync
const unlinkSync = fs.unlinkSync
const rmdirSync = fs.rmdirSync
const mkdirSync = fs.mkdirSync


const deleteFolderRecursive = function (folderPath) {
  if (existsSync(folderPath)) {
    readdirSync(folderPath).forEach((file) => {
      const currentPath = path.join(folderPath, file);
      if (lstatSync(currentPath).isDirectory()) {
        // Recursivamente eliminar la carpeta
        deleteFolderRecursive(currentPath);
      } else {
        // Intentar eliminar el archivo
        try {
          unlinkSync(currentPath);
        } catch (err) {
          console.error(`Error deleting file ${currentPath}:`, err);
        }
      }
    });
    try {
      rmdirSync(folderPath);
    } catch (err) {
      console.error(`Error deleting folder ${folderPath}:`, err);
    }
  }
};

// Directorio a limpiar
const dir = path.join(__dirname, 'out');

deleteFolderRecursive(dir);

// Crear el directorio si no existe
if (!existsSync(dir)) {
  mkdirSync(dir);
}
