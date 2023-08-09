import { createClient } from 'contentful';
import { createClient as createAuthClient } from 'contentful-management';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { useState, useEffect, useContext } from 'react';
import { storage } from '../components/Firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PDFGenerator, completeQuote } from '../components/UploadQuote.jsx';
import { QuoteRoomsContext, QuoteCompleted } from '../context/Context';

function createPDF() {
	const doc = new jsPDF();
	doc.text('Hello world!', 10, 10);
	// doc.save('a4.pdf');
	// return doc.output('datauristring');
	return doc;
}

function FirebaseUpload() {
	const [imageUpload, setImageUpload] = useState();

	const uploadFile = () => {
		if (!imageUpload) return;

		const imageRef = ref(storage, `9jacoder/images/${imageUpload.name}`);

		uploadBytes(imageRef, imageUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				console.log(url);
			});
		});
	};

	// return (
	// 	<div className='App'>
	// 		<input
	// 			type='file'
	// 			onChange={(event) => {
	// 				setImageUpload(event.target.files[0]);
	// 			}}
	// 		/>
	// 		<button onClick={uploadFile}>Upload</button>
	// 	</div>
	// );
}

let htmlData = '<p>This is some <strong>rich HTML</strong> content.</p>';
const richTextField = {
	nodeType: 'document',
	data: {},
	content: [
		{
			nodeType: 'paragraph',
			data: {},
			content: [
				{
					nodeType: 'text',
					value: 'This is some rich text content.',
					marks: [],
					data: {},
				},
				{
					nodeType: 'text',
					value: 'This is some rich text content.',
					marks: [{ type: 'bold' }],
					data: {},
				},
				{
					nodeType: 'text',
					value: 'This is some rich text content.',
					marks: [],
					data: {},
				},
			],
		},
		{
			nodeType: 'paragraph',
			data: {},
			content: [
				{
					nodeType: 'text',
					value: 'This is some rich text content.',
					marks: [],
					data: {},
				},
			],
		},
	],
};

export function Form({ setMode }) {
	const selectedRoom = useContext(QuoteRoomsContext).selectedRoom;
	const rooms = useContext(QuoteRoomsContext).rooms;
	const setIsQuoteComplete = useContext(QuoteCompleted).setIsQuoteComplete;
	documentToHtmlString(htmlData);
	const htmlField = {
		// 'en-US': documentToHtmlString(htmlData),
		'en-US': richTextField,
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
	//test
	let client;
	let userClient;
	const [categoryFocus, setCategoryFocus] = useState(null);

	useEffect(() => {
		client = createClient({
			space: 'dd68j6yxui75',
			accessToken: 'i0a0-vN1CNsoyPbHwtGBv4pxn4j3xKLMuJOrOR23hao',
		});
		userClient = createAuthClient({
			accessToken: 'CFPAT-LGhcYfQLYGuJfheeSokUoWRLA5MUj6wxdr5vn5sTIOU',
			space: 'dd68j6yxui75',
		});

		(async () => {
			const space = await userClient.getSpace('dd68j6yxui75');
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
		})();
		// const space = userClient.getSpace('dd68j6yxui75');
		// const env = space.getEnvironment('master');
	}, []);

	return (
		<div id='quoteForm' className='mt-5 p-6 bg-white flex items-center justify-center'>
			<div className='container max-w-screen-lg mx-auto'>
				<button
					className='bg-primary transition hover:bg-darkPrimary text-white font-bold py-2 px-4 rounded'
					onClick={() => {
						setMode('Manage');
					}}>
					{'< '}Go back
				</button>

				<div>
					<div className='mt-4 font-semibold text-xl text-gray-600'>Quote Form</div>
					<p className='text-gray-500 mb-6'>
						Fill out this form, and wsdse'll get back to you within 24 hours!
					</p>

					<div className='bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6'>
						<div className='grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3'>
							<div className='text-gray-600'>
								<p className='font-medium text-lg'>Please fill out all the fields</p>
								<div>
									<span className='text-red-500'>* </span>Required
								</div>
							</div>

							<div className='lg:col-span-2'>
								<form
									onSubmit={(e) => {
										e.preventDefault();
										completeQuote(e, rooms);
										// setMode('Complete');
										// setIsQuoteComplete(true);
									}}
									className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5'>
									<div className='md:col-span-5'>
										<label for='full_name'>
											<span className='text-red-500'>* </span>Full Name
										</label>
										<input
											type='text'
											name='full_name'
											id='full_name'
											className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
											required
										/>
									</div>
									<div className='md:col-span-5'>
										<label for='phone_number'>
											<span className='text-red-500'>* </span>Phone Number
										</label>
										<input
											type='tel'
											// pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
											name='phone_number'
											id='phone_number'
											className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
											required
										/>
									</div>
									<div className='md:col-span-5'>
										<label for='email'>
											<span className='text-red-500'>* </span>Email Address
										</label>
										<input
											type='text'
											name='email'
											id='email'
											className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
											placeholder='email@domain.com'
											required
										/>
									</div>

									<div className='md:col-span-3'>
										<label for='address'>
											<span className='text-red-500'>* </span>Address / Street
										</label>
										<input
											type='text'
											name='address'
											id='address'
											className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
											placeholder=''
											required
										/>
									</div>

									<div className='md:col-span-2'>
										<label for='city'>
											<span className='text-red-500'>* </span>City
										</label>
										<input
											type='text'
											name='city'
											id='city'
											className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
											placeholder=''
											required
										/>
									</div>

									<div className='md:col-span-1'>
										<label for='zipcode'>
											<span className='text-red-500'>* </span>Zip Code
										</label>
										<input
											type='text'
											name='zipcode'
											id='zipcode'
											className='transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50'
											placeholder=''
										/>
									</div>

									<div className='md:col-span-5'>
										<label for='comment'>
											<span className='text-red-500'>* </span>Comments about Project
										</label>
										<input
											type='text'
											name='comment'
											id='comment'
											className='transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50'
											placeholder=''
											required
										/>
									</div>

									<div className='md:col-span-5 mt-2 text-right'>
										<div className='inline-flex items-end'>
											<button
												type='submit'
												// onClick={() => setMode('Complete')}
												className=' bg-primary transition hover:bg-darkPrimary text-white font-bold py-2 px-4 rounded'>
												Submit
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
