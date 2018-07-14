import React, {Component} from "react";
import Auth from "../../Crud/auth";
import Navbar from "../Headers/Navbar"
export default class Create extends Component   {
    constructor(props) {
        super(props);
        this.state = {
            form:{}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        let creator = sessionStorage.getItem('username');
        let  headers = {'Content-Type': 'application/json','Authorization' : 'Kinvey ' + sessionStorage.getItem('authToken')};
        let url = Auth.AuthObj.BASE_URL + 'appdata/' + Auth.AuthObj.APP_KEY + '/posts';
        Auth.postReq(url,headers,{'imgUrl':imgUrl,'title':title,'context':context,'username':creator},null,this.props);
    }

    render()  {
        return (
            <div className="container">
                <Navbar/>
                <form>
                    <h2>Add new location:</h2>
                    <div className="form-group">
                        <label htmlFor="imageurl">Image url:</label>
                        <input data-name="imageurl" type="imageurl" onChange={this.handleChange} className="form-control" id="inputurlimg" aria-describedby="imgurlHelp"
                               placeholder="Enter image url"/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="title">Title of post:</label>
                    <input data-name="title" type="title" onChange={this.handleChange} className="form-control" id="inputtitle" aria-describedby="titleHelp"
                           placeholder="Enter title"/>
            </div>
                    <div className="form-group">
                        <label htmlFor="context">Description:</label>
                        <input data-name="context" type="description" onChange={this.handleChange} className="form-control" id="inputdescription" aria-describedby="descriptionHelp"
                               placeholder="Enter description"/>
                    </div>

                    <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
};