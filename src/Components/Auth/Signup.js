import React, {Component} from "react";
import Auth from '../../Crud/auth'
import Navbar from "../Headers/Navbar";
import Toast from '../Toasts/Toast'
import {ToastStore} from "react-toasts";
export default class SignupForm extends Component   {
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
        //console.log(e.target.dataset.name)
    }

    handleSubmit(){
        let username = this.state.form.name;
        let password = this.state.form.password;
        let url =  Auth.AuthObj.BASE_URL + 'user/' + Auth.AuthObj.APP_KEY + '/';
        if(!username){
            ToastStore.error("Empty user field");
        }else if(!password) {
            ToastStore.error("Empty password field");
        }else
         {
            Auth.postReq(url, Auth.AuthObj.AUTH_HEADERS, {
                "username": username,
                "password": password
            }, Auth.signInUser, this.props);
        }
        }


    render () {
        return (
           <div className="container">
               <Navbar/>
                <Toast />
            <form>
                <h2>Sign up:</h2>

                <div className="form-group">
                    <label htmlFor="input-email">User name</label>
                    <input data-name="name" type="username" onChange={this.handleChange} className="form-control" id="exampleInputUsername" aria-describedby="usernameHelp"
                           placeholder="Enter user name"/>
                </div>
                <div className="form-group">
                    <label  htmlFor="input-password">Password</label>
                    <input data-name="password" type="password" onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Submit</button>
            </form>
           </div>
        );
    }
};