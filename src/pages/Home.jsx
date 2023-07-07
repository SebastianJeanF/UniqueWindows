import img2 from '../assets/custom/IMG_7335.jpg';
import img3 from '../assets/contactUs.jpg';
import Carousel from '../components/SwiperCarousel';
import { GrContactInfo } from 'react-icons/gr';
import { TbWindow } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { CustomLink } from '../components/Nav.jsx';
function Home() {
	const container = {
		hidden: { opacity: 0, transform: 'translateX(calc(-10vw))' },
		show: {
			opacity: 1,
			transform: 0,
			transition: { type: 'spring', duration: 1, delayChildren: 0.5 },
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
			transition: { type: 'spring', duration: 1, delayChildren: 0.5 },
		},
	};
	const title2 = {
		hidden: { opacity: 0, transform: 'translateX(calc(-5vw))' },
		show: { opacity: 1, transform: 0, transition: { duration: 0.5 } },
	};

	return (
		<div>
			<Carousel></Carousel>

			<section id='cta' className='bg-primary'>
				<div className='container flex flex-col items-center justify-between px-6 py-10 mx-auto space-y-12 md:py-8 md:flex-row md:space-y-0'>
					<div className='text-2xl font-bold text-center text-white md:text-2xl md:max-w-xl md:text-left'>
						Need pricing? Get an <b>instant</b> quote on the exact window you want!
					</div>
					<div>
						<div id='container' className='bg-white rounded-full'>
							<button class='learn-more '>
								<span class='circle' aria-hidden='true'>
									<span class='icon arrow'></span>
								</span>

								<CustomLink className='button-text' to='/Window-Project/quote'>
									Get Quote
								</CustomLink>
							</button>
						</div>
					</div>
				</div>
			</section>

			<section className=''>
				<div className=' mx-auto'>
					<div className='py-16 rounded '>
						<div className='container md:flex m-auto px-6 md:px-12 xl:px-6'>
							<div className='mx-auto  space-y-6 md:space-y-0 flex flex-col just lg:flex-row gap-6  lg:gap-12'>
								<motion.div
									variants={container}
									initial='hidden'
									whileInView='show'
									className='text-textPrimary max-w-xl'>
									<motion.div variants={title}>
										<TbWindow className='text-gray-800 h-10 w-10 mx-auto'></TbWindow>
										<div className='text-2xl text-center font-bold md:text-4xl text-gray-800'>
											Our Windows
										</div>
									</motion.div>
									<hr className='mx-auto'></hr>
									<div className='mt-6 text-gray-600'>
										With unique windows we offer high-quality window installation services for both
										residential and commercial properties. We specialize in providing custom-fit
										windows that perfectly suit your building's design and architecture, while also
										meeting your energy-efficiency needs.
									</div>
									<div className='mt-4 text-gray-600'>
										Our team of experienced professionals is dedicated to providing excellent
										customer service, ensuring that every project is completed on time and within
										budget. Whether you're building div new home or upgrading your existing windows,{' '}
										<CustomLink
											to='/Window-Project/products'
											className='text-blue-700 transition  underline'>
											we have the expertise to help you achieve your goals.
										</CustomLink>
									</div>
								</motion.div>
								<motion.img
									initial={{ transform: 'translateX(calc(10vw))', opacity: 0 }}
									whileInView={{
										transform: 0,
										opacity: 1,
										transition: { type: 'spring', duration: 0.75 },
									}}
									className='contactUs md:max-w-xl'
									src={img2}
								/>
							</div>
						</div>
					</div>
					<div style={{ backgroundColor: '#F7F7F7' }} className='md:m-0 mt-4 py-16 overflow-hidden'>
						<div className=' container  m-auto md:flex px-6 text-gray-600 md:px-12 xl:px-6'>
							<div className=' space-y-6 md:space-y-0 flex flex-col lg:flex-row-reverse gap-6  lg:gap-12'>
								<motion.div
									variants={container2}
									initial='hidden'
									whileInView='show'
									className='text-textPrimary'>
									<motion.div variants={title2}>
										<GrContactInfo
											style={{ color: '#007575' }}
											className='text-gray-900 h-10 w-10 mx-auto'></GrContactInfo>

										<div className='text-2xl text-center text-gray-800 font-bold md:text-4xl'>
											Contact Us
										</div>
									</motion.div>
									<hr className='mx-auto'></hr>
									<div className='mt-6 '>
										If you have any questions or would like to learn more about our window
										installation services, we are always happy to hear from you. You can easily
										contact us by visiting the{' '}
										<CustomLink
											to='/Window-Project/contact'
											className='text-blue-700 underline inline-block'>
											"Contact Us"
										</CustomLink>{' '}
										section of our website. Here, you'll find our phone number, and email address.
										so you can choose the method of communication that works best for you.
									</div>
									<div className='mt-4 '>
										Our team is always available to answer your questions and provide you with any
										information you need about our products and services. We're committed to
										providing exceptional customer service and look forward to hearing from you
										soon.
									</div>
								</motion.div>
								<motion.img
									initial={{ transform: 'translateX(calc(-10vw))', opacity: 0 }}
									whileInView={{
										transform: 0,
										opacity: 1,
										transition: { type: 'Inertia', duration: 0.5 },
									}}
									className='contactUs '
									src={img3}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Home;
