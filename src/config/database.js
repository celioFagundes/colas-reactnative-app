import { useState, useEffect, useContext } from 'react';
import firebase from './firebase';
import { getDatabase, ref, onValue, set, push,remove } from '@firebase/database';
import { AuthContext } from './auth';

const database = getDatabase(firebase);

export const useDatabase = (endpoint) => {
  const [data, setData] = useState();
  const auth = useContext(AuthContext)
  useEffect(() => {
   
    if(auth.user){
    const user = auth.user.uid
    const dbref = ref(database, user + endpoint);
    onValue(dbref, (snapshot) => {
      setData(snapshot.val());
    });}

    return(() =>{
      setData({})
    })
  }, [endpoint]);
  return data;
};
export const useDatabasePush = () => {
  const [status, setStatus] = useState('');
  const auth = useContext(AuthContext)
  const save = (endpoint, data) => {
    const user = auth.user.uid
    const dataRef = ref(database, user + endpoint);
    const novaRef = push(dataRef);
    set(novaRef, data);
  };
  return [status, save];
};

export const useDatabaseRemove = () =>{
  const auth = useContext(AuthContext)
  const removeItem = endpoint =>{
    const user = auth.user.uid
    const dataRef = ref(database, user + endpoint)
    const removeRef = remove(dataRef)
  }
  return removeItem
}