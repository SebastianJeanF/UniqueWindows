import Navigation from '../components/Nav';
import Footer from '../components/Footer';
import Contact from './Contact.jsx';
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
	return (
		<ParallaxProvider>
			<div className='flex flex-col '>
				<Navigation className='top-0' />
				<Contact className='relative' />
				<Footer />
			</div>
		</ParallaxProvider>
	);
}

export default App;
