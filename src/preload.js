document.addEventListener("DOMContentLoaded", function() {

    const FIRST_RUN_KEY = 'firstRunCompleted';

    // Comprueba si es la primera vez que se ejecuta la app
    if (!localStorage.getItem(FIRST_RUN_KEY)) {
        // Limpiar el localStorage
        localStorage.clear();
        // Establece la bandera para indicar que la app ha sido ejecutada por primera vez
        localStorage.setItem(FIRST_RUN_KEY, 'true');
    }

const { ipcRenderer } = require('electron');

const $ = selector => document.querySelector(selector)
/*const $count = $('#count')

$button.addEventListener('click', () => {
  const count = +$count.innerHTML
  $count.innerHTML = (count + 1).toString()
})
*/

const platform = process.platform;
    

 // Función para ejecutar un comando y manejar el resultado
window.executeAndHandleResult = async (commandName, resultHandler) => {
    try {
        const result = await ipcRenderer.invoke('executeCommand', commandName);
        if (result !== null && resultHandler) {
            resultHandler(result);
        }
    } catch (error) {
        console.error(`Error al ejecutar ${commandName}:`, error);
    }
};


// Ejemplo de cómo usar la función para ejecutar y manejar un comando
executeAndHandleResult('getWindowsType', windowsType => {

    const sanitizedWindowsType = windowsType.replace("Microsoft ", "");
    $('.system').innerHTML = sanitizedWindowsType;
    $('.systemType').innerHTML = "Windows";
    $('#windowManager').innerHTML = "DWM";

    const $distro_image = $('#distro_Image')

    if ($distro_image) {
        // Continuar solo si el elemento existe
        if (windowsType.includes("Microsoft Windows 11")) {
            $distro_image.src = "./assets/icons/distros/Windows11_logo.ico";
        } else if (windowsType.includes("Microsoft Windows 10")) {
            $distro_image.src = "./assets/icons/distros/Windows10_logo.ico";
        }
    } else {
        console.error("El elemento 'distro_Image' no se encontró en el DOM.");
    }

    // para saber el nombre de usuario para modificar el elemento
    $('#userName').innerHTML = process.env.USERNAME;

});

    // Función para ejecutar un comando sin esperar una respuesta
    const executeCommandWithoutResponse = (commandName) => {
        ipcRenderer.send('executeCommandWithoutResponse', commandName);
    };


const $openWebExplorer = $('#openWebExplorer')
$openWebExplorer.addEventListener('click', () => {
    if(platform == "win32"){
        executeCommandWithoutResponse('start https://google.com');
    }else if(platform == "linux"){
        executeCommandWithoutResponse(`xdg-open https://google.com`);
    }
})

const $openVSCode = $('#openVSCode')
$openVSCode.addEventListener('click', () => {
    executeCommandWithoutResponse('code');
})


if(platform === 'win32') {

    const $openDiscord = $('#openDiscord')
    const discordPath = `start "" "%LocalAppData%\Discord\Update.exe" --processStart Discord.exe`;
    $openDiscord.addEventListener('click', () => {
        executeCommandWithoutResponse(`node openDiscord.js`);
    })
        
    const $openFolders = $('#openFolders')
    $openFolders.addEventListener('click', () => {
        executeCommandWithoutResponse('explorer');
    })

}
    
const $newTerminal = $('#newTerminal')
$newTerminal.addEventListener('click', () => {
    newSystemTerminal()
})

function newSystemTerminal(){

    // Ejemplo de cómo usar la función para ejecutar un comando sin esperar respuesta
    if(platform === "win32"){
        executeCommandWithoutResponse('start cmd');
    }else if(platform === "linux"){
        executeCommandWithoutResponse('kitty');
    }else if(platform === "darwin"){
        executeCommandWithoutResponse('open -a Terminal');
    }
    
}

if (platform === "linux"){


    const $openDiscord = $('#openDiscord')
    $openDiscord.addEventListener('click', () => {
        executeCommandWithoutResponse(`discord`);
    })


        let linuxDistro1 = "";
        let linuxDistro2 = "";

        executeAndHandleResult('getLinuxDistro', linuxDistro => {
            $system.innerHTML = linuxDistro;
            linuxDistro1 = linuxDistro;
            useLinuxDistroImg();
        });

        executeAndHandleResult('getLinuxDistro2', linuxDistro => {
            $system.innerHTML = linuxDistro;
            linuxDistro2 = linuxDistro;
            useLinuxDistroImg();
        });

        function useLinuxDistroImg() {
            const distro = linuxDistro1.toLowerCase() || linuxDistro2.toLowerCase();
            const $distro_image = $('#distro_Image');

            switch (distro) {
                case 'arch':
                    $distro_image.src = "./assets/icons/distros/arch_linux.ico";
                    break;
                case 'mint':
                    $distro_image.src = "./assets/icons/distros/mint_linux.ico";
                    break;
                case 'ubuntu':
                    $distro_image.src = "./assets/icons/distros/ubuntu_linux.ico";
                    break;
                case 'fedora':
                    $distro_image.src = "./assets/icons/distros/fedora_linux.ico";
                    break;
                case 'debian':
                    $distro_image.src = "./assets/icons/distros/debian_linux.ico";
                    break;
                case 'zorin':
                    $distro_image.src = "./assets/icons/distros/zorin_linux.ico";
                    break;
                case 'centos':
                    $distro_image.src = "./assets/icons/distros/centos_linux.ico";
                    break;
                case 'redhat':
                    $distro_image.src = "./assets/icons/distros/redhat_linux.ico";
                    break;
                case 'suse':
                    $distro_image.src = "./assets/icons/distros/suse_linux.ico";
                    break;
                default:
                    console.error("Distro no reconocida:", distro);
            }
        }

    executeAndHandleResult('getLinuxDesktop', linuxDesktop => {
        console.log(`Entorno de escritorio: ${linuxDesktop}`);
        $systemType.innerHTML = linuxDesktop
    });

    // Función para saber el nombre de usuario para modificar el elemento
    executeAndHandleResult('getLinuxUserName', userName => {
        console.log(`Nombre de usuario (L): ${userName}`);
        $('#userName').innerHTML = userName;
    });


}


// change avatar - variables
const $navPutAvatar = $('#nav_putAvatar');
const $avatar = $('#avatar');

// Key para guardar el avatar en localStorage
const AVATAR_STORAGE_KEY = 'userAvatar';

// change avatar - code
$avatar.addEventListener('click', () => {
    $navPutAvatar.classList.toggle('hidden');
});

$('#putAvatar').onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            // Mostrar la imagen en el avatar
            $avatar.src = fr.result;
            // Guardar la imagen en localStorage
            localStorage.setItem(AVATAR_STORAGE_KEY, fr.result);
        };
        fr.readAsDataURL(files[0]);
    }
};

// Cargar el avatar desde localStorage al cargar la página
window.addEventListener('load', () => {
    const savedAvatar = localStorage.getItem(AVATAR_STORAGE_KEY);
    if (savedAvatar) {
        $avatar.src = savedAvatar;
    }
});



// changeDesktop
$('#changeDesktop').addEventListener('click', () => {
    $('#menuDesktop').classList.toggle('hidden')
})
if(platform === 'linux'){
    $('#btnChangeDesktop').addEventListener('click', () => {              //cambiar escritorio
        executeCommandWithoutResponse('bspc quit');
        executeCommandWithoutResponse('cinnamon-session-quit --no-prompt');
    })
}


$('#distro_Image').addEventListener('click', () => {
    $('#menuLogOut').classList.toggle('hidden')
})

$('#logOut').addEventListener('click', () => {              //cerrar sesión
    if(platform === 'linux'){
        executeCommandWithoutResponse('gnome-session-quit --logout');
    }else if(platform === 'win32'){
        executeCommandWithoutResponse('logoff');
    }
})

$('#powerOff').addEventListener('click', () => {            //apagar
    if(platform === 'linux'){
        executeCommandWithoutResponse('gnome-session-quit --power-off');
    }else if(platform === 'win32'){
        executeCommandWithoutResponse('shutdown /s /t 5');
    }
})

$('#reboot').addEventListener('click', () => {              //reiniciar
    if(platform === 'linux'){
        executeCommandWithoutResponse('gnome-session-quit --reboot');
    }else if(platform === 'win32'){
        executeCommandWithoutResponse('shutdown /r');
    }
})


// loader
setTimeout(() => {
    $('#divLoader').classList.add('divLoader-out');

    setTimeout(() => {
        $('#divLoader').classList.add('hidden');
    }, 1500);
}, 500)



/// Listado de archivos en Windows
executeAndHandleResult('getWindowsHomeFiles', files => {
    const filteredFiles = files.split('\n').filter(line => !line.includes('P�gina de c�digos activa: 65001')).join('\n');

    const fileList = filteredFiles.split('\n');

    const fileListContainer = $('#listOfFiles');
    fileListContainer.innerHTML = ''; // Limpiar cualquier contenido previo

    fileList.forEach(file => {
        const fileElement = document.createElement('p');
        fileElement.textContent = file;
        fileListContainer.appendChild(fileElement);
    });
});


const userConsole = document.querySelectorAll('.userConsole')
for(let a = 0; a < userConsole.length; a++) {
    userConsole[a].innerHTML = `${process.env.USERNAME}@${process.env.USERNAME}`;
    if(userConsole[a].tagName === 'SPAN') {
        userConsole[a].innerHTML = `${process.env.USERNAME}@${process.env.USERNAME.charAt(0).toUpperCase() + process.env.USERNAME.slice(1)}`;
    }
}


// lang
let systemLanguage = "";
const langProcess = (process.env.LANG || "").split('.')[0]; // Manejo de LANG no definido

if(langProcess === "en_US"){
    systemLanguage = "en_US";
} else if(langProcess === "es_ES"){
    systemLanguage = "es_ES";
}

let documentsPath = `C:\\Users\\${process.env.USERNAME}\\Documents`;
if (systemLanguage === "es_ES"){
    documentsPath = `C:\\Users\\${process.env.USERNAME}\\Documentos`;
}













});

