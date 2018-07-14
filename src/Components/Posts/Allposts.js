import React, {Component} from 'react';
import Post from './Post';
import Navbar from "../Headers/Navbar";
import Auth from '../../Crud/auth'
import Columns from 'react-columns';
import Toast from '../Toasts/Toast'
export default class AllPost extends Component {
constructor(props) {
super(props);
    let authToken =Auth.AuthObj.GUEST_TOKEN;
if(sessionStorage.getItem('authToken')) {
    authToken = sessionStorage.getItem('authToken');
}else (sessionStorage.setItem('authToken',authToken));


    this.state = {
        posts :[],
        authToken:authToken,
    };
const urlPosts = Auth.AuthObj.BASE_URL + 'appdata/' + Auth.AuthObj.APP_KEY + '/posts';


const headers =    {'Authorization': 'Kinvey ' + authToken};
    fetch( urlPosts,
        {   method:'GET',
            headers: headers,
        })
        .then(data=>data.json()).then(res=>{
      //  console.log(res);
        this.setState({posts:res})
    }).catch(err=>console.log(err));
}
    render() {
       let  queries = [{
           columns: 1,
           query: 'min-width: 500px',
           gap :'100px'
       },
           {
            columns: 2,
            query: 'min-width: 500px',
           gap :'100px'
        }, {
            columns: 3,
            query: 'min-width: 1000px',
           gap :'100px'
        }];
        let Posts = this.state.posts;
        if(Posts===undefined)Posts=[];
        return (
                <div className="container">
                <Navbar/>
                    <Toast/>
                <Columns queries={queries}>
                {
                    Posts.map((post,index)=> {
                    return (
                    <Post isFavView = {false} authToken={this.state.authToken} id={post._id} key ={index} title={post.title} imgUrl={post.imgUrl}
                    context={post.context}/>
                    )
                })
                }
                </Columns>
            </div>
            );
    }
}