import React,{useEffect} from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { updateUser } from '@/actions';

const ServerIndex = (props: any) => {
  const dispatch = useDispatch();
  const state = useMappedState(state => state);
  
  useEffect(()=>{
    dispatch(
      updateUser({
        name: 'thj',
        phone: 12312312,
      }),
    );
  },[])
  return <div>server index</div>;
};

export default ServerIndex;
