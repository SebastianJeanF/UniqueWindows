import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// https://vitejs.dev/config/
import svgr from 'vite-plugin-svgr';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
	root,
	plugins: [svgr(), react()],
	build: {
		outDir,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(root, 'index.html'),
				// about: resolve(root, 'index.html'),

				about: resolve(root, 'about', 'index.html'),
				products: resolve(root, 'products', 'index.html'),
				payment: resolve(root, 'payment', 'index.html'),
				contact: resolve(root, 'contact', 'index.html'),
				quote: resolve(root, 'quote', 'index.html'),
				terms: resolve(root, 'terms', 'index.html'),
			},
		},
	},
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { resolve } from 'path';
// // https://vitejs.dev/config/
// import svgr from 'vite-plugin-svgr';

// const root = resolve(__dirname, 'src');
// const outDir = resolve(__dirname, 'dist');

// export default defineConfig({
// 	base: '/Window-Project/',
// 	root,
// 	plugins: [svgr(), react()],
// 	build: {
// 		outDir,
// 		emptyOutDir: true,
// 		rollupOptions: {
// 			input: {
// 				main: resolve(root, 'index.html'),
// 				about: resolve(root, 'about', 'index.html'),
// 				products: resolve(root, 'products', 'index.html'),
// 				payment: resolve(root, 'payment', 'index.html'),
// 				contact: resolve(root, 'contact', 'index.html'),
// 				quote: resolve(root, 'quote', 'index.html'),
// 				terms: resolve(root, 'terms', 'index.html'),
// 			},
// 		},
// 	},
// });
