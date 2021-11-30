import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../config/auth';
import { useDatabase } from '../../config/database';
import CriarTopico from './CriarTopico';
import CriarSecao from './CriarSecao';
import CriarPergunta from './CriarPergunta';
import { Wrapper, ScrollContainer } from './styles';

const CriarItems = (props) => {
  
  const auth = useContext(AuthContext);
  const topicos = useDatabase('/topicos/');
  const [status, setStatus] = useState({
    tipo: '',
    status: '',
    code: '',
  });

  useEffect(() => {
    if (auth.loading && auth.user === null) {
      props.navigation.navigate('Loading');
    }
  }, [auth.user]);
  return (
    <Wrapper>
      <ScrollContainer>
        <CriarTopico topicos={topicos} status={status} setStatus={setStatus} />
        <CriarSecao topicos={topicos} status={status} setStatus={setStatus} />
        <CriarPergunta
          topicos={topicos}
          status={status}
          setStatus={setStatus}
        />
      </ScrollContainer>
    </Wrapper>
  );
};

export default CriarItems;
