import Masthead from '../components/NewMasthead';
import img3 from '../assets/house.jpg';
import img2 from '../assets/ProductMasthead.jpg';
import img1 from '../assets/bratislava.jpg';
import { GrContactInfo } from 'react-icons/gr';
import { MdPayments } from 'react-icons/md';
import { HiOutlineReceiptTax } from 'react-icons/hi';
import { TbWindow } from 'react-icons/tb';

function Products() {
	const styles = {
		all: {
			backgroundPosition: '50% 50%',
			backgroundRepeat: 'no-repeat',
			backgroundSize: '350px 350px',
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

	return (
		<div>
			<Masthead img={img2} title={'Products'}></Masthead>
			<section className=' '>
				<div className=' mx-auto'>
					<div className=' py-12 '>
						<div className=' container  m-auto md:flex px-6 text-gray-600 md:px-12 xl:px-6'>
							<div className='space-y-6 md:space-y-0 flex flex-col xl:items-center  gap-6  xl:gap-12'>
								<div className='text-textPrimary'>
									<TbWindow className='text-gray-800 h-10 w-10 mx-auto'></TbWindow>

									<div className='text-2xl text-center text-gray-800 font-bold md:text-4xl'>
										Windows
									</div>
									<hr className='mx-auto'></hr>
									<div style={{ fontSize: '1rem' }}>
										<div class='mt-6 '>
											With Unique Windows, we offer high-quality window installation services for
											both residential and commercial properties. We specialize in providing
											custom-fit windows that perfectly suit your building's design and
											architecture, while also meeting your energy-efficiency needs. Our team of
											experienced professionals is dedicated to providing excellent customer
											service, ensuring that every project is completed on time and within budget.
											Whether you're building a new home or upgrading your existing windows, we have
											the expertise to help you achieve your goals.
										</div>
									</div>
								</div>
								{/* <img
									style={{ height: '50%' }}
									className='contactUs my-auto fade-right'
									src={img3}
								/> */}
							</div>
						</div>
					</div>
				</div>
			</section>
			<section style={{ backgroundColor: '#F7F7F7' }}>
				<div className='pt-6 px-6'>
					<div className='text-center text-2xl font-semibold'>Explore By Material</div>
					<div className='flex flex-col md:flex-row justify-center items-center gap-1 mt-6 pb-8'>
						<div
							style={{ ...styles.all, ...styles.wood, height: '300px', width: '300px' }}
							className='relative  '>
							<span
								style={{ ...styles.span }}
								className='text-2xl p-1 absolute left-5 top-2 text-white underline decoration-white'>
								Wood Clad
							</span>
						</div>
						<div
							style={{ ...styles.all, ...styles.fiberglass, height: '300px', width: '300px' }}
							className='relative'>
							<span
								style={{ ...styles.span }}
								className='text-2xl p-1 absolute left-5 top-2 text-white underline decoration-white'>
								Fiberglass
							</span>
						</div>
						<div
							style={{ ...styles.all, ...styles.vinyl, height: '300px', width: '300px' }}
							className='relative'>
							<span
								style={{ ...styles.span }}
								className='text-2xl p-1 absolute left-5 top-2 text-white underline decoration-white'>
								Vinyl
							</span>
						</div>
					</div>
					{/* <div style={{ padding: '.25px' }} className='my-8 bg-gray-300'></div> */}
					<div></div>
				</div>
			</section>
		</div>
	);
}

export default Products;
