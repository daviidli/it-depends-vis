const {
	override,
	fixBabelImports,
	addLessLoader,
	addWebpackModuleRule
} = require('customize-cra');

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: { '@primary-color': '#f5222d' }
	}),
	addWebpackModuleRule({
		test: /\.md$/,
		use: { loader: 'raw-loader' }
	})
);
