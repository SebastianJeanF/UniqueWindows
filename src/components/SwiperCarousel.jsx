// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper';
import { useEffect, useRef, useState } from 'react';
import { CustomLink } from './Nav.jsx';
import img1 from '../assets/custom/IMG_7335.jpg';
import img2 from '../assets/custom/IMG_4891.jpg';
import img3 from '../assets/custom/IMG_9800.jpg';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import '../styles/home.module.css';

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function imgUrl() {
	const id = rand(1, 200);
	return `https://picsum.photos/id/${id}/1600/400`;
}

function createSlide() {
	return (
		<SwiperSlide className='homeSwiper'>
			<div
				className='w-full relative  bg-cover bg-center'
				style={{ backgroundImage: `url(${img1})`, height: '53vh' }}>
				<div
					style={{ position: 'absolute', top: '40%', left: '60px' }}
					className='flex flex-col justify-between items-start'>
					<div className=' home block '>HIGH-QUALITY WINDOWS</div>
					<a
						type='button'
						href='/Window-Project/products'
						className='home-carousel-button mt-5 transition hover:bg-orange-900'>
						VIEW OUR PRODUCTS
					</a>
				</div>
			</div>
		</SwiperSlide>
	);
}

const DATA = [
	{
		img: img1,
		text: 'HIGH-QUALITY WINDOWS',
		link: '/Window-Project/products',
		buttonText: 'VIEW OUR PRODUCTS',
	},
	{
		img: img2,
		text: 'FAMILY-OWNED BUSINESS',
		link: '/Window-Project/contact',
		buttonText: 'CHECK ABOUT US',
	},
	{
		img: img3,
		text: 'TRANSPARENT COSTS',
		link: '/Window-Project/quote',
		buttonText: 'USE INSTANT QUOTE',
	},
];

const dynamicStyle = (k) => {
	const isOdd = k % 2 === 1;
	return {
		left: isOdd ? '' : '60px',
		right: isOdd ? '15%' : '',
	};
};
const container = {
	hidden: { opacity: 0, transform: 'translateX(calc(-10vw))' },
	show: {
		opacity: 1,
		transform: 0,
		transition: { type: 'spring', duration: 4.0, delayChildren: 1.75 },
	},
};
const title = {
	hidden: { opacity: 0, transform: 'translateX(calc(-5vw))' },
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

const Slides = DATA.map((slide, k) => {
	return (
		<SwiperSlide>
			<div
				className='w-full relative bg-cover bg-center'
				style={{ backgroundImage: `url(${slide.img})`, height: '53vh' }}>
				<motion.div
					variants={container}
					initial='hidden'
					animate='show'
					className='flex flex-col justify-between items-end '
					style={{ position: 'absolute', top: '40%', ...dynamicStyle(k) }}>
					<div className='home block'>{slide.text}</div>
					<p>
						<motion.div
							variants={title}
							type='button'
							className=' home-carousel-button mt-5 transition hover:bg-orange-900'>
							<CustomLink className='text-white' to={slide.link}>
								{slide.buttonText}
							</CustomLink>
						</motion.div>
					</p>
				</motion.div>
			</div>
		</SwiperSlide>
	);
});

export default () => {
	const [isMouseOver, setIsMouseOver] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const swiperRef = useRef(null);
	const swiperObj = useRef(null);
	let useEffectInitialized = useRef(false);

	useEffect(() => {
		if (!useEffectInitialized.current) {
			console.log('HAPPENEND');
			swiperObj.current.navigation.nextEl.classList.add('initialize-swiper-button-next');
			swiperObj.current.navigation.prevEl.classList.add('initialize-swiper-button-prev');
			useEffectInitialized.current = true;
			return;
		}
		if (isHover) {
			console.log('HAPPENEND22');
			swiperObj.current.navigation.nextEl.classList.add('hover-swiper-button-next');
			swiperObj.current.navigation.prevEl.classList.add('hover-swiper-button-prev');
		} else {
			swiperObj.current.navigation.nextEl.classList.remove('hover-swiper-button-next');
			swiperObj.current.navigation.prevEl.classList.remove('hover-swiper-button-prev');
		}
	}, [isHover]);

	return (
		<div
			onMouseEnter={() => {
				setIsHover(true);
			}}
			onMouseLeave={() => {
				setIsHover(false);
			}}>
			<Swiper
				// Source: https://stackoverflow.com/questions/65590148/swiperjs-how-do-you-style-the-pagination-bullets
				style={{
					'--swiper-pagination-color': ' #FFF',
					'--swiper-pagination-bullet-inactive-color': '#999999',
					'--swiper-pagination-bullet-inactive-opacity': '1',
					'--swiper-pagination-bullet-size': '11px',
					'--swiper-pagination-bullet-horizontal-gap': '6px',
				}}
				ref={swiperRef}
				init='false'
				Leave={() => setIsMouseOver(false)}
				modules={[Autoplay, Navigation, EffectFade, Pagination]}
				autoplay={true}
				navigation={true}
				pagination={{ clickable: true }}
				effect={'fade'}
				spaceBetween={100}
				slidesPerView={1}
				onSlideChange={() => console.log('slide change')}
				onSlideNextTransitionStart={() => console.log('slide changed!!!')}
				onSwiper={(swiper) => {
					swiperObj.current = swiper;
					console.log(swiperObj.current);
				}}>
				{/* {createSlide()}
				{createSlide1()}
				{createSlide2()} */}
				{Slides}
				{/* <SwiperSlide>
              <img src={img1}/>
              Slide 1
            </SwiperSlide>
            <SwiperSlide>
              <img src={img2}/>
              Slide 1
            </SwiperSlide>      <SwiperSlide>
              <img src={img3}/>
              Slide 1
            </SwiperSlide> */}
			</Swiper>
		</div>
	);
};
