import { useContext } from 'react';

import img1 from '../assets/custom/IMG_5162.jpg';
import { storage } from '../components/Firebase.js';
import { ref, uploadBytes, getDownloadURL, uploadString } from 'firebase/storage';

import customWindowImg from '../assets/quote/questionMark.png';

import { QuoteRoomsContext } from '../context/Context';
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

const quoteData = {
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
		env.createEntry('quotes', contentfulData);
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
const capitalizeFirstLetter = (string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

async function generatePDF(room, event) {
	let doc = new jsPDF();
	addFormToPDF(event, doc);

	let initialized = false;
	for (let window of room.windows) {
		if (initialized) doc.addPage();
		else initialized = true;

		let yPos = 20;
		const pageHeight = doc.internal.pageSize.height - 20;

		for (let [key, value] of Object.entries(window)) {
			console.log(key, value);
			console.log(key == 'photo');

			if (key == 'img') continue;

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
				key = capitalizeFirstLetter(key);
				// value = capitalizeFirstLetter(value);
				doc.text(20, yPos, `${key}: ${value}`);
				yPos += 10;
			}
		}
	}
	// await Promise.all(promises);
	return doc;
}

async function FirebaseForm(pdfDoc) {
	const imageRef = ref(storage, `contact/images/${Math.random().toString(18).substring(2)}.pdf`);
	// const pdfBlob = await fetch(pdfDoc.output('blob')).then((response) => response.blob());
	// uploadBytes(imageRef, pdfBlob, { contentType: 'application/pdf' }).then((snapshot) => {
	// 	getDownloadURL(snapshot.ref).then((url) => {
	// 		console.log(url);
	// 	});
	// });
	const pdfContent = pdfDoc.output('datauristring').split(',')[1]; // Extract the base64-encoded content

	return new Promise((resolve, reject) => {
		uploadString(imageRef, pdfContent, 'base64', { contentType: 'application/pdf' })
			.then((snapshot) => {
				getDownloadURL(snapshot.ref)
					.then((url) => {
						console.log(url);
						resolve(url); // Resolve the Promise with the URL
					})
					.catch((error) => {
						reject(error); // Reject the Promise if there's an error with getDownloadURL
					});
			})
			.catch((error) => {
				reject(error); // Reject the Promise if there's an error with uploadString
			});
	});
}
export async function FirebaseFileUpload(file) {
	console.log('This is selectedFile', file);

	const storageRef = ref(storage, 'some-child-test');

	return new Promise((resolve, reject) => {
		uploadBytes(storageRef, file)
			.then((snapshot) => {
				getDownloadURL(snapshot.ref)
					.then((url) => {
						console.log(url);
						resolve(url); // Resolve the Promise with the URL
					})
					.catch((error) => {
						reject(error); // Reject the Promise if there's an error with getDownloadURL
					});
			})
			.catch((error) => {
				reject(error); // Reject the Promise if there's an error with uploadString
			});
	});
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
	try {
		// env.createEntry('testUser', contentfulData);
		const asset = await env.createAsset({
			fields: {
				title: {
					'en-US': `Quote${Math.random().toString(15)}`,
				},
				file: {
					'en-US': {
						contentType: 'application/pdf',
						fileName: `${new Date().getDate()}.pdf`,
						upload: link,
					},
				},
			},
		});

		// Process and publish the Asset
		await asset.processForAllLocales();
		try {
			await asset.publish();
		} catch {
			console.log('Error warning');
		}
		const mediaAssetId = asset.sys.id;
		console.log('This is asset id', mediaAssetId);
		const day = new Date().getDate();
		const month = new Date().getMonth();
		const time = new Date().getTime();

		const entry = await env.createEntry('quotes', {
			fields: {
				title: {
					'en-US': `${month}-${day} Quote${time}}`,
				},
				quote: {
					'en-US': {
						sys: {
							type: 'Link',
							linkType: 'Asset',
							id: mediaAssetId,
						},
					},
				},
			},
		});

		// Publish the entry to make it visible
		await entry.publish();

		// Retrieve the URL of the published Asset
		// const assetUrl = `https:${asset.fields.file['en-US'].url}`;
		console.log('SUCCESS');
	} catch (error) {
		console.log(error);
	}
}
export function PDFGenerator() {
	const selectedRoom = useContext(QuoteRoomsContext).selectedRoom;

	const handleGeneratePDF = async () => {
		let pdfDoc = await generatePDF(selectedRoom);
		let link = await FirebaseForm(pdfDoc);
		ContentfulUpload(link);
	};

	return (
		<div>
			<button onClick={handleGeneratePDF}>Generate PDF</button>
		</div>
	);
}

export async function completeQuote(event, selectedRoom) {
	event.preventDefault();
	let pdfDoc = await generatePDF(selectedRoom, event);
	let link = await FirebaseForm(pdfDoc);
	ContentfulUpload(link);
	// Save the PDF
}
function addFormToPDF(event, pdfDoc) {
	const fullName = event.target.elements.full_name.value;
	const email = event.target.elements.email.value;
	const address = event.target.elements.address.value;
	const city = event.target.elements.city.value;
	const zipcode = event.target.elements.zipcode.value;
	const comment = event.target.elements.comment.value;

	// Create a new jsPDF instance

	// Format the PDF content
	pdfDoc.setFontSize(14);
	pdfDoc.text('Quote Form', 10, 10);
	pdfDoc.setFontSize(12);
	pdfDoc.text(`Full Name: ${fullName}`, 10, 20);
	pdfDoc.text(`Email: ${email}`, 10, 30);
	pdfDoc.text(`Address: ${address}`, 10, 40);
	pdfDoc.text(`City: ${city}`, 10, 50);
	pdfDoc.text(`Zip Code: ${zipcode}`, 10, 60);
	pdfDoc.text(`Comment: ${comment}`, 10, 70);
	pdfDoc.addPage();
}
