/******************************************
 *  Author : na-win-27
 *  Created On : Mon Jul 13 2020
 *  File : BlogContexxt.js
 *******************************************/
 import createDataContext from './createDataContext'
 import jsonServer from '../api/jsonServer'

 const reducer=(state,action)=>{
     switch(action.type){
       case 'get_blogposts':
         return action.payload

        case 'add_blogpost':
            return [...state,{title:action.payload.title,content:action.payload.content,id:Math.floor(Math.random()*99999)}]
        case 'delete_blogpost':
            return state.filter((blogpost)=>blogpost.id !== action.payload)
        case 'edit_blogpost':
            return state.map(blogPost => {
              return blogPost.id === action.payload.id ? action.payload : blogPost;
            });
        default:
            return state
     }

 }


 const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get('/blogposts');

    dispatch({ type: 'get_blogposts', payload: response.data });
  };
};


 const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
      

      jsonServer.put(`/blogposts/${id}`,{
        title,content
      })
      dispatch({
        type: 'edit_blogpost',
        payload: { id, title, content }
      });
      if (callback) {
        callback();
      }
    };
  };

 const addBlogPost=(dispatch)=>{
     return async (title,content,cb)=> 
     {
       await jsonServer.post('/blogposts',{title,content})
        // dispatch({type:'add_blogpost',payload:{title,content}})
         cb()
     }
}

const deleteBlogPost=(dispatch)=>{
    return async(id)=>{
      await jsonServer.delete(`/blogposts/${id}`)
      dispatch({type:'delete_blogpost',payload:id})
    }
}

export const{Context,Provider}=createDataContext(reducer,{addBlogPost,deleteBlogPost,editBlogPost,getBlogPosts},[])