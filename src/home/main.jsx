import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../components/Nav';
import Footer from '../components/Footer';
import Home from './Home';

function App() {
	return (
		<div className='flex flex-col '>
			<Navigation className='top-0' />
			<Home className='relative' />
			<Footer />
		</div>
	);
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<App></App>
		</BrowserRouter>
	</React.StrictMode>
);
