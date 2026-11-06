# CAFA
Granger Innovation Prize

# Node Server Setup
1. Make sure you have `node` and `npm` installed on your machine

    On arch-linux based distros:
    ```shell
    sudo pacman -Syu nodejs npm
    ```


    On debian-linux based distros:
    ```shell
    sudo apt update && sudo apt install nodejs npm
    ```


    On linux systems with the dnf package manager:
    ```shell
    sudo dnf upgrade --refresh && sudo dnf install nodejs nodejs-npm
    ```


    On MacOS/OSX, assuming you have the [brew package manager](https://brew.sh/) installed, run:
    ```shell
    brew install node
    ```


    On Windows Devices, either visit the [nodejs download](https://nodejs.org/en/download) page,
    and run the installer, or install using `winget` on newer versions of Windows by running:
    ```powershell
    winget install -e --id OpenJS.NodeJS
    ```

2. Ensure `node` and `npm` are both in PATH environment variable after installation

    The following should yield some sort of output resembling a version number:
    ```shell
    node --version
    npm --version
    ```


    Example output:
    ```
    v24.8.0
    11.6.0
    ```

3. Clone the repository and cd into it

    > The following command should be run in the [git-bash](https://git-scm.com/install/windows) terminal for Windows
    ```shell
    git clone https://github.com/camaya045/CAFA && cd CAFA
    ```

4. Install server dependencies

    ```shell
    npm install
    ```

# Initial Setup Notes For Team

create `package.json` file:
```sh
npm init -y
```

install express js:
```sh
npm install express
```

start nodejs server on https://localhost:5000 with
```sh
npm start
```
