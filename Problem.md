### 问题记录

 - create-react-app启动报（webpack或其他插件）版本错误

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


 