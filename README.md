# TMU-CWRU Symposium Website

这是TMU-CWRU研讨会的官方网站。

## 部署说明

该网站使用GitHub Pages进行部署。要部署网站，请按照以下步骤操作：

1. 将代码推送到main分支
2. GitHub Actions将自动构建并部署网站到gh-pages分支
3. 网站将在几分钟内更新

## 本地开发

要在本地预览网站，只需使用任何HTTP服务器，例如：
```bash
python -m http.server 8000
```

然后在浏览器中访问 `http://localhost:8000`