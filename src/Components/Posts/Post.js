import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Auth from "../../Crud/auth";
export default class LocationPost extends Component {
constructor(props){
    super(props);

    this.state = {
        imgUrl:this.props.imgUrl,
        id:this.props.id,
        title:this.props.title,
        context:this.props.context,
        guestToken:Auth.AuthObj.GUEST_TOKEN,
        authToken:this.props.authToken,
        isFavView:this.props.isFavView,
        favid:this.props.favid,

    };
    this.addFavorites=this.addFavorites.bind(this);
    this.Delete=this.Delete.bind(this);


}
Delete(){
    const urlPosts = Auth.AuthObj.BASE_URL + 'appdata/' + Auth.AuthObj.APP_KEY + '/favs/'+this.state.favid;
    const headers =    {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')};
    Auth.deleteReq(urlPosts,headers, ()=> this.props.history.push('/'),null);


}
addFavorites (){
    let  headers = {'Content-Type': 'application/json','Authorization' : 'Kinvey ' + sessionStorage.getItem('authToken')};
    let url = Auth.AuthObj.BASE_URL + 'appdata/' + Auth.AuthObj.APP_KEY + '/favs';
            let fav ={
            user:sessionStorage.getItem('username'),
            postid:this.state.id
        };
        Auth.postReq(url,headers,fav,null,this.props);



}
render (){
        const style = {
            width: "18rem",
            margin: "20px"
        };
        let buttonAddFav ='';
        if (this.state.authToken !== this.state.guestToken) {
           if(!this.state.isFavView) {
               buttonAddFav =
                   <p>
                       <button className="btn btn-outline-success" onClick={this.addFavorites}>Add to favorites</button>
                   </p>
           }else {
               buttonAddFav =
               <p>
                   <button onClick={this.Delete}  className="btn btn-outline-danger">Remove from favorites</button>
               </p>
           }

        }
        return (
            <div className="card" style={style} id = {this.state.id}>
    <img className="card-img-top" src={this.state.imgUrl} alt =""/>
            <div className="card-body">
            <h5 className="card-title">{this.state.title}</h5>
                <p className="card-title">{this.state.context}</p>
                <Link to = {"/details/"+this.state.id}>
                <p className="btn btn-primary" >Details</p>
                </Link>
                {buttonAddFav}
    </div>
    </div>
        );

    }


}
