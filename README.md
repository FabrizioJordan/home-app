# 🚀 Welcome to Linux Home App!

Home App for Daily Linux Use
Built with Electron.


App to do daily tasks on Linux.


1. System monitoring

2. File management

Shortcuts :

1. Terminal
2. Browser
3. Email (in progress)
5. Settings (in progress)
6. File manager (in progress)
7. Code editor

*You can add more shortcuts to the app.*



### To run the app for Linux. (Development)

```
git clone https://github.com/fabriciojordang/home-app.git
```

```
cd home-app
```

```
npm install
```

(make changes to the code)

```
npm run dev
```



### To build the app for Linux:


This project has three build options:


With electron-packager: (build in /epackager-builds)
(This is the default build option)

```
npm run package-linux
```

or

```
yarn package-linux
```

With electron-builder: (build in /ebuilder-builds)


```
npm run build
```

or

```
yarn build
```

With electron-forge: (build in /eforge-builds)


```
npm run package
```

or

```
yarn package
```



Contribute to the project:

You need to modify the build options?

For electron-packager modify the package.json file in the scripts section.

For electron-forge modify the forge.config.js file. (or the package.json file in the scripts section)

For electron-builder modify the package.json file in the build section.


*You can add more features to the app with a PR.*

By: Fabricio Jordán