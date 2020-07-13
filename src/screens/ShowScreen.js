/******************************************
 *  Author : na-win-27
 *  Created On : Mon Jul 13 2020
 *  File : ShowScreen.js
 *******************************************/
import React, { useContext } from 'react';
import { View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext'
import {EvilIcons} from '@expo/vector-icons'

const ShowScreen = ({navigation}) => {

    const {state}=useContext(Context)
    const id=navigation.getParam('id')

    const blogPost=state.find((blogPost)=>blogPost.id===id)



    return (
        <View>
        <Text>{blogPost.title}</Text>
        <Text>{blogPost.content}</Text>
        </View>
    );
};

ShowScreen.navigationOptions=({navigation})=>{
    return({
        headerRight:()=>
        {
            return(
                <TouchableOpacity onPress={()=>navigation.navigate('Edit',{
                    id:navigation.getParam('id')
                })} c>
                <EvilIcons name="pencil" size={60}/>
                </TouchableOpacity>
            )
        }
    })
}

const styles=StyleSheet.create({

})

export default ShowScreen