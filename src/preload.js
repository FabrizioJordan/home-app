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
  const count = +$coprocess.env.TERMunt.innerHTML
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


if(platform === "win32"){
    // Ejemplo de cómo usar la función para ejecutar y manejar un comando
executeAndHandleResult('getWindowsType', windowsType => {

    const sanitizedWindowsType = windowsType.replace("Microsoft ", "");
    $('.system').innerHTML = sanitizedWindowsType;
    $('.systemType').innerHTML = "Windows";

    // para saber el nombre de usuario para modificar el elemento
    $('#userName').innerHTML = process.env.USERNAME;

    });
}


    // Función para ejecutar un comando sin esperar una respuesta
    const executeCommandWithoutResponse = (commandName) => {
        ipcRenderer.send('executeCommandWithoutResponse', commandName);
    };


const $openWebExplorer = $('#openWebExplorer')
$openWebExplorer.addEventListener('click', () => {
    executeCommandWithoutResponse(`xdg-open https://google.com`);
})

const $openFileManager = $('#openFileManager')
$openFileManager.addEventListener('click', () => {
    executeCommandWithoutResponse(`$(xdg-mime query default inode/directory | awk -F. '{print $1}')`);
})

const $openCodeEditor = $('#openCodeEditor')
$openCodeEditor.addEventListener('click', () => {
    executeCommandWithoutResponse('code || code-oss || cursor');
})

const $openDiscord = $('#openDiscord')
$openDiscord.addEventListener('click', () => {
    executeCommandWithoutResponse(`discord`);
})


const $newTerminal = $('#newTerminal')
$newTerminal.addEventListener('click', () => {
    newSystemTerminal()
})
function newSystemTerminal(){
    // Ejemplo de cómo usar la función para ejecutar un comando sin esperar respuesta
    // reconocer que terminal usar en linux
    executeCommandWithoutResponse('kitty || konsole || xfce4-terminal || gnome-terminal || xterm');
}


        executeAndHandleResult('getLinuxDistro', linuxDistro => {
            $('.system').innerHTML = linuxDistro;
            useLinuxDistroImg(linuxDistro);
        });

        function useLinuxDistroImg(linuxDistro) {
            const distro = linuxDistro.toLowerCase()
            const $distro_image = $('#distro_Image');

            switch (distro) {
                case 'arch linux':
                    $distro_image.src = "public/icons/distros/arch_linux.png";
                    break;
                case 'ubuntu':
                    $distro_image.src = "public/icons/distros/ubuntu_linux.png";
                    break;
                case 'linux mint':
                    $distro_image.src = "public/icons/distros/mint-linux.png";
                    break;
                case 'fedora':
                    $distro_image.src = "public/icons/distros/fedora_linux.png";
                    break;
                case 'debian gnu/linux':
                    $distro_image.src = "public/icons/distros/debian_linux.png";
                    break;
                case 'zorin os':
                    $distro_image.src = "public/icons/distros/zorin_linux.png";
                    break;
                case 'centos':
                    $distro_image.src = "public/icons/distros/centos_linux.png";
                    break;
                case 'red hat':
                    $distro_image.src = "public/icons/distros/redhat_linux.png";
                    break;
                case 'suse linux':
                    $distro_image.src = "public/icons/distros/suse_linux.png";
                    break;
                default:
                    console.error("Distro not recognized:", distro);
            }
        }

    // Function to get the desktop manager
    executeAndHandleResult('getLinuxDesktop', linuxDesktop => {
        $('.systemType').innerHTML = linuxDesktop
    });

    // Function to get the user name
    executeAndHandleResult('getLinuxUserName', userName => {
        $('#userName').innerHTML = userName;
    });

    // Function to get the window manager
    executeAndHandleResult('getLinuxWM', linuxWM => {
        $('#windowManager').innerHTML = linuxWM;
    });



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

    $('#btnChangeDesktop').addEventListener('click', () => {              //cambiar escritorio
        executeCommandWithoutResponse('bspc quit');
        executeCommandWithoutResponse('cinnamon-session-quit --no-prompt');
    })


// loader
setTimeout(() => {
    $('#divLoader').classList.add('divLoader-out');

    setTimeout(() => {
        $('#divLoader').classList.add('hidden');
    }, 1500);
}, 500)


/*
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
*/

const userConsole = document.querySelectorAll('.userConsole')
for(let a = 0; a < userConsole.length; a++) {
    userConsole[a].innerHTML = "user";
    if(userConsole[a].tagName === 'SPAN') {
        userConsole[a].innerHTML = "User";
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









});
