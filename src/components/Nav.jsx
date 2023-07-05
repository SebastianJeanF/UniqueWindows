import { useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
// import { ReactComponent as Logo } from '../assets/logo-instagram.svg';
import { ReactComponent as Facebook } from '../assets/logo-facebook.svg';
import companyLogo from '../assets/custom/logo.jpg';

export default function Navigation() {
	const [isNavOpen, setIsNavOpen] = useState(false);

	return (
		<div className='fixed top-0 flex flex-col z-20 w-full'>
			{/* <div className='hidden relative h-5 w-full bg-primary justify-end align-center navmd:flex'>
				<Logo className='my-auto hover:bg-slate-600 h-full max-w-4 mr-5'></Logo>
				<Facebook className='my-auto hover:bg-slate-600 h-full max-w-4  mr-5'></Facebook>
			</div> */}
			<nav className='drop-shadow-xl sticky bg-white text-white navmd:text-gray-700   navmd:bg-white px-4 sm:px-4 py-2.5 navmd:py-1  w-full  left-0  border-gray-200'>
				<div className='lg:container  flex flex-wrap items-center justify-between navmd:justify-center mx-auto'>
					<CustomLink to='Window-Project/' className=' mr-10 flex items-center'>
						<img className='h-16' src={companyLogo} />
					</CustomLink>
					<div className='flex navmd:order-2'>
						<CustomLink
							className=' ml-2 hidden text-white transition items-center  bg-primary hover:bg-darkPrimary focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 navmd:mr-0  navmd:block'
							to='Window-Project/quote'>
							Get Quote
						</CustomLink>
						<button
							data-collapse-toggle='navbar-sticky'
							type='button'
							className=' bg-white inline-flex items-center p-2 transition text-sm text-gray-500 rounded-lg navmd:hidden hover:bg-gray-300  focus:outline-none focus:ring-2 focus:ring-gray-300 '
							aria-controls='navbar-sticky'
							aria-expanded='false'
							onClick={() => setIsNavOpen((prev) => !prev)}>
							<span className='sr-only'>Open main menu</span>
							<svg
								className='w-6 h-6'
								aria-hidden='true'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
									clipRule='evenodd'></path>
							</svg>
						</button>
					</div>
					<div
						className={`items-center justify-between w-full navmd:flex navmd:w-auto navmd:order-1 ${
							isNavOpen ? 'bg-none' : 'hidden'
						}`}
						id='navbar-sticky'>
						<ul className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 navmd:flex-row navmd:space-x-8 navmd:mt-0 navmd:text-sm navmd:font-medium navmd:border-0 navmd:bg-white '>
							<li onClick={() => setIsNavOpen(false)}>
								<CustomLink to='Window-Project/' aria-current='page'>
									Home
								</CustomLink>
							</li>
							<li onClick={() => setIsNavOpen(false)}>
								<CustomLink to='Window-Project/about'> About Us</CustomLink>
							</li>
							<li onClick={() => setIsNavOpen(false)}>
								<CustomLink to='Window-Project/products'> Our Products</CustomLink>
							</li>
							<li onClick={() => setIsNavOpen(false)}>
								<CustomLink to='Window-Project/payment'>Payment</CustomLink>
							</li>
							<li onClick={() => setIsNavOpen(false)} className='navmd:hidden'>
								<CustomLink to='Window-Project/quote'>Quote</CustomLink>
							</li>
							<li onClick={() => setIsNavOpen(false)}>
								<CustomLink to='Window-Project/contact'>Contact Us</CustomLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export function CustomLink({ children, to, ...props }) {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });

	return (
		<div>
			<Link
				className={`${
					match ? 'text-primary font-bold navmd:font-semibold' : 'text-gray-700 '
				}  transition h-full block py-2 pl-3 pr-4 rounded hover:bg-gray-200 navmd:hover:bg-transparent navmd:hover:text-primary navmd:p-0  `}
				to={to}
				{...props}>
				{children}
			</Link>
		</div>
	);
}
