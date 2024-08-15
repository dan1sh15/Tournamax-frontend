import './App.css';
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import Topics from "./components/Topics";
import AddTopic from './components/AddTopic';
import EditTopic from './components/EditTopic';

function App() {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/addTopic');
  };

  return (
    <div className="min-h-screen bg-[#fff] w-8/12 max-md:w-10/12 max-phone:w-11/12 mx-auto">

      <div className='flex mt-5 bg-blue-950 rounded items-center justify-between py-4 px-8 text-white max-sm:px-5 max-phone:flex-col max-phone:gap-y-3'>
        <Link to={'/'}>
          <h1 className='text-3xl font-bold max-ipad:text-2xl max-sm:text-xl max-phone:text-center'>Tournamax Assignment</h1>
        </Link>
        <button onClick={handleClick} className='text-lg max-ipad:text-[1rem] max-sm:text-sm bg-white text-blue-950 px-4 py-1 rounded-md font-semibold'>Add Topic</button>
      </div>

      <Routes>
        <Route path='/' element={<Topics />} />
        <Route path='/addTopic' element={<AddTopic />} />
        <Route path='/editTopic/:id' element={<EditTopic />} />
        <Route path='*' element={<h1 className='text-center text-xl font-semibold mt-10'>The Page does not exist</h1>} />
      </Routes>
    </div>
  );
}

export default App;
