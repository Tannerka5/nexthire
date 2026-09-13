import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ApplicationBoard } from './pages/ApplicationBoard';
import { PriorityList } from './pages/PriorityList';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="applications" element={<ApplicationBoard />} />
        <Route path="priorities" element={<PriorityList />} />
      </Route>
    </Routes>
  );
}

export default App;
