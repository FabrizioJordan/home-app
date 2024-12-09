const { exec } = require('child_process');

// Ruta predeterminada donde generalmente se encuentra Discord
const discordPath = `"${process.env.LOCALAPPDATA}\\Discord\\Update.exe" --processStart Discord.exe`;

// Ejecutar el comando para abrir Discord
exec(`start "" ${discordPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al intentar abrir Discord: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error en stderr: ${stderr}`);
    return;
  }
  console.log(`Discord iniciado: ${stdout}`);
});
