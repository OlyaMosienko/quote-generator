import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers';
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
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>,
	),
);
