import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Forecast from './pages/Forecast';
import Cities from './pages/Cities';
import ModelInsights from './pages/ModelInsights';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forecast" element={<Forecast />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/model-insights" element={<ModelInsights />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
