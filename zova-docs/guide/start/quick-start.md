# Quick Start

## Creating a Zova Application

### 1. Prerequisites

- install pnpm

```bash
$ npm install -g pnpm
```

- install command-line tools

```bash
$ pnpm add -g zova-cli
```

- VS Code Extension: [Zova - Official](https://marketplace.visualstudio.com/items?itemName=cabloy.zova-vscode)

It is strongly recommended to install this VS Code extension to obtain a more convenient and pleasant development experience

### 2. Create Project

```bash
$ zova :create:project projectName
```

1. Directly execute `zova` on the command line to create a project named `projectName`
2. The command line will output a list of templates, and the currently provided templates are as follows:

   - zova + antdv
   - zova + element-plus
   - zova + quasar
   - zova + vuetify
   - zova only

3. Here, we choose `zova only`

### 3. Install Dependencies

```bash
$ pnpm install
```

### 4. Start Dev Server

```bash
$ npm run dev
```

### 5. Build

```bash
$ npm run build
```
