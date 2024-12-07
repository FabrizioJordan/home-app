const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } =  require('electron')
const { setMainMenu } = require('./menu.js')
const exec = require('child_process').exec;

const shutdown = require('electron-shutdown-command');


//         

// Define los comandos que deseas ejecutar y su identificador asociado
const commands = {
    win32: {
        getWindowsType: 'wmic os get caption | findstr /v "Caption"',
        getWindowsHomeFiles: 'chcp 65001 & dir /a /b C:\\Users\\%USERNAME% | findstr /I /V /R "^\\..* ^ntuser.* ^NTUSER.*" | findstr /V /C:"Página de códigos activa: 65001"',
        getWindowsDocumentsFiles: 'chcp 65001 & dir /a /b C:\\Users\\%USERPROFILE%\\Documents | findstr /I /V /R "^\\..* ^ntuser.* ^NTUSER.*" | findstr /V /C:"Página de códigos activa: 65001"',
        getWindowsDownloadsFiles: 'chcp 65001 & dir /a /b C:\\Users\\%USERPROFILE%\\Downloads | findstr /I /V /R "^\\..* ^ntuser.* ^NTUSER.*" | findstr /V /C:"Página de códigos activa: 65001"',
        getWindowsMusicFiles: 'chcp 65001 & dir /a /b C:\\Users\\%USERPROFILE%\\Music | findstr /I /V /R "^\\..* ^ntuser.* ^NTUSER.*" | findstr /V /C:"Página de códigos activa: 65001"',
        getWindowsPicturesFiles: 'chcp 65001 & dir /a /b C:\\Users\\%USERPROFILE%\\Pictures | findstr /I /V /R "^\\..* ^ntuser.* ^NTUSER.*" | findstr /V /C:"Página de códigos activa: 65001"',
        getWindowsVideosFiles: 'chcp 65001 & dir /a /b C:\\Users\\%USERPROFILE%\\Videos | findstr /I /V /R "^\\..* ^ntuser.* ^NTUSER.*" | findstr /V /C:"Página de códigos activa: 65001"'
        //getWindowsListOfFiles: 'Get-ChildItem -Force | Format-Table Name,Length,Mode,LastWriteTime,Attributes -AutoSize'
    },
    linux: {
        getLinuxDesktop: 'echo $XDG_SESSION_DESKTOP',
        getLinuxDistro: 'lsb_release -d | cut -f2 | sed \'s/ LTS//\'',
        getLinuxDistro2: `cat /etc/*release | grep -w 'ID' | cut -d'=' -f2"`,
        getLinuxUserName: 'whoami',
        getLinuxHomeFiles: 'ls -lah',
        getLinuxDocumentsFiles: 'ls -1 $HOME/Documents',
        getLinuxDownloadsFiles: 'ls -1 $HOME/Downloads',
        getLinuxMusicFiles: 'ls -1 $HOME/Music',
        getLinuxPhotosFiles: 'ls -1 $HOME/Pictures',
        getLinuxVideosFiles: 'ls -1 $HOME/Videos'
    },
    darwin: {
        // Agrega comandos específicos de macOS si es necesario
    }
};

// Función para ejecutar un comando y devolver el resultado
const executeCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`Error de la terminal: ${stderr}`);
                resolve(null);
                return;
            }
            resolve(stdout.trim());
        });
    });
};

// Define los manejadores de eventos para cada comando
ipcMain.handle('executeCommand', async (event, commandName) => {
    const command = getCommandForPlatform(commandName);
    if (!command) {
        console.error(`Comando desconocido: ${commandName}`);
        return null;
    }
    return await executeCommand(command);
});

// Función para obtener el comando correspondiente a la plataforma actual
const getCommandForPlatform = (commandName) => {
    const platformCommands = commands[process.platform];
    return platformCommands ? platformCommands[commandName] : null;
};




// Define los manejadores de eventos para ejecutar comandos sin devolver resultados
ipcMain.on('executeCommandWithoutResponse', (event, commandName) => {
    if (!commandName) {
        console.error(`Comando desconocido: ${commandName}`);
        return;
    }
    executeCommand(commandName)
        .then(() => console.log(`Comando ejecutado : ${commandName}`))
        .catch(error => console.error(`Error al ejecutar ${commandName}:`, error));
});





const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        minHeight: 400,
        minWidth: 400,
        icon:  path.join(__dirname, "/assets/icons/home.ico"),
        webPreferences: {
            preload: path.join(__dirname, './src/preload.js')
        }
        
    })

    mainWindow.loadFile('index.html')

      
    setMainMenu(mainWindow)
}

app.whenReady().then(() => {
  createWindow()
})