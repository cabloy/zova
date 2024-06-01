# 快速上手

## 创建一个Cabloy-Front应用

### 1. 前置条件

```bash
# 安装pnpm
$ npm install -g pnpm
# 安装zova-cli
$ pnpm add -g zova-cli
```

### 2. 创建项目

```bash
$ zova :create:project projectName
```

1. 直接在命令行执行`cabloy`创建一个项目，名称为`projectName`
2. 命令行会列出模版列表，当前提供的模版如下：

   - zova + antdv
   - zova + element-plus
   - zova + quasar
   - zova + vuetify
   - zova only

3. 在这里，我们选择`zova only`

### 3. 安装依赖

```bash
$ pnpm install
```

### 4. 启动开发服务

```bash
$ npm run dev
```

### 5. 构建项目

```bash
$ npm run build
```
