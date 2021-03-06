import { useState, useEffect, useContext } from 'react';
import firebase from './firebase';
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
  update,
} from '@firebase/database';
import { AuthContext } from './auth';
import moment from 'moment';
const database = getDatabase(firebase);

export const useDatabase = (endpoint) => {
  const [data, setData] = useState();
  const auth = useContext(AuthContext);
  useEffect(() => {
    if (auth.user) {
      const user = auth.user.uid;
      const dbref = ref(database, user + endpoint);
      onValue(dbref, (snapshot) => {
        setData(snapshot.val());
      });
    }

    return () => {
      setData({});
    };
  }, [endpoint]);
  return data;
};
export const useDatabasePush = () => {
  const [status, setStatus] = useState('');
  const auth = useContext(AuthContext);
  const save = (endpoint, data) => {
    const user = auth.user.uid;
    const dataRef = ref(database, user + endpoint);
    const novaRef = push(dataRef);
    set(novaRef, data);
  };
  return [status, save];
};

export const useDatabaseRemove = () => {
  const auth = useContext(AuthContext);
  const removeItem = (endpoint) => {
    const user = auth.user.uid;
    const dataRef = ref(database, user + endpoint);
    const removeRef = remove(dataRef);
  };
  return removeItem;
};

export const useDatabaseUpdate = () => {
  const [status, setStatus] = useState('');
  const auth = useContext(AuthContext);
  const atualizar = (endpoint, data) => {
    const user = auth.user.uid;
    const dataRef = ref(database, user + endpoint);
    update(dataRef, data);
  };
  return [status, atualizar];
};

export const useDatabaseSharePush = () => {
  const [status, setStatus] = useState('');
  const genKey = () => {
    const subNum = Math.floor(Math.random() * 50);
    const addNum = Math.floor(Math.random() * 50);
    const code = parseInt(
      moment()
        .subtract(subNum, 'days')
        .add(addNum, 'seconds')
        .format('YYMMDDHHmmssSSS')
    )
      .toString(16)
      .toUpperCase();
    return (
      code.substring(0, 4) +
      '-' +
      code.substring(4, 8) +
      '-' +
      code.substring(8, 12)
    );
  };
  const save = (data, arrayKey) => {
    const dataRef = ref(database, '/compartilhadas/' + arrayKey);
    const novaRef = push(dataRef);
    set(novaRef, data);
  };
  return [status, save, genKey];
};
export const useDatabaseShareGet = () => {
  const getPerguntas = (codigo) =>
    new Promise((resolve) => {
      const dbref = ref(database, '/compartilhadas/' + codigo);
      onValue(dbref, (snapshot) => {
        resolve(snapshot.val());
      });
    });

  return [getPerguntas];
};
