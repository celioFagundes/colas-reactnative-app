import React, { useContext} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../config/auth';
import { ActivityIndicator} from 'react-native';
import{ Wrapper} from './style.js'

const Loading = (props) => {
  const auth = useContext(AuthContext);
  
  useFocusEffect(() => {
      if (auth.loading && auth.user === null) {
        props.navigation.navigate('Login');
      } else if (auth.loading && auth.user !== null) {
        props.navigation.navigate('Main');
      }
    });

  return (
    <Wrapper colors={['#6E99FF', '#3772ff']}>
      <ActivityIndicator size = 'large' color = '#fff'/>
    </Wrapper>
  );
};

export default Loading;
