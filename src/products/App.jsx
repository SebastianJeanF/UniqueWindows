import Navigation from '../components/Nav';
import Footer from '../components/Footer';
import Products from '../pages/Products';
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
	return (
		<ParallaxProvider>
			<div className='flex flex-col '>
				<Navigation className='top-0' />
				<Products className='relative' />
				<Footer />
			</div>
		</ParallaxProvider>
	);
}

export default App;
