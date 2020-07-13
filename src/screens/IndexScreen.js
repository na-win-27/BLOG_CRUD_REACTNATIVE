/******************************************
 *  Author : na-win-27
 *  Created On : Mon Jul 13 2020
 *  File : IndexScreen.js
 *******************************************/
import React,{useContext, useEffect} from 'react';
import { View,StyleSheet,Text,Button ,TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext'
import { FlatList } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'

const IndexScreen = ({navigation}) => {

    const {state,deleteBlogPost,getBlogPosts}=useContext(Context)

    useEffect(()=>{
        getBlogPosts()
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
          });
      
          return () => {
            listener.remove();
          };
        
    },[])

    return (
        <View>
       
        <FlatList data={state} keyExtractor={(item)=>item.title} renderItem={({item})=>{
            return(
               <TouchableOpacity onPress={()=>navigation.navigate('Show',{id:item.id})}>
                <View style={styles.row }>
                <Text style={styles.title}>{item.title}-{item.id}</Text>
                
                <TouchableOpacity onPress={()=>{deleteBlogPost(item.id)}}>
                <Feather style={styles.icon} name="trash"/>
                </TouchableOpacity>
                </View>
                </TouchableOpacity>
            )
        }} />
        </View>
    );
};


IndexScreen.navigationOptions=({navigation})=>{
    return({
        headerRight:()=>
        {
            return(
                <TouchableOpacity onPress={()=>navigation.navigate('Create')}>
                <Feather name="plus" size={60}/>
                </TouchableOpacity>
            )
        }
    })
}

const styles=StyleSheet.create({
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        padding:15,
        borderTopWidth:2,
        borderColor:"black",
    },
    title:{
        fontSize:19,
    },
    icon:{
        fontSize:25,
    }
})

export default IndexScreen;