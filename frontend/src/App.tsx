import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@pages/home';
import Layout from '@components/layout';
import Video from '@pages/video';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="video" element={<Video />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
