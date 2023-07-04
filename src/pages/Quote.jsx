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
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper';

import { motion, AnimatePresence } from 'framer-motion';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { scaleBetween } from 'parallax-controller';

const styles = {
	all: {
		backgroundPosition: '50% 50%',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '150px 150px',
		height: '150px',
		width: '150px',
	},
	wood: {
		backgroundImage:
			"url('https://images.contentstack.io/v3/assets/blt96c8be062696040f/bltbbe42f7ebf3f1c53/5f9c65862425cd7a8af6a0f9/wood-materials.jpg')",
	},
	fiberglass: {
		backgroundImage:
			"url('https://images.contentstack.io/v3/assets/blt96c8be062696040f/bltc6983a9478b95673/5f9c65be545bdb56ce4920d3/fiberglass-materials.jpg')",
	},
	vinyl: {
		backgroundImage:
			"url('https://images.contentstack.io/v3/assets/blt96c8be062696040f/blt10871553a2eaeeb9/6081d6bd75873e466bcc6242/product-material-vinyl.jpg')",
	},
	span: {
		backgroundColor: 'rgba(0, 0, 0, 0.33)',
	},
};

const WindowCarousel = ({ isModal, modeState, setCategoryFocus }) => {
	const swiper = useContext(QuoteSwiperContext).swiper;
	const setSwiper = useContext(QuoteSwiperContext).setSwiper;
	const carouselReinitialized = useContext(QuoteSwiperContext).reinitialized.current;

	const carouselReinitializedRef = useContext(QuoteSwiperContext).reinitialized;

	const selectedRoom = useContext(QuoteRoomsContext).selectedRoom;
	const selectedWindow = useContext(QuoteRoomsContext).selectedWindow;
	const roomsDispatch = useContext(QuoteRoomsContext).roomsDispatch;
	const mode = modeState[0];
	const setMode = modeState[1];
	const [isOpen, setIsModalOpen] = useState(false);
	useEffect(() => {
		if (swiper && carouselReinitialized) {
			swiper.slideTo(swiper.slides.length - 1);
			carouselReinitializedRef.current = false;
		}
	}, [selectedRoom]);

	const changeMode = () => {
		modeState;
		if (modeState[0] == 'Customize') modeState[1]('Manage');
		else modeState[1]('Customize');
	};
	const message = 'Not Set';

	const createSlides =
		selectedWindow && selectedRoom ? (
			selectedRoom.windows.map((window, index) => {
				return (
					<SwiperSlide className='min-w-full ' key={index}>
						<div
							style={{ minHeight: '24rem' }}
							className=' p-4 flex flex-col items-center  justify-between mx-auto  shadow-xl  sticky windowModal  bg-white'>
							{mode == 'Manage' && (
								<button
									onClick={() => {
										roomsDispatch({ type: 'addWindow' });
										carouselReinitializedRef.current = true;
										setMode('Customize');
									}}
									class=' bg-quotePrimary border border-black text-black close-button hover:bg-yellow-500'>
									{' '}
									<span class='text'>Add Window</span>
									<div class='icons text-black'>
										<PlusIcon></PlusIcon>
									</div>
								</button>
							)}

							<div className='relative text-2xl my-2 text-textPrimary font-semibold'>
								<div>Room: {selectedRoom.name} </div>
							</div>

							{!isModal &&
								(window.img != null ? (
									<>
										<img
											className='my-2 h-60'
											src={window.img}
											// src={availableFrameTypes.img != null ? availableFrameTypes.img : null}
											alt=''
										/>
										<div className='border p-1 flex flex-col justify-center border-gray-500 bg-white'>
											<div className='font-semibold text-xl text-textPrimary2'>
												{' '}
												Price: ${window.price}{' '}
											</div>
										</div>
									</>
								) : (
									<>
										<div className='my-2 h-60 w-full bg-gray-200'></div>
										<div className='border p-1 flex flex-col justify-center border-gray-500 bg-white'>
											<div className='font-semibold text-xl text-textPrimary2'>
												{' '}
												Price: ${window.price}{' '}
											</div>
										</div>
									</>
								))}

							{modeState[0] == 'Manage' && selectedRoom && selectedWindow && (
								<>
									<div className='font-extrabold text-textPrimary  text-center py-2 px-6 text-xl'>
										Quantity: {window.quantity}
									</div>
									<table class='shadow-md  border-2 border-gray-500 table-fixed'>
										<thead className='text-textPrimary '>
											<tr>
												<th className='border-gray-500 border  py-1 bg-blue-300 font-extrabold'>
													Category
												</th>
												<th className='border-gray-500 border py-1 bg-blue-300   font-extrabold'>
													Value
												</th>
											</tr>
										</thead>
										<tbody>
											<tr
												onClick={() => {
													setCategoryFocus('Type');
													changeMode();
												}}
												className={` ${
													window.type
														? 'bg-green-100 hover:bg-green-200'
														: 'bg-red-100 hover:bg-red-200'
												} font-semibold text-textPrimary  text-center cursor-pointer duration-300`}>
												<td className='border-gray-500 border-r py-1 px-6'>Window Type</td>
												<td className='py-1 px-6 font-medium'>{window.type || message}</td>
											</tr>
											<tr
												onClick={() => {
													setCategoryFocus('Frame');
													changeMode();
												}}
												className={` ${
													window.frame
														? 'bg-green-100 hover:bg-green-200'
														: 'bg-red-100 hover:bg-red-200'
												} font-semibold text-textPrimary  text-center cursor-pointer duration-300`}>
												<td className='border-gray-500 border-r  py-1 px-6'>Frame Material</td>
												<td className='py-1 px-6 font-medium'>
													{window.frame
														? window.frame[0].toUpperCase() + window.frame.substr(1)
														: message}
												</td>
											</tr>
											<tr
												onClick={() => {
													setCategoryFocus('Width');
													changeMode();
												}}
												className='font-semibold text-textPrimary bg-green-100 hover:bg-green-200 text-center cursor-pointer duration-300'>
												<td className='border-gray-500 border-r  py-1 px-6'>Width</td>
												<td className='py-1 px-6 font-medium'>{window.width || 'Optional'}</td>
											</tr>
											<tr
												onClick={() => {
													setCategoryFocus('Height');
													changeMode();
												}}
												className='font-semibold text-textPrimary bg-green-100 hover:bg-green-200 text-center cursor-pointer duration-300'>
												<td className='border-gray-500 border-r  py-1 px-6'>Height</td>
												<td className='py-1 px-6 font-medium'>{window.height || 'Optional'}</td>
											</tr>
											<tr
												onClick={() => {
													setCategoryFocus('Interior');
													changeMode();
												}}
												className={` ${
													window.interior
														? 'bg-green-100 hover:bg-green-200'
														: 'bg-red-100 hover:bg-red-200'
												} font-semibold text-textPrimary  text-center cursor-pointer duration-300`}>
												<td className='border-gray-500 border-r  py-1 px-6'>Interior</td>
												<td className='py-1 px-6 font-medium'>{window.interior || message}</td>
											</tr>
											<tr
												onClick={() => {
													setCategoryFocus('Exterior');
													changeMode();
												}}
												className={` ${
													window.exterior
														? 'bg-green-100 hover:bg-green-200'
														: 'bg-red-100 hover:bg-red-200'
												} font-semibold text-textPrimary  text-center cursor-pointer duration-300`}>
												<td className='border-gray-500 border-r py-1 px-6'>Exterior</td>
												<td className='py-1 px-6 font-medium'>{window.exterior || message}</td>
											</tr>
											<tr
												onClick={() => {
													setCategoryFocus('Photo');
													changeMode();
												}}
												className={` ${
													window.photo
														? 'bg-green-100 hover:bg-green-200'
														: 'bg-red-100 hover:bg-red-200'
												} font-semibold text-textPrimary  text-center cursor-pointer duration-300`}>
												<td className='border-gray-500 border-r  py-1 px-6'>Photo Included</td>
												<td className='py-1 px-6 font-medium'>
													{window.photo == true ? 'Yes' : 'No'}
												</td>
											</tr>
										</tbody>
									</table>
								</>
							)}

							{modeState[0] == 'Customize' && selectedRoom && (
								<div className='flex w-full px-4 m-4 h-14 gap-4'>
									<div className='flex border items-center justify-around  border-black w-1/3 bg-white'>
										<MinusCircleIcon
											onClick={() => roomsDispatch({ type: 'windowAttributes', decrease: true })}
											className={` ${
												window.quantity == 1 ? 'text-gray-500' : 'hover:text-red-900 cursor-pointer'
											}  h-8 `}></MinusCircleIcon>
										<div className='font-semibold'>{window.quantity}</div>
										<PlusCircleIcon
											type='button'
											onClick={() => roomsDispatch({ type: 'windowAttributes', increase: true })}
											className='hover:text-green-900 h-8 cursor-pointer'></PlusCircleIcon>
									</div>
									<button
										type='button'
										onClick={changeMode}
										className='flex flex-row border border-black items-center m-0 justify-center gap-3 w-2/3 bg-quotePrimary transition hover:bg-yellow-500'>
										<ShoppingCartIcon className=' font-semibold h-6'></ShoppingCartIcon>
										<div className=' font-semibold'>Save to Project</div>
									</button>
								</div>
							)}
							{modeState[0] == 'Manage' && selectedRoom && (
								<div className='flex w-full px-4 m-4 h-14 gap-4'>
									<button
										type='button'
										onClick={() => setIsModalOpen(true)}
										className='px-2 flex flex-row border border-black items-center m-0 justify-center gap-3 w-1/3 bg-red-500 transition hover:bg-red-600'>
										<TrashIcon className=' font-semibold h-6'></TrashIcon>
										<div className='font-semibold '>Delete</div>
									</button>

									<button
										type='button'
										onClick={changeMode}
										className='flex flex-row border border-black items-center m-0 justify-center gap-3 w-2/3 bg-quotePrimary transition hover:bg-yellow-500'>
										<PencilSquareIcon className=' font-semibold h-6'></PencilSquareIcon>
										<div className=' font-semibold'>Edit</div>
									</button>
								</div>
							)}
						</div>
					</SwiperSlide>
					// </Transition>
				);
			})
		) : (
			<SwiperSlide>
				<div
					style={{ minHeight: '24rem' }}
					className='p-4 flex flex-col items-center justify-between mx-auto border shadow-xl border-gray-700 sticky windowModal  bg-white'>
					<div className='text-textPrimary font-semibold text-3xl '> Add a window</div>
				</div>
			</SwiperSlide>
		);

	return (
		<Transition
			enter='transition-opacity duration-75'
			enterFrom='opacity-0'
			enterTo='opacity-100'
			leave='transition-opacity duration-150'
			leaveFrom='opacity-100'
			leaveTo='opacity-0'
			className='flex flex-row justify-center '>
			<Swiper
				className={`${isModal ? 'w-full' : 'w-4/5'}  border border-gray-700`}
				modules={[Autoplay, Navigation, EffectFade, Pagination]}
				autoplay={true}
				navigation
				pagination={{ clickable: true }}
				effect={'fade'}
				spaceBetween={50}
				slidesPerView={1}
				onSlidePrevTransitionStart={() => {
					console.log('Swiper variable in prev transition', swiper.slides);

					if (selectedRoom.selectedWindowId > 0) {
						roomsDispatch({ type: 'shiftWindowLeft' });
					}
				}}
				onSlideNextTransitionStart={(swiper) => {
					console.log('Swiper variable in next transition', swiper.slides);
					if (selectedRoom.selectedWindowId < selectedRoom.windows.length - 1) {
						roomsDispatch({ type: 'shiftWindowRight' });
					}
				}}
				onSwiper={(swiper) => setSwiper(swiper)}>
				<MyModal
					openState={[isOpen, setIsModalOpen]}
					currentState={['dummy', 'dummy']}
					mode={'DeleteWindow'}></MyModal>
				{createSlides}
			</Swiper>
		</Transition>
	);
};

const WindowView = ({ className, isModal, modeState, room, setCategoryFocus }) => {
	// const roomsForceUpdate = useContext(QuoteRoomsContext).roomsUpdateRef.current;
	// useEffect(() => {}, [roomsForceUpdate]);

	return (
		<div className={`  min-w-full  ${className}`}>
			<WindowCarousel
				isModal={isModal}
				modeState={modeState}
				setCategoryFocus={setCategoryFocus}></WindowCarousel>
		</div>
	);
};

function Form({ setMode }) {
	const completeQuote = (e) => {
		e.preventDefault();
		setMode('Complete');
	};

	return (
		<div id='quoteForm' className='mt-5 p-6 bg-white flex items-center justify-center'>
			<div className='container max-w-screen-lg mx-auto'>
				<button
					className='bg-primary transition hover:bg-darkPrimary text-white font-bold py-2 px-4 rounded'
					onClick={() => setMode('Manage')}>
					{'< '}Go back
				</button>

				<div>
					<div className='mt-4 font-semibold text-xl text-gray-600'>Quote Form</div>
					<p className='text-gray-500 mb-6'>
						Fill out this form, and we'll get back to you within 24 hours!
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
									onSubmit={(e) => completeQuote(e)}
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

function WindowType({ data, setAvailableFrameTypes }) {
	const selectedWindow = useContext(QuoteRoomsContext).selectedWindow;
	const roomsDispatch = useContext(QuoteRoomsContext).roomsDispatch;

	const [current, setCurrent] = useState([...Array(data.length + 1)]);
	const [previousIndex, setPreviousIndex] = useState(null);

	useEffect(() => {
		initialize();
	}, [selectedWindow]);

	function initialize() {
		console.log('triggered');
		const newArray = current.map((element, index) => {
			if (index == current.length - 1) {
				if (selectedWindow.custom) {
					console.log('selectedWindow.type', selectedWindow.type);
					return true;
				} else {
					return false;
				}
			}
			if (!data[index]) return false;
			let APIitem = data[index].fields || null;
			if (selectedWindow.type === APIitem.title) {
				setAvailableFrameTypes({
					fiberglass: APIitem.fiberglass,
					vinyl: APIitem.vinyl,
					wood: APIitem.wood,
				});
				setPreviousIndex(index);
				return true;
			}
			return false;
		});

		setCurrent(newArray);
	}
	function change(num) {
		console.log('Window Type change triggiered');
		let temp = [...current];
		let price = selectedWindow.price;
		let index;

		if (selectedWindow.custom) {
			roomsDispatch({ type: 'changeCustom', custom: false });
		}
		for (let i = 0; i < temp.length; i++) {
			if (num == data.length) {
				roomsDispatch({ type: 'changeCustom', custom: true });
				// setPreviousIndex(num);
				temp[num] = true;
				console.log(temp);
				setCurrent(temp);
				setAvailableFrameTypes({
					fiberglass: null,
					vinyl: null,
					wood: null,
					img: customWindowImg,
				});
				return;
			}
			if (num == i) {
				let APIitem = data[i].fields;

				index = i;
				temp[index] = true;

				if (previousIndex != null) {
					price -= data[previousIndex].fields.price;
				}
				price += data[index].fields.price;
				roomsDispatch({ type: 'windowAttributes', price: price });
				if (APIitem) {
					roomsDispatch({ type: 'windowAttributes', img: APIitem.image.fields.file.url });
					roomsDispatch({ type: 'windowAttributes', windowType: APIitem.title });
				}
				// roomsDispatch({ type: 'windowAttributes', img: APIitem.image.fields.file.url });

				setAvailableFrameTypes({
					fiberglass: APIitem.fiberglass,
					vinyl: APIitem.vinyl,
					wood: APIitem.wood,
					img: APIitem.image.fields.file.url,
				});
				setPreviousIndex(index);
			} else if (temp[i] == true) {
				temp[i] = undefined;
			}
		}

		setCurrent(temp);
	}

	const listItems = [
		...data.map((item, index) => (
			<div
				key={index}
				onClick={() => change(index)}
				className={` ${
					current[index] ? 'selected ' : ' hover:drop-shadow-xl cursor-pointer'
				} transition border-solid border-2 hover: border-gray-400 flex flex-col items-center justify-center h-32 w-32 p-2 bg-white`}>
				<img className='h-24' src={item.fields.image.fields.file.url} />
				<div className='text-textPrimary'>{item.fields.title}</div>
			</div>
		)),

		// Custom Item
		<div
			key='custom'
			onClick={() => change(data.length)} // Define the onClick handler for the custom item
			className={` ${
				current[data.length] ? 'selected ' : ' hover:drop-shadow-xl cursor-pointer'
			} transition border-solid border-2 hover: border-gray-400 flex flex-col items-center justify-center h-32 w-32 p-2 bg-white`}>
			{/* Custom item content */}
			{/* You can customize the content of the custom item based on your requirements */}
			<img className='h-24' src={customWindowImg} />
			<div className='text-textPrimary'>Custom Item</div>
		</div>,
	];

	return (
		<div id='Type' className='my-10'>
			<div className='flex flex-row'>
				<div>
					<div className=' text-3xl'>Window Type</div>
					<div className='text-textPrimary'>
						Choose what type of window you want for this project
					</div>
				</div>
				<InformationCircleIcon
					// onClick={() => setModalState(true)}
					className='cursor-pointer text-textPrimary2  h-10'></InformationCircleIcon>
			</div>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				className='flex flex-wrap gap-5'>
				{listItems}
				<div></div>
			</motion.div>
		</div>
	);
}

function CustomWindowType({ data, setAvailableFrameTypes }) {
	const selectedWindow = useContext(QuoteRoomsContext).selectedWindow;
	const roomsDispatch = useContext(QuoteRoomsContext).roomsDispatch;

	const [current, setCurrent] = useState([...Array(data.length)]);
	const [previousIndex, setPreviousIndex] = useState(null);

	useEffect(() => {
		initialize();
	}, [selectedWindow]);

	function initialize() {
		const newArray = current.map((element, index) => {
			if (!data[index]) return false;
			let APIitem = data[index].fields || null;
			if (selectedWindow.type === APIitem.title) {
				setAvailableFrameTypes({
					fiberglass: APIitem.fiberglass,
					vinyl: APIitem.vinyl,
					wood: APIitem.wood,
				});
				setPreviousIndex(index);
				return true;
			}
			return false;
		});

		setCurrent(newArray);
	}
	function clear() {
		const newArray = current.map((element, index) => {
			return false;
		});
		setCurrent(newArray);
		roomsDispatch();
	}

	function change(num) {
		let temp = [...current];
		let price = selectedWindow.price;
		let index;

		for (let i = 0; i < temp.length; i++) {
			let APIitem = data[i].fields;
			if (num == i) {
				index = i;
				temp[index] = true;

				if (previousIndex != null) {
					price -= data[previousIndex].fields.price;
				}
				price += data[index].fields.price;
				roomsDispatch({ type: 'windowAttributes', price: price });
				roomsDispatch({ type: 'windowAttributes', img: APIitem.image.fields.file.url });
				roomsDispatch({ type: 'windowAttributes', windowType: APIitem.title });

				setAvailableFrameTypes({
					fiberglass: APIitem.fiberglass,
					vinyl: APIitem.vinyl,
					wood: APIitem.wood,
					img: APIitem.image.fields.file.url,
				});
				setPreviousIndex(index);
			} else if (temp[i] == true) {
				temp[i] = undefined;
			}
		}

		setCurrent(temp);
	}

	const listItems = data.map((item, index) => (
		<div
			key={index}
			onClick={() => change(index)}
			className={` ${
				current[index] ? 'selected ' : ' hover:drop-shadow-xl cursor-pointer'
			} transition border-solid border-2 hover: border-gray-400 flex flex-col items-center justify-center h-32 w-32 p-2 bg-white`}>
			<img className='h-24' src={item.fields.image.fields.file.url} />
			<div className='text-textPrimary'>{item.fields.title}</div>
		</div>
	));

	return (
		<div id='Type' className='my-10'>
			<div className='flex flex-row'>
				<div>
					<div className=' text-3xl'>Custom Window Type</div>
					<div className='text-textPrimary'>
						Choose what type of window you want for this project
					</div>
				</div>
				<InformationCircleIcon
					// onClick={() => setModalState(true)}
					className='cursor-pointer text-textPrimary2  h-10'></InformationCircleIcon>
				<button type='button' className='bg-white ml-4 border-slate-500 border-2 h-10 p-2 rounded '>
					Deselect
				</button>
			</div>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				className='flex flex-wrap gap-5'>
				{listItems}
				<div></div>
			</motion.div>
			<FileUploadForm></FileUploadForm>
		</div>
	);
}

function GrillesType() {
	const [current, setCurrent] = useState([...Array(data.length)]);
	useEffect(() => {
		initialize();
	}, [selectedWindow]);
	function initialize() {
		const newArray = current.map((element, index) => {
			let window = data[index].fields;
			if (selectedWindow.type === window.title) {
				return true;
			}
			return false;
		});

		setCurrent(newArray);
	}

	return (
		<div className='my-10'>
			<div className=' text-3xl'>Grilles Pattern</div>
			<div className='text-textPrimary'>Choose what type of grille you want for this project</div>
			<div className='mt-5 flex justify-evenly'></div>
		</div>
	);
}

// Complete This one
function Measurements() {
	const selectedWindow = useContext(QuoteRoomsContext).selectedWindow;
	const roomsDispatch = useContext(QuoteRoomsContext).roomsDispatch;
	useEffect(() => {
		initialize();
	}, [selectedWindow]);

	const initialize = () => {
		document.getElementById('width').value = selectedWindow.width;
		document.getElementById('height').value = selectedWindow.height;
	};

	return (
		<div className='my-10'>
			<div className=' text-3xl'>Measurement Pattern (Optional)</div>
			<div className='text-textPrimary'>Tell us the measurement of your window if you have it</div>
			<div className='flex flex-row justify-around gap-4 items-center p-2 mt-5'>
				<img className='w-48' src={widthImg}></img>
				<div className=''>
					<div>
						<div className='font-semibold leading-6 '>Measure the Width</div>
						<div className='text-textPrimary'>
							Measure the width of the window at the center. Extend your tape measure horizontally,
							from trim to trim
						</div>
					</div>
					<div className=' mt-2 flex flex-col'>
						<label className='text-textPrimary'>Width (Inches)</label>
						<input
							value={selectedWindow.width}
							onChange={(e) => {
								const EMPTYINPUT = -1;
								roomsDispatch({ type: 'windowAttributes', width: e.target.value || EMPTYINPUT });
							}}
							type='text'
							name='width'
							id='width'
							className='h-14 w-56 border border-gray-400  px-4 bg-white'
							placeholder='inches'
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-row justify-around gap-4 items-center p-2 mt-5'>
				<img className='w-48' src={heightImg}></img>
				<div className=''>
					<div>
						<div className='font-semibold leading-6 '>Measure the Height</div>
						<div className='text-textPrimary'>
							Measure the height of the window at the center. Extend your tape measure vertically,
							from trim to trim
						</div>
					</div>
					<div className=' mt-2 flex flex-col'>
						<label className='text-textPrimary'>Height (Inches)</label>
						<input
							value={selectedWindow.height}
							onChange={(e) => {
								const EMPTYINPUT = -1;
								roomsDispatch({ type: 'windowAttributes', height: e.target.value || EMPTYINPUT });
							}}
							type='text'
							name='height'
							id='height'
							className='h-14 w-56 border border-gray-400  px-4 bg-white'
							placeholder='inches'
						/>
					</div>
				</div>
			</div>
			<div className='mt-5 flex justify-evenly'></div>
		</div>
	);
}

function FileUploadForm() {
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [dragging, setDragging] = useState(false);

	const handleFileChange = (event) => {
		const files = event.target.files;

		const selectedFilesArray = Array.from(files);
		setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...selectedFilesArray]);
	};

	const handleDragOver = (event) => {
		event.preventDefault();
		setDragging(true);
	};

	const handleDragLeave = () => {
		setDragging(false);
	};

	const handleDrop = (event) => {
		event.preventDefault();
		const files = event.dataTransfer.files;
		const selectedFilesArray = Array.from(files);
		setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...selectedFilesArray]);
		setDragging(false);
	};

	const handleFileDelete = (index) => {
		const updatedFiles = [...selectedFiles];
		updatedFiles.splice(index, 1);
		setSelectedFiles(updatedFiles);
	};

	return (
		<form>
			<div
				className={`mt-4 p-4 border-2 border-dashed ${dragging ? 'bg-gray-100' : 'bg-white'}`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}>
				<label htmlFor='photos' className='mb-2'></label>
				<input
					type='file'
					id='photos'
					name='photos'
					multiple
					onChange={handleFileChange}
					className='hidden'
				/>
				<div
					onClick={() => document.getElementById('photos').click()}
					className='bg-gray-200 pt-4 cursor-pointer flex flex-col items-center border-4 border-dashed border-blue-200 text-xl'>
					<LuUploadCloud style={{ transform: 'scale(2) ' }} className='mt-2'></LuUploadCloud>
					<div className='py-2'>Drag and drop or click here</div>
				</div>
				{selectedFiles.length > 0 && <p className='my-2'>Selected Files: {selectedFiles.length}</p>}
				<div className='flex flex-wrap gap-4'>
					{selectedFiles.map((file, index) => (
						<div key={index} className='border h-20 p-2 w-full flex flex-row items-center '>
							{file.type.startsWith('image/') ? (
								<img
									src={URL.createObjectURL(file) || 'https://via.placeholder.com/150'}
									alt={`Selected File ${index}`}
									className='w-auto h-full rounded'
								/>
							) : (
								<PhotoIcon className=' w-auto h-full rounded '></PhotoIcon>
							)}

							<div className=' mt-2 flex flex-row justify-between w-full items-center'>
								<p className=' ml-5 text-center'>{file.name}</p>

								<TiDelete
									style={{ transform: 'scale(2.5)' }}
									className='mx-2 cursor-pointer text-red-500 '
									onClick={() => handleFileDelete(index)}></TiDelete>
							</div>
						</div>
					))}
				</div>
			</div>
		</form>
	);
}

const ProjectPhoto = () => {
	const selectedWindow = useContext(QuoteRoomsContext).selectedWindow;
	const roomsDispatch = useContext(QuoteRoomsContext).roomsDispatch;

	const input = document.getElementById('photo');
	if (input) {
		input.onchange = () => {
			// console.log(e.target.files[0].name);
			roomsDispatch({ type: 'windowAttributes', photo: 'true' });
		};
	}

	useEffect(() => {
		initialize();
	}, [selectedWindow]);

	const initialize = () => {
		// document.getElementById('photo').value = selectedWindow.photo;
	};

	return (
		<div id='Photo' className='my-10'>
			<div className=' text-3xl'>Photo(s) for Project</div>
			<div className='text-textPrimary'>
				Upload at least one picture of where you plan on installing the window
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				className='flex flex-row justify-around gap-4 items-start p-2 '>
				<PhotoIcon className=' w-48 '></PhotoIcon>
				<div className='mt-4'>
					<div>
						<div className='font-semibold leading-6 '>Take Picture</div>
						<div className='text-textPrimary'>
							Upload at least one picture of where in the building you plan on installing the new
							window, so we can have a good idea of the situation
						</div>
					</div>

					{/* <div className=''>
						<label for='formFile' className='form-label inline-block mb-2 text-gray-700'>
						</label>
						<input
							className='block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
							type='file'
							id='photo'
							multiple
						/>
					</div> */}

					<FileUploadForm></FileUploadForm>
				</div>
			</motion.div>
			<div className='mt-5 flex justify-evenly'></div>
		</div>
	);
};

function FrameType({ availableFrameTypes, data }) {
	const selectedWindow = useContext(QuoteRoomsContext).selectedWindow;
	const roomsDispatch = useContext(QuoteRoomsContext).roomsDispatch;

	const [current, setCurrent] = useState([...Array(data.length)]);
	const [previousIndex, setPreviousIndex] = useState(null);

	const [modalState, setModalState] = useState(false);

	useEffect(() => {
		initialize();
	}, [selectedWindow]);

	useEffect(() => {}, [availableFrameTypes]);

	const title = <div className='text-textPrimary font-bold text-2xl'>Frame Types</div>;
	const body = (
		<div id='Frame' className='mt-4 text-textPrimary flex flex-col gap-4'>
			<div>
				<div style={{ ...styles.all, ...styles.wood }} className='relative mx-auto '>
					<span
						style={{ ...styles.span }}
						className='text-2xl p-1 absolute left-5 top-2 text-white underline decoration-white'>
						Wood
					</span>
				</div>

				<div className='mt-2'>
					Wood windows offer a timeless aesthetic appeal and can enhance the overall charm of a
					space. They provide excellent insulation, reducing energy loss and enhancing energy
					efficiency. However, wood requires regular maintenance to prevent rotting, warping, or
					insect damage, and it can be relatively expensive compared to other materials
				</div>
			</div>
			<div>
				<div style={{ ...styles.all, ...styles.fiberglass }} className='relative mx-auto '>
					<span
						style={{ ...styles.span }}
						className='text-2xl p-1 absolute left-5 top-2 text-white underline decoration-white'>
						Fiberglass
					</span>
				</div>

				<div className='mt-2'>
					Fiberglass windows offer exceptional durability and strength. They are resistant to
					warping, rotting, and insect damage, requiring minimal maintenance. Fiberglass also
					provides excellent insulation and can withstand extreme weather conditions. However,
					fiberglass windows tend to be more expensive than vinyl options, and customization choices
					may be limited
				</div>
			</div>
			<div>
				<div style={{ ...styles.all, ...styles.vinyl }} className='relative mx-auto '>
					<span
						style={{ ...styles.span }}
						className='text-2xl p-1 absolute left-5 top-2 text-white underline decoration-white'>
						Vinyl
					</span>
				</div>

				<div className='mt-2'>
					Vinyl windows are cost-effective and low-maintenance. They offer good insulation and are
					resistant to rot, warping, and insect damage. However, they may not provide the same level
					of elegance as wood or fiberglass windows. Over time, extreme temperatures can cause vinyl
					to expand and contract, potentially affecting the window's performance
				</div>
			</div>
		</div>
	);

	function initialize() {
		const newArray = current.map((element, index) => {
			let APIitem = data[index].fields;
			if (selectedWindow.frame == APIitem.frameType.toLowerCase()) {
				setPreviousIndex(index);
				return true;
			}
			return false;
		});
		setCurrent(newArray);
	}

	function change(num) {
		let temp = [...current];
		let price = selectedWindow.price;
		let index;
		for (let i = 0; i < temp.length; i++) {
			if (num == i) {
				temp[i] = true;
				index = i;
			} else if (temp[i] == true) {
				temp[i] = undefined;
			}
		}
		let APIitem = data[index].fields;
		if (previousIndex != null) {
			price -= data[previousIndex].fields.price;
		}
		price += data[index].fields.price;
		roomsDispatch({ type: 'windowAttributes', price: price });
		setCurrent(temp);
		changeFrame(APIitem);
	}
	function changeFrame(APIitem) {
		roomsDispatch({ type: 'windowAttributes', frame: APIitem.frameType.toLowerCase() });
	}

	const listItems = data.map((item, index) =>
		availableFrameTypes[item.fields.frameType.toLowerCase()] ? (
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				key={index}
				onClick={() => change(index)}
				className={` ${
					current[index] ? 'selected ' : 'hover:drop-shadow-xl cursor-pointer'
				}  transition border-solid font-medium  border-2 hover: border-gray-400 flex flex-col items-center justify-center h-32 p-2 bg-white`}>
				<div className=' text-3xl text-textPrimary'>{item.fields.frameType}</div>
			</motion.div>
		) : (
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				key={index}
				className='border-solid font-medium  border-2 hover: border-gray-400 flex flex-col items-center justify-center h-32 p-2 opacity-50 bg-gray-200'>
				<div className=' text-3xl text-textPrimary'>{item.fields.frameType}</div>
				<div className='text-sm text-textPrimary font-bold'>Unavailable</div>
			</motion.div>
		)
	);

	return (
		<>
			<ItemsModal openState={[modalState, setModalState]} title={title} body={body}></ItemsModal>
			<div className='my-10'>
				<div className='flex flex-row'>
					<div className=''>
						<div className=' text-3xl'>Frame Type</div>
						<div className='text-textPrimary'>Choose the material of the Frame for this window</div>
					</div>
					<InformationCircleIcon
						onClick={() => setModalState(true)}
						className='cursor-pointer text-textPrimary2  h-10'></InformationCircleIcon>
				</div>
				<div className='mt-5 grid grid-cols-2 gap-4'>{listItems}</div>
			</div>
		</>
	);
}

function ItemsModal({ openState, title, body }) {
	let isOpen = openState[0];
	let setIsModalOpen = openState[1];

	const selectedRoom = useContext(QuoteRoomsContext).selectedRoom;
	const roomsDispatch = useContext(QuoteRoomsContext).roomsDispatch;

	function closeModal() {
		setIsModalOpen(false);
	}

	function openModal() {
		setIsModalOpen(true);
	}

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'>
								<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
									<Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
										{title}
									</Dialog.Title>

									{body}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
function ExteriorColorType({ data, selectedFrame }) {
	const selectedWindow = useContext(QuoteRoomsContext).selectedWindow;
	const roomsDispatch = useContext(QuoteRoomsContext).roomsDispatch;

	const [current, setCurrent] = useState([...Array(data.length)]);
	useEffect(() => {
		initialize();
	}, [selectedWindow]);

	function initialize() {
		const newArray = current.map((element, index) => {
			let APIitem = data[index].fields;
			if (selectedWindow.exterior == APIitem.title) {
				return true;
			}
			return false;
		});
		setCurrent(newArray);
	}

	function change(num) {
		let temp = [...current];
		for (let i = 0; i < temp.length; i++) {
			if (num == i) {
				temp[i] = true;
			} else if (temp[i] == true) {
				temp[i] = undefined;
			}
		}
		roomsDispatch({ type: 'windowAttributes', exterior: data[num].fields.title });
		setCurrent(temp);
	}

	const listItems = data.map((item, index) =>
		item.fields[selectedFrame] ? (
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				key={index}
				onClick={() => change(index)}
				className={` ${
					current[index] ? 'selected ' : 'hover:drop-shadow-xl cursor-pointer'
				}  transition border-solid border-2 hover: border-gray-400 flex flex-col items-center justify-center h-40 w-32 p-2 bg-white`}>
				<img className='h-24' src={item.fields.image.fields.file.url} />
				<div className='text-textPrimary text-center '>{item.fields.title}</div>
			</motion.div>
		) : null
	);

	return (
		<div className='my-10'>
			<div className='flex flex-row'>
				<div>
					<div className=' text-3xl'>PVC Exterior Color</div>
					<div className='text-textPrimary'>
						Choose what type of PVC exterior color you want for this window
					</div>
				</div>
				<InformationCircleIcon
					onClick={() => setModalState(true)}
					className='cursor-pointer text-textPrimary2  h-10'></InformationCircleIcon>
			</div>
			{/* <div className='mt-5 grid grid-cols-2 quotesm:grid-cols-3 quotemd:grid-cols-4 quotelg:grid-cols-5  xl:grid-cols-6  gap-4'>
				{listItems}
			</div> */}
			<div className='mt-5 flex flex-wrap gap-5'>{listItems}</div>
		</div>
	);
}

function InteriorColorType({ data, selectedFrame }) {
	const selectedWindow = useContext(QuoteRoomsContext).selectedWindow;
	const roomsDispatch = useContext(QuoteRoomsContext).roomsDispatch;

	const [current, setCurrent] = useState([...Array(data.length)]);
	const [previousIndex, setPreviousIndex] = useState(null);

	useEffect(() => {
		initialize();
	}, [selectedWindow]);

	function initialize() {
		const newArray = current.map((element, index) => {
			let APIitem = data[index].fields;
			if (selectedWindow.interior == APIitem.title) {
				setPreviousIndex(index);

				return true;
			}
			return false;
		});
		setCurrent(newArray);
	}

	function change(num) {
		let temp = [...current];
		let price = selectedWindow.price;

		for (let i = 0; i < temp.length; i++) {
			if (num == i) {
				temp[i] = true;
			} else if (temp[i] == true) {
				temp[i] = undefined;
			}
		}

		if (previousIndex != null) {
			price -= data[previousIndex].fields.price;
		}
		price += data[num].fields.price;
		roomsDispatch({ type: 'windowAttributes', price: price });

		roomsDispatch({ type: 'windowAttributes', interior: data[num].fields.title });
		setCurrent(temp);
	}

	const listItems = data.map((item, index) =>
		item.fields[selectedFrame] ? (
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				key={index}
				onClick={() => change(index)}
				className={` ${
					current[index] ? 'selected ' : 'hover:drop-shadow-xl cursor-pointer'
				}  transition border-solid border-2 hover: border-gray-400 flex flex-col items-center justify-center h-40 w-32 p-2 bg-white`}>
				<img className='h-24' src={item.fields.image.fields.file.url} />
				<div className='text-textPrimary text-center '>{item.fields.title}</div>
			</motion.div>
		) : null
	);
	return (
		<div id='Interior' className='my-10'>
			<div className='flex flex-row'>
				<div>
					<div className=' text-3xl'>PVC Interior Color</div>
					<div className='text-textPrimary'>
						Choose what type of PVC interior color you want for this window
					</div>
				</div>
				<InformationCircleIcon
					// onClick={() => setModalState(true)}
					className='cursor-pointer text-textPrimary2 h-10'></InformationCircleIcon>
			</div>
			{/* <div className='mt-5 grid grid-cols-2 quotesm:grid-cols-3 quotemd:grid-cols-4 quotelg:grid-cols-5  xl:grid-cols-6  gap-4'>
				{listItems}
			</div> */}
			<div className='mt-5 flex flex-wrap gap-4'>{listItems}</div>
		</div>
	);
}
function TrimType({ data, selectedFrame }) {
	const selectedWindow = useContext(QuoteRoomsContext).selectedWindow;
	const roomsDispatch = useContext(QuoteRoomsContext).roomsDispatch;

	const [current, setCurrent] = useState([...Array(data.length)]);
	const [previousIndex, setPreviousIndex] = useState(null);

	useEffect(() => {
		initialize();
	}, [selectedWindow]);

	function initialize() {
		const newArray = current.map((element, index) => {
			let APIitem = data[index].fields;
			if (selectedWindow.interior == APIitem.title) {
				setPreviousIndex(index);

				return true;
			}
			return false;
		});
		setCurrent(newArray);
	}

	function change(num) {
		let temp = [...current];
		let price = selectedWindow.price;

		for (let i = 0; i < temp.length; i++) {
			if (num == i) {
				temp[i] = true;
			} else if (temp[i] == true) {
				temp[i] = undefined;
			}
		}

		if (previousIndex != null) {
			price -= data[previousIndex].fields.price;
		}
		price += data[num].fields.price;
		roomsDispatch({ type: 'windowAttributes', price: price });

		roomsDispatch({ type: 'windowAttributes', interior: data[num].fields.title });
		setCurrent(temp);
	}

	const listItems = data.map((item, index) =>
		item.fields[selectedFrame] ? (
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				key={index}
				onClick={() => change(index)}
				className={` ${
					current[index] ? 'selected ' : 'hover:drop-shadow-xl cursor-pointer'
				}  transition border-solid border-2 hover: border-gray-400 flex flex-col items-center justify-center h-40 w-32 p-2 bg-white`}>
				<img className='h-24' src={item.fields.image.fields.file.url} />
				<div className='text-textPrimary text-center '>{item.fields.title}</div>
			</motion.div>
		) : null
	);
	return (
		<div id='Interior' className='my-10'>
			<div className=' text-3xl'>Interior Color</div>
			<div className='text-textPrimary'>
				Choose what type of interior color you want for this window
			</div>
			{/* <div className='mt-5 grid grid-cols-2 quotesm:grid-cols-3 quotemd:grid-cols-4 quotelg:grid-cols-5  xl:grid-cols-6  gap-4'>
				{listItems}
			</div> */}
			<div className='mt-5 flex flex-wrap gap-4'>{listItems}</div>
		</div>
	);
}
function ModalCreateRoom({ openState, currentState, mode }) {
	const roomsDispatch = useContext(QuoteRoomsContext).roomsDispatch;
	let setIsModalOpen = openState[1];

	let setCurrent = currentState[1];

	const createRoom = () => {
		let userName = document.getElementById('roomNameCreation').value || 'New Room';
		if (mode == 'Create') {
			roomsDispatch({ type: 'addRoom', name: userName });
			setCurrent((prevCurrent) => [...prevCurrent, false]);
		} else if (mode == 'Edit') {
			roomsDispatch({ type: 'editRoom', name: userName });
		}
		setIsModalOpen(false);
	};

	return (
		<div className='m-0 mx-auto  flex flex-col justify-between    '>
			<div className='relative  w-full cursor-default   py-2 pl-3 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
				<label for='roomName'>{mode == 'Create' && <div>Name: </div>}</label>
				<input
					type='text'
					name='roomName'
					id='roomNameCreation'
					className='transition-all flex items-center h-10 border my-1 rounded px-4 w-full bg-gray-50'
					placeholder='Living Room'
				/>
			</div>
			<div className='mt-4 text-black flex flex-row justify-between '>
				<button
					type='button'
					className='inline-flex transition justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium  hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
					onClick={() => createRoom()}>
					Confirm
				</button>
				<button
					type='button'
					className='inline-flex transition justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium  hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
					onClick={() => setIsModalOpen(false)}>
					Cancel
				</button>
			</div>
		</div>
	);
}

function MyModal({ openState, mode, currentState }) {
	let isOpen = openState[0];
	let setIsModalOpen = openState[1];

	const selectedRoom = useContext(QuoteRoomsContext).selectedRoom;
	const roomsDispatch = useContext(QuoteRoomsContext).roomsDispatch;
	function closeModal() {
		setIsModalOpen(false);
	}

	function openModal() {
		setIsModalOpen(true);
	}

	function DeleteMessage() {
		return (
			<>
				<div>
					<div className='text-center'>Name: {selectedRoom ? selectedRoom.name : null}</div>
					<div className='mt-4 text-textPrimary font-semibold'>
						Are you sure you want to delete room?
					</div>
					<div className='mt-4 flex flex-row justify-between'>
						<button
							className='inline-flex transition justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium  hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
							onClick={() => {
								setIsModalOpen(false);
								roomsDispatch({ type: 'removeRoom' });
							}}>
							Yes
						</button>
						<button
							className='inline-flex transition justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium  hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
							onClick={() => {
								setIsModalOpen(false);
							}}>
							Cancel
						</button>
					</div>
				</div>
			</>
		);
	}
	function DeleteWindowMessage() {
		return (
			<>
				{/* <div className='text-center'>Room: {selectedRoom ? selectedRoom.name : null}</div> */}
				<div className='mt-2 text-textPrimary font-semibold'>
					Are you sure you want to delete window?
				</div>
				<div className='mt-4 flex flex-row justify-between'>
					<button
						className='inline-flex transition justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium  hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
						onClick={() => {
							setIsModalOpen(false);
							roomsDispatch({ type: 'removeWindow' });
						}}>
						Yes
					</button>
					<button
						className='inline-flex transition justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium  hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
						onClick={() => {
							setIsModalOpen(false);
						}}>
						Cancel
					</button>
				</div>
			</>
		);
	}

	function IncompleteMessage() {
		return <div></div>;
	}

	function EditMessage() {}
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'>
								<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
									<Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
										{mode == 'Edit' && (
											<div>
												<div className='text-center'>Name: {selectedRoom.name}</div>

												<div className='text-3xl mt-4'>Edit Room Name</div>
											</div>
										)}
										{mode == 'Delete' && <DeleteMessage></DeleteMessage>}
										{mode == 'Create' && (
											<div>
												<div className='text-3xl '>Create New Room</div>
											</div>
										)}
										{mode == 'DeleteWindow' && <DeleteWindowMessage></DeleteWindowMessage>}
										{mode == 'Incomplete' && <IncompleteMessage></IncompleteMessage>}
									</Dialog.Title>
									{(mode == 'Create' || mode == 'Edit') && (
										<ModalCreateRoom
											currentState={currentState}
											openState={openState}
											mode={mode}></ModalCreateRoom>
									)}
									{/* {mode == 'Edit' && (
										<div className='mt-2'>
											<p className='text-sm text-gray-500'>
												Your payment has been successfully submitted. We’ve sent you an email with
												all of the details of your order.
											</p>
										</div>
									)} */}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

const ManagementSection = ({ quoteModeState }) => {
	const rooms = useContext(QuoteRoomsContext).rooms;
	const selectedRoom = useContext(QuoteRoomsContext).selectedRoom;

	const roomsDispatch = useContext(QuoteRoomsContext).roomsDispatch;
	const carouselRef = useContext(QuoteSwiperContext).reinitialized;

	const selectedRoomId = useContext(QuoteRoomsContext).selectedRoomId;
	const setQuoteMode = quoteModeState[1];
	const [isOpen, setIsModalOpen] = useState(false);
	const [mode, setMode] = useState('Edit');

	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		if (selectedRoom.name == 'Blank') {
			setMode('Edit');
			setIsModalOpen(true);
		} else {
			setInitialized(true);
		}
	}, [isOpen]);

	function closeModal() {
		setIsModalOpen(false);
	}

	function openModal(modeInput) {
		setMode(modeInput);
		setIsModalOpen(true);
	}
	const createWindow = () => {
		roomsDispatch({ type: 'addWindow' });
		carouselRef.current = 'true';
		setQuoteMode('Customize');
	};

	const [current, setCurrent] = useState([...Array(rooms.length)]);

	function change(num) {
		let temp = [...current];
		for (let i = 0; i < temp.length; i++) {
			if (num == i) {
				temp[i] = true;
			} else if (temp[i] == true) {
				temp[i] = undefined;
			}
		}

		roomsDispatch({ type: 'selectRoom', id: num });
		setCurrent(temp);
	}

	function initialize() {
		const newArray = current.map((element, index) => {
			if (selectedRoomId == index) {
				return true;
			}
			return false;
		});
		setCurrent(newArray);
	}

	const totalQuantityInRoom = (room) => {
		let total = 0;
		if (room.selectedWindowId == -1) return total;
		room.windows.forEach((window) => {
			total += window.quantity;
		});
		return total;
	};
	const totalPriceInRoom = (room) => {
		let total = 0;
		if (room.selectedWindowId == -1) return total;
		room.windows.forEach((window) => {
			total += window.price * window.quantity;
		});
		return total;
	};
	const totalPriceInQuote = () => {
		let total = 0;
		if (rooms.selectedRoomId == -1) return total;
		rooms.forEach((room) => {
			total += totalPriceInRoom(room);
		});
		return total;
	};

	const verifyQuote = () => {
		if (rooms.length == 0) {
			alert('Please create a room first');
			return;
		}

		try {
			rooms.forEach((room) => {
				const noWindowExists = room.selectedWindowId == -1;
				if (noWindowExists) {
					alert('Please create a window for each room');
					throw BreakException;
				}
			});
		} catch (e) {
			return;
		}

		try {
			rooms.forEach((room) => {
				room.windows.forEach((window) => {
					const allCompleted =
						window.type && window.frame && window.interior && window.exterior && window.photo;
					if (!allCompleted) {
						alert('Please complete all required fields for each window');
						throw BreakException;
					}
				});
			});
		} catch (e) {
			return;
		}

		setQuoteMode('Review');
	};

	useEffect(() => {
		initialize();
	}, [selectedRoomId]);

	const RoomsSection = rooms.map((room, index) => (
		<div
			key={index}
			onClick={() => change(index)}
			className={`  ${
				current[index] ? 'selected ' : 'hover:drop-shadow-xl'
			}  m-4 relative border-solid border-2 border-gray-400  items-center justify-evenly h-40 w-56 px-2 pt-2 flex flex-col  bg-white`}>
			{/* <TrashIcon className=' h-8 ml-36'></TrashIcon> */}

			<div
				onClick={() => openModal('Edit')}
				className='  flex flex-row justify-center items-center text-textPrimary text-center font-semibold '>
				<div className='inline text-center mx-auto'>{room.name}</div>{' '}
				<PencilSquareIcon className='mb-1 ml-1 cursor-pointer  h-6 hover:text-yellow-800'></PencilSquareIcon>
			</div>
			<div className='flex flex-col justify-between'>
				<div className='text-textPrimary text-center  '>Total Cost: ${totalPriceInRoom(room)}</div>
				<div className='text-textPrimary text-center '>Quantity: {totalQuantityInRoom(room)}</div>
			</div>
			<div className='flex flex-row gap-2 '>
				<button
					onClick={() => openModal('Delete')}
					type='button'
					className='rounded flex flex-row border border-gray-800 items-center m-0 justify-center gap-1  bg-red-500 transition hover:bg-red-600'>
					<TrashIcon className=' text-gray-800 font-semibold h-6 '></TrashIcon>
					{/* <div className='font-semibold'>Delete</div> */}
				</button>

				<button
					onClick={() => createWindow()}
					class=' bg-quotePrimary border border-gray-800 text-textPrimary2 close-button hover:bg-yellow-400'>
					{' '}
					<span class='text  '>Add Window</span>
					<div class='icons text-black'>
						<PlusIcon className='h-6'></PlusIcon>
					</div>
				</button>
			</div>
		</div>
	));

	return (
		<div className='    h-full'>
			<MyModal
				openState={[isOpen, setIsModalOpen]}
				currentState={[current, setCurrent]}
				mode={mode}></MyModal>
			{initialized && (
				<div className=' flex flex-col justify-between '>
					<div className='text-3xl font-semibold text-gray-800 mx-auto mt-8 '>Project Rooms</div>

					<div className='mt-10 flex flex-wrap flex-row justify-center items-center bg-gray-100 '>
						{RoomsSection}
						<div
							onClick={() => openModal('Create')}
							className='hover:drop-shadow-lg hover:bg-green-100  bg-green-50 m-4  rounded-2xl border-solid border-2  border-gray-400 flex flex-col items-center justify-center h-32 w-32 p-2'>
							<div className='text-textPrimary text-center text-xl font-semibold  '>Add Room</div>
							<PlusIcon></PlusIcon>
						</div>
					</div>
					<hr className='mx-auto my-10 '></hr>
					<div className=' flex flex-col justify-center items-center '>
						<div className='border w-1/2 p-2 flex flex-col justify-center border-gray-500 bg-white'>
							<div className='font-bold text-textPrimary text-center  text-2xl '>Total Quote:</div>
							<div className=' mt-1 text-textPrimary2 font-semibold text-center text-5xl '>
								${totalPriceInQuote()}
							</div>
						</div>
						<button
							type='button'
							onClick={() => verifyQuote()}
							className='hover:drop-shadow-lg rounded-lg border mt-3  flex  justify-center border-black bg-primary hover:bg-darkPrimary'>
							<div className=' font-bold min-w-max p-2 text-white text-center  text-2xl w-1/2'>
								Complete Quote?
							</div>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

function createPDF() {
	const doc = new jsPDF();
	doc.text('Hello world!', 10, 10);
	// doc.save('a4.pdf');
	// return doc.output('datauristring');
	return doc;
}

function FirebaseForm() {
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

	return (
		<div className='App'>
			<input
				type='file'
				onChange={(event) => {
					setImageUpload(event.target.files[0]);
				}}
			/>
			<button onClick={uploadFile}>Upload</button>
		</div>
	);
}
export default function Quote() {
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

	const names = [
		'quoteWindowType',
		'quoteFrame',
		'quoteInteriorColor',
		'quoteExteriorColor',
		'quoteWindowCustom',
	];

	const selectedWindow = useContext(QuoteRoomsContext).selectedWindow;

	const selectedFrame = selectedWindow ? selectedWindow.frame : null;

	const [mode, setMode] = useState('Customize');
	const [transitionMode, setTransitionMode] = useState('Customize');

	const [data, setData] = useState([]);
	const getTitles = useCallback(async () => {
		try {
			let temp = [];
			for (let i = 0; i < names.length; i++) {
				const res = await client.getEntries({ content_type: names[i] });
				temp.push(res.items);
			}

			setData(temp);
		} catch (error) {
			console.log(error);
		}
	}, []);

	let initialized = false;
	useEffect(() => {
		if (initialized) {
			return;
		}
		getTitles().then(() => {});

		// w

		initialized = true;
	}, [getTitles]);

	// Solution Link: https://stackoverflow.com/questions/43441856/how-to-scroll-to-an-element
	const interiorRef = useRef(null);

	const [availableFrameTypes, setAvailableFrameTypes] = useState({
		fiberglass: true,
		vinyl: true,
		wood: true,
	});

	const changeTransitionMode = () => {
		setTransitionMode(mode);
	};

	return (
		<div id='' className='relative min-h-screen  '>
			<Masthead img={img1} title={'Get Quote'}></Masthead>

			{/* <div className='flex relative mb-20 justify-between align-center'> */}
			<div className=' bg-white p-10'>
				<div className='container text-center mx-auto py-5'>
					<div className='text-2xl font-semibold text-gray-800 '>Design Options</div>

					<div className='text-textPrimary'>Build your product by selecting options below</div>
				</div>
				<button
					type='button'
					onClick={() => {
						createPDF();
					}}
					className='p-4 bg-red-200'>
					Test Function
				</button>
				<FirebaseForm></FirebaseForm>
			</div>

			{/* <div ref={beforeCheckoutSubmitRef}>
				<WindowView className='w-full md:hidden pt-4' modeState={[mode, setMode]}></WindowView>
			</div> */}

			{/* This component will never render if the beforeCheckoutSubmitRef is not used */}
			{/* {!beforeCheckoutSubmitShown ? (
				<WindowView
					onLoad={console.log('WindowView selected')}
					isModal={true}
					modeState={[mode, setMode]}
					className='appear top-20 md:top-20 md:hidden absolute z-10 bg-transparent w-full'></WindowView>
			) : null} */}

			<Transition
				show={mode != 'Review' && (transitionMode == 'Manage' || transitionMode == 'Customize')}
				enter='transition-opacity duration-150'
				enterFrom='opacity-0'
				enterTo='opacity-100'
				leave='transition-opacity duration-150'
				leaveFrom='opacity-100'
				leaveTo='opacity-0'
				afterLeave={() => setTransitionMode(mode)}
				className='bg-gray-100 h-full pb-6'>
				<div
					className=' flex flex-col md:flex-row md:justify-between mx-auto '
					style={{ 'max-width': 2500 }}>
					<div className='md:w-1/2'>
						<WindowView
							setCategoryFocus={setCategoryFocus}
							modeState={[mode, setMode]}
							className=' pt-10 mb-5 md:block md:w-1/2'></WindowView>
					</div>
					<Transition
						show={mode == 'Customize' && data != false && transitionMode == 'Customize'}
						enter='transition-opacity duration-75'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition-opacity duration-150'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
						afterLeave={() => changeTransitionMode()}
						className='md:w-1/2'>
						<div className='m-4 mr-5'>
							<WindowType
								data={data[0]}
								setAvailableFrameTypes={setAvailableFrameTypes}></WindowType>
							<Transition
								show={selectedWindow.custom}
								enter='transition-opacity duration-75'
								enterFrom='opacity-0'
								enterTo='opacity-100'
								leave='transition-opacity duration-150'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'>
								<CustomWindowType
									data={data[4]}
									setAvailableFrameTypes={setAvailableFrameTypes}></CustomWindowType>
							</Transition>
							<FrameType availableFrameTypes={availableFrameTypes} data={data[1]}></FrameType>

							{selectedFrame != null && selectedWindow.type != null ? (
								<div>
									<ProjectPhoto></ProjectPhoto>

									<InteriorColorType
										ref={interiorRef}
										data={data[2]}
										selectedFrame={selectedFrame}></InteriorColorType>
									<ExteriorColorType
										data={data[3]}
										selectedFrame={selectedFrame}></ExteriorColorType>
									<Measurements></Measurements>

									<div className='border p-2 flex flex-col justify-center border-gray-500 bg-white'>
										<div className='font-bold text-textPrimary text-center  text-2xl '>
											Total Price:
										</div>
										<div className=' text-textPrimary2 font-semibold text-center text-4xl '>
											${selectedWindow.price}
										</div>
									</div>
								</div>
							) : (
								<div className='border p-2 flex flex-col justify-center border-gray-500 bg-yellow-100'>
									<div className='font-bold text-textPrimary text-center  text-2xl '>
										Select Window and Glass Types to see all other options
									</div>
								</div>
							)}
						</div>
					</Transition>
					<Transition
						show={mode == 'Manage' && transitionMode == 'Manage'}
						enter='transition-opacity duration-75'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition-opacity duration-150'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
						afterLeave={() => setTransitionMode(mode)}
						className='md:w-1/2 min-h-full '>
						<ManagementSection quoteModeState={[mode, setMode]}></ManagementSection>
					</Transition>
				</div>
			</Transition>
			<Transition
				show={mode == 'Review' && transitionMode == 'Review'}
				enter='transition-opacity duration-150'
				enterFrom='opacity-0'
				enterTo='opacity-100'
				leave='transition-opacity duration-150'
				leaveFrom='opacity-100'
				leaveTo='opacity-0'
				afterLeave={() => setTransitionMode(mode)}
				className='bg-gray-100 h-full'>
				<Form setMode={setMode}></Form>
			</Transition>
			<Transition
				show={mode == 'Complete' && transitionMode == 'Complete'}
				enter='transition-opacity duration-150'
				enterFrom='opacity-0'
				enterTo='opacity-100'
				className=' h-full'>
				<div className='text-center mt-20 font-semibold text-xl'>
					{' '}
					We'll get back to you in a few days!
				</div>
			</Transition>
		</div>
	);
}
