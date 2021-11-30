import React from 'react'
import { AntDesign} from '@expo/vector-icons';
import {
  Status,
  StatusIcon,
  StatusMessage,
} from './styles';
const CriarStatus = ({status}) => {
    return (
        <Status>
            <StatusIcon>
              {status.code !== '' &&
                
                (status.code === 'sucesso' ? (
                  <AntDesign name='checkcircle' size={12} color='#14CC60' />
                ) : (
                  <AntDesign name='closecircle' size={12} color='#FF5154' />
                ))}
            </StatusIcon>
            <StatusMessage code={status.code}>{status.status}</StatusMessage>
          </Status>
    )
}

export default CriarStatus
