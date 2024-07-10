import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

const root = path.join(__dirname, '..');
const resolvePkg = (...parts) => path.join(root, ...parts, 'src', 'index.js');

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
	server: {
		open: './index.html',
		port: '3000',
	},
	// optimizeDeps: {
	// 	exclude: [
	// 		'preact',
	// 		'preact/compat',
	// 		'preact/debug',
	// 		'preact/hooks',
	// 		'preact/devtools',
	// 		'preact/jsx-runtime',
	// 		'preact/jsx-dev-runtime',
	// 		'preact-router',
	// 		'react',
	// 		'react-dom'
	// 	]
	// },
	// resolve: {
	// 	alias: {
	// 		'preact/debug/src/debug': path.join(root, 'debug', 'src', 'debug'),
	// 		'preact/devtools/src/devtools': path.join(
	// 			root,
	// 			'devtools',
	// 			'src',
	// 			'devtools'
	// 		),
	// 		//'preact/debug': resolvePkg('debug'),
	// 		'preact/devtools': resolvePkg('devtools'),
	// 		'preact/hooks': resolvePkg('hooks'),
	// 		'preact/jsx-runtime': resolvePkg('jsx-runtime'),
	// 		'preact/jsx-dev-runtime': resolvePkg('jsx-runtime'),
	// 		preact: resolvePkg(''),
	// 		'react-dom': resolvePkg('compat'),
	// 		react: resolvePkg('compat')
	// 	}
	// },
	// build: {
	// 	rollupOptions: {
	// 		input: {
	// 			// f45Trial: './src/index.html',
	// 		},
	// 		output: {
	// 			// format: 'iife',
	// 			// entryFileNames: `f45-trial-form.js`,
	// 			// chunkFileNames: `f45-trial-form.js`,
	// 			assetFileNames: (assetInfo) => {
	// 				let extType = assetInfo.name.split('.')[1];
	// 				if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
	// 					extType = 'images';
	// 				}
	// 				if (/css/i.test(extType)) {
	// 					extType = 'styles';
	// 				}
	// 				if (/woff|ttf|eot|woff2/i.test(extType)) {
	// 					extType = 'fonts';
	// 				}
	// 				return `${extType}/[name][extname]`;
	// 			},
	// 		},
	// 	},
	// },
	esbuild: {
		jsx: 'transform',
		jsxImportSource: 'talon',
		jsxDev: false,
		jsxFactory: 'createElement'
	}
});
