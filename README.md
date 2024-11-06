
# Project Setup Guide

This guide provides instructions to set up Node.js and npm on Linux (Ubuntu and Arch) and initialize a Next.js project.

## Prerequisites

Make sure you have Git installed. To check if Git is installed, run:

```bash
git --version
```

If Git is not installed, you can install it with the following commands:

- **Ubuntu**: `sudo apt update && sudo apt install git`
- **Arch**: `sudo pacman -Syu && sudo pacman -S git`

Make sure you have mariadb or mysql installed.
- **Ubuntu**:
```bash
sudo apt install mariadb-server mariadb-client  mysql-workbench-community
```

- **Arch**:
```bash
sudo pacman -S mariadb mysql-workbench
```
## Import the database

Open workbench and import the struct from @/sql/aastuMeal

## Setting Up Node.js and npm

Node.js and npm are required to run a Next.js project.

### Ubuntu

1. **Update the package list**:

   ```bash
   sudo apt update
   ```

2. **Install Node.js and npm**:

   Ubuntu’s repositories may not have the latest version. We recommend installing via `nvm` (Node Version Manager) to manage different versions easily.

   **Install nvm**:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   ```

   **Load nvm**:

   ```bash
   source ~/.bashrc
   ```

   **Install Node.js (LTS)**:

   ```bash
   nvm install --lts
   ```

   **Verify the installation**:

   ```bash
   node -v
   npm -v
   ```

### Arch Linux

1. **Install Node.js and npm** directly from the official repositories:

   ```bash
   sudo pacman -Syu nodejs npm
   ```

2. **Verify the installation**:

   ```bash
   node -v
   npm -v
   ```

## Setting Up a Next.js Project

1. **Navigate to the desired project directory**:

   ```bash
   cd /path/to/your/project-directory
   ```

2. **Initialize a Next.js project**:

   Use `npm` to initialize the Next.js app.

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Access the application**:

   Open your browser and go to [http://localhost:3000](http://localhost:3000) to see your Next.js app.
   If you are in a local network then [http://the-host-ip:3000](http://the-host-ip:3000), it is usually 192.168.x.x for wifi and 127.0.x.x for ethernet. To see your Next.js app.

## Additional Commands

- **Run the app quickly using the run.sh. It is located in the root(@/) folder.**
   - *Make the script executable*
      ```bash
      chmod + ./run.sh
      ```
   - *Run the script*
      ```bash
      ./run.sh
      ```

- **Build the app for production**:

  ```bash
  npm run build
  ```

- **Start the production server**:

  ```bash
  npm start
  ```

- **Lint the code**:

  ```bash
  npm run lint
  ```

## Troubleshooting

- If you encounter issues with permissions or the `nvm` command, ensure that `nvm` is correctly sourced in your `.bashrc` or `.zshrc` file. You can add the following to your profile file:

  ```bash
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
  ```

## Contributing

Please follow the project's contribution guidelines for any code changes or updates to documentation.

---

Enjoy building with Next.js on Linux!
