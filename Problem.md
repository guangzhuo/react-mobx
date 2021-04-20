### 问题记录

 - create-react-app启动报（webpack或其他插件）版本错误， 如图：

    ![avatar](https://user-gold-cdn.xitu.io/2020/5/14/1721136309dc9625?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

     > 问题原因：全局环境与当前项目版本冲突
     > 
     > 解决方案：
     > 
     >  1.卸载全局webpack，重新启动
     > 
     >  2.升级全局webpack版本跟项目版本相同 (不推荐)
     > 
     >  3.在项目根目录创建一个 .env 文件，然后添加以下代码：SKIP_PREFLIGHT_check = true (不推荐)


 - npm 7中引入的一项新功能是自动安装peer dependencies。在npm的之前版本（4-6）中，peer dependencies冲突会有版本不兼容的警告，但仍会安装依赖并不会抛出错误。在npm 7中，如果存在无法自动解决的依赖冲突，将会阻止安装

    > Fix the upstream dependency conflict, or retry this command with --force, or --legacy-peer-deps to accept an incorrect (and potentially broken) dependency resolution.
   > 
    > 解决方案：
   > 
    > npm i XXX --legacy-peer-deps
   > 
    > 说明：--legacy-peer-deps：安装时忽略所有peerDependencies，其样式为npm版本4到版本6 