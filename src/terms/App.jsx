import Navigation from '../components/Nav';
import Footer from '../components/Footer';
// import Terms from '../pages/Terms';
import Home from '../home/Home.jsx';

import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
	return (
		<ParallaxProvider>
			<div className='flex flex-col '>
				<Navigation className='top-0' />
				<Home className='relative' />
				<Footer />
			</div>
		</ParallaxProvider>
	);
}

export default App;
