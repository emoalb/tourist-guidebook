import React, {Component} from 'react';
import Navbar from "../Headers/Navbar";
import Auth from "../../Crud/auth";
import Toast from "../Toasts/Toast";

import Columns from 'react-columns';
import Post from "./Post";
export default class Favorites extends Component{

    constructor(props){
        super(props);
        this.state = {
            posts :[],
            authToken:sessionStorage.getItem('authToken'),
            username:sessionStorage.getItem('username')
        };

    }

    componentDidMount() {
        const urlPosts = Auth.AuthObj.BASE_URL + 'appdata/' + Auth.AuthObj.APP_KEY + '/favs';
        const headers =    {'Authorization': 'Kinvey ' + this.state.authToken};

        fetch( urlPosts,
            {   method:'GET',
                headers: headers,
            }).then(data=>data.json()).then(res=> {

            let posts = [];

            for (let post of res) {
                if (post.user === this.state.username) {
                    const urlPost = Auth.AuthObj.BASE_URL + 'appdata/' + Auth.AuthObj.APP_KEY + '/posts/' + post.postid;
                    fetch(urlPost,
                        {
                            method: 'GET',
                            headers: headers,
                        })
                        .then(data => data.json()).then(postres => {
                            // console.log(postres);
                            //  console.log(posts);
                            //  console.log(posts.indexOf(postres));
                            if (posts.map(x => x._id).indexOf(postres._id) < 0) {
                                if( !postres.error) {
                                    postres.favid=post._id;
                                    posts.push(postres);
                                    this.setState({posts: posts});
                                }
                            } else  {
                                const urlPosts = Auth.AuthObj.BASE_URL + 'appdata/' + Auth.AuthObj.APP_KEY + '/favs/'+post._id;
                                const headers =    {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')};
                                Auth.deleteReq(urlPosts,headers,null,null);
                            }

                        }
                    )
                }

            }


        }).catch(err=>console.log(err));
    }

    refresh(){
        this.setState ={
        posts:[]
        }
    }
    render (){
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
      return (
          <div className="container">
              <Navbar/>
              <Toast/>
              <Columns queries={queries}>
                  {this.state.posts.map((post,index)=> {
                      return (
                          <Post history = {this.props.history}  favid={post.favid} isFavView = {true} authToken={this.state.authToken} id={post._id} key ={index} title={post.title} imgUrl={post.imgUrl}
                                context={post.context}/>
                      )
                  })

                  }
              </Columns>
          </div>
      )
    }
}