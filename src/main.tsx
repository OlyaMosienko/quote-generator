import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './style.css';

async function enableMocking() {
	//   if (process.env.NODE_ENV !== 'development') {
	//     return
	//   }

	const { worker } = await import('./mocks/browser');
	return worker.start();
}

enableMocking().then(() =>
	createRoot(document.getElementById('root')!).render(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
	),
);
