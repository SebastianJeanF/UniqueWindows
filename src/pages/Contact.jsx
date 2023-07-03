import openModal from '../modals/Modal';
import Masthead from '../components/NewMasthead';
import { motion } from 'framer-motion';
import axios from 'axios';
import img1 from '../assets/custom/IMG_5162.jpg';
// import nodemailer from '/home/temp/project/node_modules/nodemailer/lib/nodemailer.js';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

import React from 'react';
import { useRef, useState } from 'react';

function Form({ setIsCompleted }) {
	const userInput = useRef(null);
	const firstName = 'Hello, world';
	const [selectedFile, setSelectedFile] = useState(null);

	const emailResend = () => {
		const resend = new Resend('re_VoUwKPjo_8TLurnknC6k4iES7kkwgMUXJ');

		resend.sendEmail({
			from: 'sebeld9@gmail.com',
			to: 'sebeld9@gmail.com',
			subject: 'hello world',
			react: <Email firstName='John' product='MyApp' />,
		});
	};

	// const emailNodeMailer = () => {
	// 	const transporter = nodemailer.createTransport({
	// 		host: 'smtp.ethereal.email',
	// 		port: 587,
	// 		secure: false,
	// 		auth: {
	// 			user: 'my_user',
	// 			pass: 'my_password',
	// 		},
	// 	});

	// 	const emailHtml = render(<Email url='https://example.com' />);

	// 	const options = {
	// 		from: 'you@example.com',
	// 		to: 'user@gmail.com',
	// 		subject: 'hello world',
	// 		html: emailHtml,
	// 	};

	// 	transporter.sendMail(options);
	// };

	const sendData = (e) => {
		const data = new FormData(e.target);
		// console.log(`data is ${data.forEach((e) => console.log(e))}`);
		data.append('image', selectedFile);
		data.append('TestProp', 'testProp');

		console.log(data.get('image'));
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios
			// Source: https://axios-http.com/docs/multipart
			// .post('https://formsubmit.co/ajax/1a2b11a3a911d60a02b691a125a1d5c0', data)
			.post('https://formsubmit.co/ajax/1a2b11a3a911d60a02b691a125a1d5c0', data, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			.then((response) => console.log(response))
			.catch((error) => console.log(error));

		// Source: https://stackoverflow.com/questions/66491991/formsubmit-co-form-not-working-in-reactapp
		// fetch('https://formsubmit.co/ajax/1a2b11a3a911d60a02b691a125a1d5c0', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Accept: 'application/json',
		// 	},
		// 	body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
		// });
	};

	const submitForm = (e) => {
		e.preventDefault();
		// Source: https://levelup.gitconnected.com/react-forms-usestate-vs-useref-5cb584cc19fd
		// sendData(e);
		emailPlunk();
		setIsCompleted(true);
	};
	return (
		<div className=' bg-gray-100 lg:bg-inherit p-6  lg:mt-4 w-full   '>
			<div className=' container mx-auto  lg:w-4/5  lg:max-w-screen-lg'>
				<div>
					<h2 className='font-semibold text-xl text-gray-600'>Contact Form</h2>
					<p className='text-gray-500 mb-6'>
						Fill out this form if you have any questions, and we'll get back to you!
					</p>
					<div className='text-textPrimary'>
						<span className='text-red-500'>* </span>Required
					</div>
					<div className='bg-white rounded shadow-2xl p-4 px-4 navmd:p-8 mb-6'>
						<div className=''>
							{/* <div className='text-gray-600'>
								<p className='font-medium text-lg'>Personal Details</p>
								<p>Please fill out all the fields.</p>
							</div> */}

							<div className=''>
								<form
									action='https://formsubmit.co/1a2b11a3a911d60a02b691a125a1d5c0'
									onSubmit={(e) => submitForm(e)}
									className='flex flex-col gap-4 gap-y-2 text-sm'>
									<div className=''>
										<label for='first_name'>
											<span className='text-red-500'>* </span>First Name
										</label>
										<input
											type='text'
											name='first_name'
											id='first_name'
											className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
											required
										/>
									</div>
									<div className=''>
										<label for='last_name'>
											<span className='text-red-500'>* </span>Last Name
										</label>
										<input
											type='text'
											name='last_name'
											id='last_name'
											className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
											required
										/>
									</div>
									<div className=''>
										<label for='number'>
											<span className='text-red-500'>* </span>Phone Number
										</label>
										<input
											type='text'
											name='number'
											id='number'
											className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
											required
										/>
									</div>
									<div className=''>
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

									<div className=''>
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

									<div className=''>
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

									<div className=''>
										<label for='zipcode'>
											<span className='text-red-500'>* </span>Zip Code
										</label>
										<input
											type='text'
											name='zipcode'
											id='zipcode'
											className='transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50'
											placeholder=''
											required
										/>
									</div>

									<div className='navmd:col-span-5'>
										<label for='formFile' className='form-label inline-block mb-2 text-gray-700'>
											Pictures related to Project
										</label>
										<input
											onChange={(e) => setSelectedFile(e.target.files[0])}
											className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
											name='picture'
											type='file'
											id='formFile'
										/>
									</div>
									<div className='navmd:col-span-5'>
										<label for='comment'>Comments</label>
										<input
											type='text'
											name='comment'
											id='comment'
											className='transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50'
											placeholder=''
										/>
									</div>

									<div className='navmd:col-span-5 mt-2 text-right'>
										<div className='inline-flex items-end'>
											<button
												type='submit'
												className='bg-primary transition hover:bg-darkPrimary text-white font-bold py-2 px-4 rounded'>
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
function Contact() {
	const container = {
		hidden: { opacity: 0, transform: 'translateX(calc(-10vw))' },
		show: {
			opacity: 1,
			transform: 0,
			transition: { type: 'spring', duration: 1, delayChildren: 1 },
		},
	};
	const title = {
		hidden: { opacity: 0, transform: 'translateX(calc(5vw))' },
		show: { opacity: 1, transform: 0, transition: { duration: 0.5 } },
	};

	const container2 = {
		hidden: { opacity: 0, transform: 'translateX(calc(10vw))' },
		show: {
			opacity: 1,
			transform: 0,
			transition: { type: 'spring', duration: 1, delayChildren: 1 },
		},
	};
	const title2 = {
		hidden: { opacity: 0, transform: 'translateX(calc(-5vw))' },
		show: { opacity: 1, transform: 0, transition: { duration: 0.5 } },
	};

	const [isCompleted, setIsCompleted] = useState(false);

	//   console.log("reloading");
	function openModal() {
		console.log('happened');
	}

	// const [, updateState] = React.useState();
	//  const forceUpdate = React.useCallback(() => updateState({}), []);

	return (
		<>
			<Masthead
				img={img1}
				title={'Contact Us'}
				subtitle={"Please let us know how we can help, and we'll be in touch shortly."}></Masthead>
			{isCompleted ? (
				<div className='min-h-screen'>
					<div className='min-h-full text-center mt-20 font-semibold text-xl'>
						{' '}
						We'll get back to you in a few days!
					</div>
				</div>
			) : (
				<motion.div
					variants={container}
					initial='hidden'
					whileInView='show'
					className='flex flex-col items-center lg:flex-row lg:items-start lg:justify-between'>
					<section className='  mx-auto container self-stretch flex flex-col-reverse justify-start lg:flex-col p-6 mt-4  '>
						<div className=' mb-8 mx-auto  text-textPrimary '>
							<div className='font-medium text-textPrimary2 leading-10 font-height text-2xl mb-5'>
								We assure your complete satisfaction throughout your window installation journey
								with us.
							</div>
							<div className='ml-4 flex flex-col gap-3'>
								<div>
									<CheckCircleIcon className='h-5 inline mr-2'></CheckCircleIcon>
									<div className='inline'>
										Our top-of-the-line Unique Windows cater to both your home and budget
										requirements, guaranteeing optimal performance and style.
									</div>
								</div>
								<div>
									<CheckCircleIcon className='h-5 inline mr-2'></CheckCircleIcon>
									<div className='inline'>
										We prioritize your preferences and prioritize understanding them. Hence, our
										attentive team takes the time to carefully listen to your specific needs before
										providing our expert advice.
									</div>
								</div>
								<div>
									<CheckCircleIcon className='h-5 inline mr-2'></CheckCircleIcon>
									<div className='inline'>
										We take precise measurements and custom-build our products to fit seamlessly
										into your home's unique design and style.
									</div>
								</div>
								<div>
									<CheckCircleIcon className='h-5 inline mr-2'></CheckCircleIcon>
									<div className='inline'>
										After thoughtful consideration, we present you with a recommendation that best
										suits your personal needs and preferences, so you can make an informed decision.
									</div>
								</div>
								<div>
									<CheckCircleIcon className='h-5 inline mr-2'></CheckCircleIcon>
									<div className='inline'>
										We offer exceptional warranty coverage for all our Unique Window products,
										ensuring your investment is well-protected and reliable.
									</div>
								</div>
							</div>
						</div>
						<div className='text-textPrimary container mt-5 pb-5 mb-5 xl:w-1/2 mx-auto flex flex-col justify-around'>
							<div>
								<h1 className='text-4xl font-medium text-center text-headerPrimary'>
									Contact Info
								</h1>
								<hr className='mx-auto'></hr>
								<ul className='list-group list-group-flush lead '>
									<li
										style={{ fontSize: 'clamp(1rem, 2vw + 0.25rem, 1.25rem)' }}
										className=' flex flex-col items-center justify-center  mb-2 overflow text-center'>
										<span className='text-center text-headerPrimary font-medium'>Email: </span>
										<div className=' p-1 text-overflow-center mx-auto text-center'>
											uniquewindowsrenovations@gmail.com
										</div>
									</li>
									<div className='h-px my-4 bg-gray-200 border-0 '></div>
									<li
										style={{ fontSize: 'clamp(1rem, 2vw + 0.25rem, 1.25rem)' }}
										className=' flex flex-col items-center mb-2 text-center '>
										<span className='text-headerPrimary font-medium'>Phone Number: </span>
										<div className='text-overflow-center p-1 '>770-990-6603</div>
									</li>
								</ul>
							</div>
						</div>
					</section>
					<motion.div use variants={title} className=' w-full mx-auto border '>
						<Form setIsCompleted={setIsCompleted}></Form>
					</motion.div>
				</motion.div>
			)}
		</>
	);
}

export default Contact;
