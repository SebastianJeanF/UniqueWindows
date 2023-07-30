import Navigation from '../components/Nav';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import About from '../pages/About';
import Quote from '../pages/Quote';
import Contact from '../pages/Contact';
import Terms from '../pages/Terms';
import Products from '../pages/Products';
import Payment from '../pages/Payment';
import Context from '../context/Context';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<ParallaxProvider>
			<Context>
				<div className='flex flex-col '>
					<Navigation className='top-0' />
					<div className='relative'>
						<Routes className='relative'>
							<Route path='' element={<Home className='relative' />} />
							<Route path='/about' element={<About />} />
							<Route path='/quote' element={<Quote />} />
							<Route path='/contact' element={<Contact />} />
							<Route path='/terms' element={<Terms />} />
							<Route path='/products' element={<Products />} />
							<Route path='/payment' element={<Payment />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</Context>
		</ParallaxProvider>
	);
}

export default App;
