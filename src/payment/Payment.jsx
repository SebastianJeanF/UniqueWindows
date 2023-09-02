import Masthead from '../components/NewMasthead.jsx';
import img3 from '../assets/Payment.jpg';
import img2 from '../assets/PaymentMasthead.jpg';
import { GrContactInfo } from 'react-icons/gr';
import { MdPayments } from 'react-icons/md';
import { HiOutlineReceiptTax } from 'react-icons/hi';

function Payment() {
	return (
		<div>
			<Masthead img={img2} title={'Payment Methods'}></Masthead>

			<section className=' '>
				<div className=' mx-auto'>
					<div className=' py-12 '>
						<div className=' container  m-auto md:flex px-6 text-gray-600 md:px-12 xl:px-6'>
							<div className='space-y-6 md:space-y-0 flex flex-col xl:items-center  gap-6  xl:gap-12'>
								<div className='text-textPrimary'>
									<MdPayments className='text-gray-800 h-10 w-10 mx-auto'></MdPayments>

									<div className='text-2xl text-center text-gray-800 font-bold md:text-4xl'>
										Payment
									</div>
									<hr className='mx-auto'></hr>
									<div>
										<div class='mt-6 '>
											At Unique Windows LLC, we want to make the payment process as easy and
											convenient as possible for our customers. We accept a variety of payment
											methods, including cash, check, and credit card. This allows you to choose the
											option that works best for you. In addition, we also offer financing options
											to help you afford the windows you need for your home or commercial building.
											Our financing options make it possible for you to make affordable monthly
											payments that fit your budget. Whether you prefer to pay with cash, check,
											credit card, or take advantage of our financing options, we're here to work
											with you and ensure your payment experience is hassle-free.
										</div>
									</div>
								</div>
								<img style={{ height: '50%' }} className='w-1/2 m-auto fade-right' src={img3} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Payment;
