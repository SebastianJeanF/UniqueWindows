import { useContext } from 'react';
import { enumerate } from 'pythonic';
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
	const pdfDoc = new jsPDF();
	pdfDoc.text('Hello world!', 10, 10);
	// pdfDoc.save('a4.pdf');
	// return pdfDoc.output('datauristring');
	return pdfDoc;
}

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
	} catch (error) {
		// console.log(error);
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

async function generatePDF(rooms, event) {
	let pdfDoc = new jsPDF();
	addFormToPDF(event, pdfDoc);
	let title;
	let yPos = 20;
	let isFirstWindow = true;
	let isFirstRoom = true;
	const pageWidth = pdfDoc.internal.pageSize.getWidth();

	title = 'Quote Description';
	pdfDoc.setFont('helvetica', 'bold');
	pdfDoc.setFontSize(20);

	pdfDoc.text(title, getCenterX(title, pdfDoc), yPos);
	pdfDoc.setFontSize(16);
	pdfDoc.setFont('helvetica', 'normal');
	yPos += 15;

	for (let [rIndex, room] of enumerate(rooms)) {
		if (!isFirstRoom) {
			pdfDoc.addPage();
			yPos = 20;
		} else isFirstRoom = false;

		isFirstWindow = true;
		title = `Room: ${room.name}`;
		pdfDoc.setFont('helvetica', 'bold');
		pdfDoc.setFontSize(18);

		pdfDoc.text(title, getCenterX(title, pdfDoc), yPos);
		pdfDoc.setFontSize(16);
		pdfDoc.setFont('helvetica', 'normal');
		yPos += 20;
		for (let [index, window] of enumerate(room.windows)) {
			if (!isFirstWindow) {
				pdfDoc.addPage();
				yPos = 20;
			} else isFirstWindow = false;

			const pageHeight = pdfDoc.internal.pageSize.height - 20;
			let title = `Window ${index + 1}`;

			pdfDoc.text(title, getCenterX(title, pdfDoc), yPos);
			yPos += 15;
			for (let [key, value] of Object.entries(window)) {
				// console.log(key, value);
				// console.log(key == 'photo');

				if (key == 'img') continue;
				if (key == 'customTypePhotoReference' && !value) continue;
				if (yPos + 10 > pageHeight) {
					pdfDoc.addPage();
					yPos = 20; // Reset the vertical position for the new page
				}

				if (value && (key == 'photo' || key == 'customTypePhotoReference')) {
					yPos += 5;
					if (key == 'photo') title = 'Project Photo References:';
					else title = 'Custom Window Frame References:';
					pdfDoc.text(getCenterX(title, pdfDoc), yPos, title);
					yPos += 10;
					for (let file of value) {
						await getFileResolution(file)
							.then(async (resolution) => {
								const imageURL = URL.createObjectURL(file);
								const imageLink = await FirebaseFileUpload(file);
								const width = 75;
								const height = resolution.height * (width / resolution.width);
								if (yPos + height > pageHeight) {
									pdfDoc.addPage();
									yPos = 20; // Reset the vertical position for the new page
								}
								pdfDoc.addImage(imageURL, getCenterX(width, pdfDoc), yPos, width, height);
								yPos += 10 + height;
								const linkText = 'Project Photo Link';
								addLinkToPDF(pdfDoc, yPos, linkText, imageLink);
								yPos += 10;
							})
							.catch((error) => {
								// console.error('Error:', error.message);
							});
					}
					yPos += 2;
					pdfDoc.line(20, yPos, pageWidth - 20, yPos);
					yPos += 10;
					continue;
				}

				if (key == 'custom') {
					key = 'Custom Type';
					value = capitalizeFirstLetter(`${value}`);
				}
				if (key == 'height' || key == 'width') {
					if (!value) value = 'N/A';
					else value = `${value} in`;
				}
				if (key == 'price') {
					value = `$${value}`;
					// console.log('This is yPos', yPos, 'This is pageHeight, ', pageHeight);
				}
				if (key == 'interior' || key == 'exterior') {
					key = `${key} Color`;
				}
				key = capitalizeFirstLetter(key);
				// value = capitalizeFirstLetter(value);
				let text = `${key}: ${value}`;
				pdfDoc.text(getCenterX(text, pdfDoc), yPos, text);
				yPos += 10;
			}
		}
	}

	// await Promise.all(promises);
	return pdfDoc;
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
						// console.log(url);
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

function addLinkToPDF(pdfDoc, yPos, linkText, linkUrl) {
	let x;
	if (linkText == 'Project Photo Link') x = 20;
	else x = getCenterX(linkText, pdfDoc);
	pdfDoc.setTextColor(128, 128, 128);
	pdfDoc.textWithLink(linkText, getCenterX(linkText, pdfDoc), yPos, { url: linkUrl });
	pdfDoc.setTextColor(0, 0, 0);
}

export async function FirebaseFileUpload(file) {
	const storageRef = ref(storage, 'some-child-test');

	return new Promise((resolve, reject) => {
		uploadBytes(storageRef, file)
			.then((snapshot) => {
				getDownloadURL(snapshot.ref)
					.then((url) => {
						// console.log(url);
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

async function ContentfulUpload(link, contentType) {
	const day = new Date().getDate();
	const month = new Date().getMonth() + 1;
	const time = new Date().getTime();
	let subTitle;
	let sub2Title;
	const userClient = createAuthClient({
		accessToken: 'CFPAT-LGhcYfQLYGuJfheeSokUoWRLA5MUj6wxdr5vn5sTIOU',
		space: 'dd68j6yxui75',
	});
	const space = await userClient.getSpace('dd68j6yxui75');
	const env = await space.getEnvironment('master');
	if (contentType == 'quotes') {
		subTitle = 'quote';
		sub2Title = 'Quote';
	} else if (contentType == 'contactFormSubmisssions') {
		subTitle = 'contactForm';
		sub2Title = 'Contact Form';
	}
	const title = `(${month}-${day}) ${sub2Title}`;
	try {
		const asset = await env.createAsset({
			fields: {
				title: {
					'en-US': title,
				},
				file: {
					'en-US': {
						contentType: 'application/pdf',
						fileName: `${title}.pdf`,
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
			// console.log('Error warning');
		}
		const mediaAssetId = asset.sys.id;

		const entry = await env.createEntry(contentType, {
			fields: {
				title: {
					'en-US': title,
				},
				[subTitle]: {
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
	} catch (error) {
		// console.log(error);
	}
}
export function PDFGenerator() {
	const selectedRoom = useContext(QuoteRoomsContext).selectedRoom;

	const handleGeneratePDF = async () => {
		let pdfDoc = await generatePDF(selectedRoom);
		let link = await FirebaseForm(pdfDoc);
		ContentfulUpload(link, 'quotes');
	};

	return (
		<div>
			<button onClick={handleGeneratePDF}>Generate PDF</button>
		</div>
	);
}

const getTextWidth = (text, pdfDoc) =>
	(pdfDoc.getStringUnitWidth(text) * pdfDoc.internal.getFontSize()) / pdfDoc.internal.scaleFactor;
const getCenterX = (text, pdfDoc) => {
	let textWidth;
	if (typeof text == 'number') {
		textWidth = text;
	} else {
		textWidth = getTextWidth(text, pdfDoc);
	}
	const pageWidth = pdfDoc.internal.pageSize.getWidth();
	return (pageWidth - textWidth) / 2;
};

export async function uploadContactForm(data, files) {
	let pdfDoc = new jsPDF();
	let title;
	let yPos = 20;

	title = 'Contact Form Description';
	pdfDoc.setFont('helvetica', 'bold');
	pdfDoc.setFontSize(20);

	pdfDoc.text(title, getCenterX(title, pdfDoc), yPos);
	pdfDoc.setFontSize(16);
	pdfDoc.setFont('helvetica', 'normal');
	yPos += 15;
	// console.log('This is data from contact form', data.getAll());
	const pageHeight = pdfDoc.internal.pageSize.height - 20;
	data.forEach(async (value, key) => {
		if (!value) value = 'N/A';
		if (key == 'Image') {
		} else {
			let entry = `${key}: ${value}`;
			pdfDoc.text(entry, getCenterX(entry, pdfDoc), yPos);
			yPos += 10; // Ad}just the vertical position for the next line
		}
	});

	for (let file of files) {
		const linkText = 'Photo Link';
		const linkUrl = await FirebaseFileUpload(file);
		yPos += 10;
		await getFileResolution(file)
			.then((resolution) => {
				const imageURL = URL.createObjectURL(file);
				const width = 75;
				const height = resolution.height * (width / resolution.width);
				if (yPos + height > pageHeight) {
					pdfDoc.addPage();
					yPos = 20; // Reset the vertical position for the new page
				}

				pdfDoc.addImage(imageURL, 'JPEG', getCenterX(width, pdfDoc), yPos, width, height);
				yPos += 10 + height;
				// console.log('Resolution:', resolution.width, 'x', resolution.height);
			})
			.catch((error) => {
				// console.error('Error:', error.message);
			});
		yPos += 10;

		addLinkToPDF(pdfDoc, yPos, linkText, linkUrl);
	}
	// let link = await FirebaseForm(pdfDoc);
	// ContentfulUpload(link, 'contactFormSubmisssions');
}

function addFormToPDF(event, pdfDoc) {
	const fullName = event.target.elements.full_name.value;
	const number = event.target.elements.phone_number.value;
	const email = event.target.elements.email.value;
	const address = event.target.elements.address.value;
	const city = event.target.elements.city.value;
	const zipcode = event.target.elements.zipcode.value;
	const comment = event.target.elements.comment.value;
	let ypos = 15;
	let xpos = 20;
	const month = new Date().getMonth();
	const time = new Date().getTime();
	const day = new Date().getDate();
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const selectedMonthName = months[month];
	// Create a new jsPDF instance

	const title = `Quote Form | ${selectedMonthName} ${day} `;
	pdfDoc.setFont('helvetica', 'bold');
	pdfDoc.setFontSize(20);

	pdfDoc.text(title, getCenterX(title, pdfDoc), ypos);
	pdfDoc.setFontSize(16);
	pdfDoc.setFont('helvetica', 'normal');

	ypos += 20;
	pdfDoc.text(`Full Name: ${fullName}`, xpos, ypos);
	ypos += 10;
	pdfDoc.text(`Phone Number: ${number}`, xpos, ypos);
	ypos += 10;
	pdfDoc.text(`Email: ${email}`, xpos, ypos);
	ypos += 10;
	pdfDoc.text(`Address: ${address}`, xpos, ypos);
	ypos += 10;
	pdfDoc.text(`City: ${city}`, xpos, ypos);
	ypos += 10;
	pdfDoc.text(`Zip Code: ${zipcode}`, xpos, ypos);
	ypos += 10;
	pdfDoc.text(`Comment: ${comment}`, xpos, ypos);

	pdfDoc.addPage();
}

export async function completeQuote(event, rooms) {
	event.preventDefault();
	let pdfDoc = await generatePDF(rooms, event);
	let link = await FirebaseForm(pdfDoc);
	ContentfulUpload(link, 'quotes');
	// Save the PDF
}
