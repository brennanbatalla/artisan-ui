import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBoundaryPage } from './pages/ErrorBoundaryPage';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryPage}
      onError={(error, info) => console.error(error, info)}>
      <Routes>
        <Route path={'/'} element={<DashboardPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
