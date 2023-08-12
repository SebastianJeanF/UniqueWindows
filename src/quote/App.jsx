import Navigation from '../components/Nav';
import Footer from '../components/Footer';
import Quote from '../pages/Quote';
import Context from '../context/Context';
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
	return (
		<ParallaxProvider>
			<Context>
				<div className='flex flex-col '>
					<Navigation className='top-0' />
					<Quote />
					<Footer />
				</div>
			</Context>
		</ParallaxProvider>
	);
}

export default App;
