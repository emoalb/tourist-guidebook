import React, {Component} from "react";
import Auth from "../../Crud/auth";
import Navbar from "../Headers/Navbar"
export default class Edit extends Component   {
    constructor(props){

        super(props);
        let _id = document.URL.split('/')[4];
        this.state = {
            _id:_id,
            post:{},
            form:{},

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {

        const urlPosts = Auth.AuthObj.BASE_URL + 'appdata/' + Auth.AuthObj.APP_KEY + '/posts/'+this.state._id;
        let authToken = Auth.AuthObj.GUEST_TOKEN;
        if(sessionStorage.getItem('authToken')) {
            authToken = sessionStorage.getItem('authToken');
        }
        const headers =    {'Authorization': 'Kinvey ' + authToken};
        fetch( urlPosts,
            {   method:'GET',
                headers: headers,
            })
            .then(data=>data.json()).then(res=>{
            // console.log(res);
            this.setState({post:res})
        }).catch(err=>console.log(err));
    }

    handleChange(e){
        const name = e.target.dataset.name;
        const value  = e.target.value;
        const validForm = {};
        validForm[name] = value;
        this.setState({
            form:Object.assign(this.state.form,validForm)
        });
    }

    handleSubmit(){
        let imgUrl = this.state.form.imageurl;
        let title = this.state.form.title;
        let context = this.state.form.context;
        let creator = this.state.post.username;
        let  headers = {'Content-Type': 'application/json','Authorization' : 'Kinvey ' + sessionStorage.getItem('authToken')};
        let url = Auth.AuthObj.BASE_URL + 'appdata/' + Auth.AuthObj.APP_KEY + '/posts/'+this.state.post._id;
        Auth.putReq(url,headers,{'imgUrl':imgUrl,'title':title,'context':context,'username':creator},null,this.props);
    }

    render () {
        return (
            <div className="container">
                <Navbar/>
                <form>
                    <h2>Edit location:</h2>
                    <div className="form-group">
                        <label htmlFor="imageurl">Image url:</label>
                        <input data-name="imageurl" type="imageurl" onChange={this.handleChange} className="form-control" id="inputurlimg" aria-describedby="imgurlHelp"
                               placeholder={this.state.post.imgUrl}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title of post:</label>
                        <input data-name="title" type="title" onChange={this.handleChange} className="form-control" id="inputtitle" aria-describedby="titleHelp"
                               placeholder={this.state.post.title}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="context">Description:</label>
                        <input data-name="context" type="description" onChange={this.handleChange} className="form-control" id="inputdescription" aria-describedby="descriptionHelp"
                               placeholder={this.state.post.context}/>
                    </div>

                    <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Edit</button>
                </form>
            </div>
        );
    }
};