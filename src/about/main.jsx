import React from 'react';
import ReactDOM from 'react-dom/client';
import Navigation from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import About from './About.jsx';
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



ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App></App>
	</React.StrictMode>
);
