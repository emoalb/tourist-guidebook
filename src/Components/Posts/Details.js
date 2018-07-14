import React, {Component} from 'react';
import Navbar from '../Headers/Navbar';
import Auth from "../../Crud/auth";
import {Link} from 'react-router-dom'
export default class Details extends Component
{
    constructor(props){
        let authToken = sessionStorage.getItem("authToken");
        super(props);
        let _id = document.URL.split('/')[4];
this.state = {
_id:_id,
    post:{},
    authToken:authToken

};
        this.Delete=this.Delete.bind(this);
        const urlPosts = Auth.AuthObj.BASE_URL + 'appdata/' + Auth.AuthObj.APP_KEY + '/posts/'+this.state._id;


        const headers =    {'Authorization': 'Kinvey ' + authToken};
        fetch( urlPosts,
            {   method:'GET',
                headers: headers,
            })
            .then(data=>data.json()).then(res=>{
         //  console.log(res);
            this.setState({post:res})
        }).catch(err=>console.log(err));

    }
    Delete(){
        const urlPosts = Auth.AuthObj.BASE_URL + 'appdata/' + Auth.AuthObj.APP_KEY + '/posts/'+this.state._id;
        const headers =    {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')};
        Auth.deleteReq(urlPosts,headers,null,this.props);

    }

render() {
    let buttonDelete ='';
    let buttonEdit ='';
    if (sessionStorage.getItem('username')===this.state.post.username || sessionStorage.getItem('username')==='admin') {
        buttonEdit =
            <Link to={'/edit/'+this.state.post._id}> <button type="button" className="btn btn-outline-danger">Edit</button></Link>
        buttonDelete = <button type="button" onClick={this.Delete}  className="btn btn-outline-danger">Delete</button>
    }
    return (
        <div className="container">
            <Navbar/>
            <img className="card-img-top" alt='' src={this.state.post.imgUrl}/>
            <div className="card-body">
                <h2 className="card-title">{this.state.post.title}</h2>
                <h5 className="card-text" >Description:</h5>
                <p className="card-text" >{this.state.post.context}</p>
                <h5 className="card-text" >Created by:</h5>
                <p className="card-text" >{this.state.post.username}</p>

            {buttonEdit}
            {buttonDelete}
        </div>
        </div>
    );
}
}