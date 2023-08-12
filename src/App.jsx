import Navigation from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
// import Context from './context/Context';
// import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
	return (
		// <ParallaxProvider>
		//  <Context>

		<div className='flex flex-col '>
			<Navigation className='top-0' />
			<Home className='relative' />
			<Footer />
		</div>
	);
}

export default App;
