import { Route, Routes } from 'react-router-dom';
import Home from '../elements/Home';
import Action from '../elements/Action';
import Data from '../elements/Data';
import Profile from '../elements/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/action" element={<Action />} />
      <Route path="/data" element={<Data />} />
    </Routes>
  );
}

export default AppRoutes;