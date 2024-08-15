import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import toast from 'react-hot-toast';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Topics = () => {
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const url = process.env.REACT_APP_BASE_URL + '/getAllTopics';
      const response = await fetch(url);
      const responseData = await response.json();

      if(responseData.success) {
        setLoading(false);
        setTopics(responseData.data);
      } else {
        setLoading(false);
        toast.error(responseData.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Server didn't respond");
    }
  };
  
  const deleteHandler = async () => {
    setShowDelete(false);
    setLoading(true);
    const url = process.env.REACT_APP_BASE_URL + `/deleteTopic/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const responseData = await response.json();

    if(responseData.success) {
      setLoading(false);
      toast.success(responseData.message);
      await fetchTopics();
    } else {
      setLoading(false);
      toast.error(responseData.message);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <>
      {
        loading ? (<div className='h-screen w-full flex items-center justify-center'><Loader color={'black'} /></div>) : (
          <div className={`h-full flex flex-col gap-y-7 max-md:gap-y-5 max-phone:gap-y-4 py-10 ${showDelete && 'opacity-[0.55]'} `}>

            <div className='flex flex-col gap-y-5 max-md:gap-y-4 max-phone:gap-y-3'>
              {
                topics?.length > 0 ? topics.map((topic) => (
                  <div key={topic._id} className='bg-white shadow-lg border-2 p-5 flex items-center justify-between rounded-lg hover:scale-[1.04] transition-all duration-200 ease-linear max-md:p-4 max-phone:p-3 max-[250px]:flex-col max-[250px]:gap-y-2 max-[250px]:items-start'>
                    <div className='flex flex-col gap-y-1'>
                      <p className='text-xl font-semibold max-ipad:text-lg max-md:text-[1rem] max-phone:text-sm'>{topic.title}</p>
                      <p className='text-[#797979] max-md:text-sm max-phone:text-xs'>{topic.description}</p>
                    </div>

                    <div className='flex items-center text-2xl max-ipad:text-xl max-md:text-lg max-phone:text-[1rem] gap-x-3 max-[250px]:w-full max-[250px]:justify-between'>
                      <RiDeleteBin6Line title='delete' onClick={() => {
                        setId(topic._id);
                        setShowDelete(true);
                      }} className='text-red-500 cursor-pointer' />
                      <FaEdit onClick={() => {
                        navigate(`/editTopic/${topic._id}`)
                      }} className='text-[#797979] cursor-pointer' title='edit' />
                    </div>
                  </div>
                )) : <h1 className='text-center text-3xl max-ipad:text-2xl max-md:text-xl max-phone:text-lg font-semibold text-[#797979]'>No Topics to display please add some...</h1>
              }
            </div>
          </div>
        )
      }
      {/* delete modal */}
      <div className={`absolute w-full top-0 left-0 flex items-center justify-center h-screen ${showDelete ? 'scale-[1]' : 'scale-0'} transition-all duration-300 ease-linear`}>
          <div className='bg-[#fff] shadow-2xl border-2 rounded-lg p-5 flex flex-col items-center gap-y-5 max-phone:w-[85%] '>
            <p className='text-lg font-semibold max-md:text-[1rem] max-phone:text-sm text-center'>Are you sure you want to delete this topic?</p>
            <div className='flex items-center gap-x-3 flex-wrap gap-2 justify-center'>
              <button onClick={deleteHandler} className='text-white font-[500] bg-red-600 rounded px-3 py-1 max-md:text-sm max-phone:text-xs '>Delete</button>
              <button onClick={() => setShowDelete(false)} className='bg-[#c1c1c1] font-[500] px-4 py-1 rounded max-md:text-sm max-phone:text-xs'>Cancel</button>
            </div>
          </div>
      </div>
    </>
  )
}

export default Topics
