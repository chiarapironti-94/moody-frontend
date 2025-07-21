import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainArea from './components/MainArea/MainArea';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* renders MainArea inside Layout at “/” */}
          <Route index element={<MainArea />} />
          {/* ... */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
