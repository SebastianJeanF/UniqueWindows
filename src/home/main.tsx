import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../components/Nav';
import Footer from '../components/Footer';
import Home from './Home';

function App() {
	return (
		<div className='flex flex-col '>
			<Navigation />
			<Home />
			<Footer />
		</div>
	);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<App></App>
		</BrowserRouter>
	</React.StrictMode>
);
