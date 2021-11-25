import { useState, useEffect } from "react";
import firebase from "./firebase";
import { getDatabase, ref, onValue, set, push,remove } from "@firebase/database";

const database = getDatabase(firebase);
export const useDatabase = (endpoint) => {
  const [data, setData] = useState();
  useEffect(() => {
    const dbref = ref(database, endpoint);
    onValue(dbref, (snapshot) => {
      setData(snapshot.val());
    });

    return(() =>{
      setData({})
    })
  }, [endpoint]);
  return data;
};
export const useDatabasePush = () => {
  const [status, setStatus] = useState("");

  const save = (endpoint, data) => {
    const dataRef = ref(database, endpoint);
    const novaRef = push(dataRef);
    set(novaRef, data);
  };
  return [status, save];
};
export const useDatabasePushPergunta = (user) => {
  const [status, setStatus] = useState("");

  const save = (endpoint, data) => {
    const dataRef = ref(database, user + endpoint);
    const novaPergRef = push(dataRef);
    set(novaPergRef, data);
  };
  return [status, save];
};
export const useDatabaseRemove = () =>{
  const removeItem = endpoint =>{
    const dataRef = ref(database, endpoint)
    const removeRef = remove(dataRef)
  }
  return removeItem
}