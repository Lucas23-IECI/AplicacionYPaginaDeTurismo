import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { LocationProvider } from './lib/location';
import ErrorBoundary from './components/ui/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <LocationProvider>
        <RouterProvider router={router} />
      </LocationProvider>
    </ErrorBoundary>
  );
}
