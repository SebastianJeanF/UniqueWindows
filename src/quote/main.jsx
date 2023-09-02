import React from 'react';
import ReactDOM from 'react-dom/client';
import Navigation from '../components/Nav';
import Footer from '../components/Footer';
import Quote from './Quote.jsx';
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


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App></App>
	</React.StrictMode>
);
