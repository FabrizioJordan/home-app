const fs = require('fs');
const path = require('path');

const deleteFolderRecursive = function (folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const currentPath = path.join(folderPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        // Recursivamente eliminar la carpeta
        deleteFolderRecursive(currentPath);
      } else {
        // Intentar eliminar el archivo
        try {
          fs.unlinkSync(currentPath);
        } catch (err) {
          console.error(`Error deleting file ${currentPath}:`, err);
        }
      }
    });
    try {
      fs.rmdirSync(folderPath);
    } catch (err) {
      console.error(`Error deleting folder ${folderPath}:`, err);
    }
  }
};

// Directorio a limpiar
const dir = path.join(__dirname, 'out');

deleteFolderRecursive(dir);

// Crear el directorio si no existe
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
