# Quick Start

## Creating a Cabloy-Front Application

### 1. Prerequisites

```bash
# install pnpm
$ npm install -g pnpm
# install @cabloy/cli
$ pnpm add -g @cabloy/cli
```

### 2. Create Project

```bash
$ cabloy front:create:project projectName
```

1. Directly execute `cabloy` on the command line to create a project named `projectName`
2. The command line will output a list of templates, and the currently provided templates are as follows:

   - cabloy-front + antdv
   - cabloy-front + element-plus
   - cabloy-front + quasar
   - cabloy-front + vuetify
   - cabloy-front only

3. Here, we choose `cabloy-front only`

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
