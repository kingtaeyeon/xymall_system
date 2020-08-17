/*
 * 此文件是 create-react-app 官方推荐的一个库 customize-cra 的拓展文件
 * 实际上是拓展webpack的功能
 * 所以是基于common模块化的规范
 * 项目中是基于es木奎阿华的规范
 */
const {
    override,
    fixBabelImports,
    addLessLoader
} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: "es",
        //style 的选项'css' 表示引入的css文件 true表示引入的less
        style: true,
    }),
    //这里设置less
    //同时是定制ant-design的主题
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#d214a2',
            '@font-size-base': '12px'
        }
    }),
);
