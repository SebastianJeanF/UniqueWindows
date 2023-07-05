import {
	MutableRefObject,
	useEffect,
	useContext,
	useRef,
	useState,
	useCallback,
	useLayoutEffect,
	useTransition,
	Fragment,
	useMemo,
} from 'react';

import img1 from '../assets/custom/IMG_5162.jpg';
import { storage } from '../components/Firebase.js';
import { ref, uploadBytes, getDownloadURL, uploadString } from 'firebase/storage';

import customWindowImg from '../assets/quote/questionMark.png';
import widthImg from '../assets/quote/measure-width-windows.png';
import heightImg from '../assets/quote/measure-height-windows.png';

import Masthead from '../components/NewMasthead';

import { Dialog, Disclosure, Transition, Menu, Listbox } from '@headlessui/react';
import {
	ChevronUpIcon,
	ChevronDownIcon,
	ChevronUpDownIcon,
	CheckIcon,
	PlusIcon,
	MinusIcon,
} from '@heroicons/react/20/solid';
import { PhotoIcon as TempPhoto } from '@heroicons/react/24/solid';
import {
	MinusCircleIcon,
	PhotoIcon,
	PencilSquareIcon,
	PlusCircleIcon,
	ShoppingCartIcon,
	TrashIcon,
	InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { LuUploadCloud } from 'react-icons/lu';
import { TiDelete } from 'react-icons/ti';
import { QuoteSwiperContext, QuoteRoomsContext, QuoteWindowContext } from '../context/Context';
import { createClient } from 'contentful';
import { createClient as createAuthClient } from 'contentful-management';

import React from 'react';
import jsPDF from 'jspdf';
import image1 from '../assets/quote/measure-height-windows.png';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { scaleBetween } from 'parallax-controller';

const client = createClient({
	space: 'dd68j6yxui75',
	accessToken: 'i0a0-vN1CNsoyPbHwtGBv4pxn4j3xKLMuJOrOR23hao',
});

const authClient = createAuthClient({
	accessToken: 'CFPAT-LGhcYfQLYGuJfheeSokUoWRLA5MUj6wxdr5vn5sTIOU',
	space: 'dd68j6yxui75',
});

let htmlData = '<p>This is some <strong>rich HTML</strong> content.</p>';

function createPDF() {
	const doc = new jsPDF();
	doc.text('Hello world!', 10, 10);
	// doc.save('a4.pdf');
	// return doc.output('datauristring');
	return doc;
}
// const richTextField = {
// 	nodeType: 'document',
// 	data: {},
// 	content: [
// 		{
// 			nodeType: 'paragraph',
// 			data: {},
// 			content: [
// 				{
// 					nodeType: 'text',
// 					value: 'This is some rich text content.\n\n',
// 					marks: [],
// 					data: {},
// 				},
// 				{
// 					nodeType: 'text',
// 					value: 'This is some rich text content.',
// 					marks: [{ type: 'bold' }],
// 					data: {},
// 				},
// 				{
// 					nodeType: 'text',
// 					value: 'This is some rich text content.',
// 					marks: [],
// 					data: {},
// 				},
// 			],
// 		},
// 		{
// 			nodeType: 'paragraph',
// 			data: {},
// 			content: [
// 				{
// 					nodeType: 'text',
// 					value: 'This is some rich text content.',
// 					marks: [],
// 					data: {},
// 				},
// 			],
// 		},
// 	],
// };
documentToHtmlString(htmlData);
const htmlField = {
	// 'en-US': documentToHtmlString(htmlData),
	'en-US': 'test',
};

const contentfulData = {
	fields: {
		info: {
			'en-US': 'React Data (Again)',
		},
		boolean: {
			'en-US': true,
		},
		html: htmlField,
	},
};

async function createEntry() {
	const space = await authClient.getSpace('dd68j6yxui75');
	const env = await space.getEnvironment('master');
	console.log('env', env);
	try {
		// env.createEntry('testUser', contentfulData);
		const asset = await env.createAsset({
			fields: {
				title: {
					'en-US': 'Generated PDF',
				},
				file: {
					'en-US': {
						contentType: 'application/pdf',
						fileName: 'generated2.pdf',
						// file: createPDF(),
						// upload:
						// 	'https://th.bing.com/th/id/R.86ce31fc4498703f6e0f127956f86174?rik=tdvAUmQahoowdg&pid=ImgRaw&r=0',
					},
				},
			},
			file: createPDF(),
		});

		// Process and publish the Asset
		await asset.processForAllLocales();
		await asset.publish();

		// Retrieve the URL of the published Asset
		const assetUrl = `https:${asset.fields.file['en-US'].url}`;
		console.log('PDF uploaded to Contentful:', assetUrl);
		console.log('SUCCESS');
	} catch (error) {
		console.log(error);
	}
}
// const space = authClient.getSpace('dd68j6yxui75');
// const env = space.getEnvironment('master');
const getFileResolution = (file) => {
	return new Promise((resolve, reject) => {
		const img = new Image();

		img.onload = () => {
			const resolution = {
				width: img.width,
				height: img.height,
			};

			resolve(resolution);
		};

		img.onerror = () => {
			reject(new Error('Failed to load image'));
		};

		const reader = new FileReader();

		reader.onload = (e) => {
			img.src = e.target.result;
		};

		reader.onerror = () => {
			reject(new Error('Failed to read file'));
		};

		reader.readAsDataURL(file);
	});
};

async function generatePDF(room) {
	const doc = new jsPDF();
	let initialized = false;
	for (let window of room.windows) {
		if (initialized) doc.addPage();
		else initialized = true;

		let yPos = 20;
		const pageHeight = doc.internal.pageSize.height - 20;

		for (const [key, value] of Object.entries(window)) {
			console.log(key, value);
			console.log(key == 'photo');

			if (value && (key == 'photo' || key == 'customPhotoReference')) {
				if (key == 'photo') doc.text(20, yPos, 'Project Photo References:');
				else if (key == 'customPhotoReference')
					doc.text(20, yPos, 'Custom Window Frame References: ');
				yPos += 10;
				for (let file of value) {
					await getFileResolution(file)
						.then((resolution) => {
							const imageURL = URL.createObjectURL(file);
							const width = 50;
							const height = resolution.height * (width / resolution.width);
							if (yPos + height > pageHeight) {
								doc.addPage();
								yPos = 20; // Reset the vertical position for the new page
							}
							doc.addImage(imageURL, 'JPEG', 20, yPos, width, height);
							yPos += 10 + height;
							console.log('Resolution:', resolution.width, 'x', resolution.height);
						})
						.catch((error) => {
							console.error('Error:', error.message);
						});
				}
			} else {
				if (yPos + 10 > pageHeight) {
					doc.addPage();
					yPos = 20; // Reset the vertical position for the new page
				}
				doc.text(20, yPos, `${key}: ${value}`);
				yPos += 10;
			}
		}
	}
	// await Promise.all(promises);
	doc.save('window_properties.pdf');
	let link = FirebaseForm(doc);
	ContentfulUpload(link);
}
async function FirebaseForm(pdfDoc) {
	const imageRef = ref(storage, `Sebastian/pdfs/test.pdf`);
	const pdfBlob = await fetch(pdfDoc.output('blob')).then((response) => response.blob());
	print('pdfBlob', pdfBlob);
	// uploadBytes(imageRef, pdfBlob, { contentType: 'application/pdf' }).then((snapshot) => {
	// 	getDownloadURL(snapshot.ref).then((url) => {
	// 		console.log(url);
	// 	});
	// });
	const pdfContent = pdfDoc.output('datauristring').split(',')[1]; // Extract the base64-encoded content

	uploadString(imageRef, pdfContent, 'base64', { contentType: 'application/pdf' }).then(
		(snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				console.log(url);
				return url;
			});
		}
	);
}

async function ContentfulUpload(link) {
	const userClient = createAuthClient({
		accessToken: 'CFPAT-LGhcYfQLYGuJfheeSokUoWRLA5MUj6wxdr5vn5sTIOU',
		space: 'dd68j6yxui75',
	});
	console.log('This is link', link);
	const space = await userClient.getSpace('dd68j6yxui75');
	const env = await space.getEnvironment('master');
	console.log('env', env);
	// try {
	// 	// env.createEntry('testUser', contentfulData);
	// 	const asset = await env.createAsset({
	// 		fields: {
	// 			title: {
	// 				'en-US': 'Generated PDF',
	// 			},
	// 			file: {
	// 				'en-US': {
	// 					contentType: 'application/pdf',
	// 					fileName: 'testing.pdf',
	// 					upload:
	// 						'https://firebasestorage.googleapis.com/v0/b/uniquewindows-84b19.appspot.com/o/Sebastian%2Fpdfs%2Ftest.pdf?alt=media&token=c64df0fb-a8a4-4bd4-b473-435ef141eb01',
	// 				},
	// 			},
	// 		},
	// 	});

	// 	// Process and publish the Asset
	// 	await asset.processForAllLocales();
	// 	await asset.publish();

	// 	// Retrieve the URL of the published Asset
	// 	const assetUrl = `https:${asset.fields.file['en-US'].url}`;
	// 	console.log('PDF uploaded to Contentful:', assetUrl);
	// 	console.log('SUCCESS');
	// } catch (error) {
	// 	console.log(error);
	// }
}
export function PDFGenerator() {
	const selectedRoom = useContext(QuoteRoomsContext).selectedRoom;

	const handleGeneratePDF = () => {
		generatePDF(selectedRoom);
	};

	return (
		<div>
			<button onClick={handleGeneratePDF}>Generate PDF</button>
		</div>
	);
}
