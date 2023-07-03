import Navigation from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Quote from './pages/Quote';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Products from './pages/Products';
import Payment from './pages/Payment';
import Context from './context/Context';
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
							<Route exact path='/Window-Project/' element={<Home className='relative' />} />
							<Route path='/Window-Project/about' element={<About />} />
							<Route path='/Window-Project/quote' element={<Quote />} />
							<Route path='/Window-Project/contact' element={<Contact />} />
							<Route path='/Window-Project/terms' element={<Terms />} />
							<Route path='/Window-Project/products' element={<Products />} />
							<Route path='/Window-Project/payment' element={<Payment />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</Context>
		</ParallaxProvider>
	);
}

export default App;
