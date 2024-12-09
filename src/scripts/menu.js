const { app, Menu } =  require('electron')

function setMainMenu(mainWindow){
    const template = [
        {
            label: 'App',
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                //  role: 'services' },
                //{ type: 'separator' },
                //{ role: 'hide' },
                //{ role: 'hideOthers' },
                //{ role: 'unhide' },
                //{ type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: 'View',
            submenu: [
              { role: 'reload' },
              { role: 'forceReload' },
              { role: 'toggleDevTools' },
              { type: 'separator' },
              { role: 'resetZoom' },
              { role: 'zoomIn' },
              { role: 'zoomOut' },
              { type: 'separator' },
              { role: 'togglefullscreen' }
            ]
          }
    ]
    
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

module.exports = {
    setMainMenu
}