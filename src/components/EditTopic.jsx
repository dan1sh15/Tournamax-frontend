import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';

const EditTopic = () => {
  const [topic, setTopic] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTopicDetails = async () => {
    try {
      setLoading(true);
      const url = process.env.REACT_APP_BASE_URL + `/getTopic/${id}`;
      const response = await fetch(url);
      const responseData = await response.json();

      if(responseData.success) {
        setLoading(false);
        setTopic(responseData.data);
      } else {
        setLoading(false);
        toast.error(responseData.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Server didn't respond");
    }
  };

  useEffect(() => {
    fetchTopicDetails();
    // eslint-disable-next-line
  }, []);

  const changeHandler = (e) => {
    setTopic(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = process.env.REACT_APP_BASE_URL + `/editTopic/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...topic})
    });
    
    const responseData = await response.json();

    if(responseData.success) {
      setLoading(false);
      toast.success(responseData.message);
      navigate('/');
    } else {
      setLoading(false);
      toast.error(responseData.message);
    }
  }

  return (
    <form onSubmit={submitHandler} className='w-10/12 max-md:w-11/12 mx-auto flex mt-10 max-md:mt-7 max-phone:mt-5 flex-col gap-y-5 max-md:gap-y-4 max-phone:gap-y-3'>
      <div className='flex flex-col gap-y-2 max-phone:gap-y-1'>
        <label htmlFor="title" className='text-xl font-semibold max-ipad:text-lg max-md:text-[1rem] max-phone:text-sm'>Title</label>
        <input 
          type="text" 
          id='title'
          name='title'
          className='border border-black px-5 py-2 outline-none max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs max-md:px-4 max-phone:px-3 max-phone:py-1'
          placeholder='Enter Title'
          value={topic.title}
          onChange={changeHandler}
          required
        />
      </div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor="description" className='text-xl font-semibold max-ipad:text-lg max-md:text-[1rem] max-phone:text-sm'>Description</label>
        <input 
          type="text" 
          id='description'
          name='description'
          className='border border-black px-5 py-2 outline-none max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs max-md:px-4 max-phone:px-3 max-phone:py-1'
          placeholder='Enter Description'
          value={topic.description}
          onChange={changeHandler}
          required
        />
      </div>

      <button className='bg-green-700 text-white px-4 py-2 text-lg w-fit mx-auto rounded hover:bg-green-600 transition-all duration-300 ease-in-out max-ipad:text-[1rem] max-md:text-sm max-phone:text-xs font-[500]'>
        {
          loading ? <Loader color={'white'} /> : "Edit"
        }
      </button>
    </form>
  )
}

export default EditTopic
