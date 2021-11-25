import React , {useContext, useEffect}from 'react'
import { AuthContext } from '../../config/auth'
import {View, Text} from 'react-native'

const Loading = (props) => {
    const auth = useContext(AuthContext)

    
    useEffect(() =>{
        if(auth.loading && auth.user === null){
            props.navigation.navigate('Login')
        }
        else if(auth.loading && auth.user !== null){
            props.navigation.navigate('Main')
        }
    },[auth.loading, auth.user])
    return (
        <View style = {{flex: 1, backgroundColor: '#3772ff'}}>
            <Text>Caregando ...</Text>
            <Text>{JSON.stringify(auth.user)}</Text>
        </View>
        )
}

export default Loading
