import Navigation from '../components/Nav';
import Footer from '../components/Footer';
import About from '../pages/About';
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
	return (
		<div>
			<ParallaxProvider>
				<div className='flex flex-col '>
					<Navigation className='top-0' />
					<About></About>
					<Footer />
				</div>
			</ParallaxProvider>
		</div>
	);
}

export default App;
