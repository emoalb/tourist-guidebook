import React, {Component} from "react";
import {Link} from "react-router-dom";
import Auth from "../../Crud/auth";
export default class Navbar extends Component {
    constructor(props){
    super(props);
    this.state = {
        loggedIn: false
    }
}
    componentWillMount(){
        if(sessionStorage.getItem('authToken') !== Auth.AuthObj.GUEST_TOKEN && sessionStorage.getItem('userId') != null){
            this.setState({loggedIn: true});
        }
        else{
            this.setState({loggedIn: false});
        }
    }
    render() {
    if (this.state.loggedIn===true){
    return(

        <ul className="nav justify-content-center">
            <Link to={'/'}>
            <li className="nav-item">
                <p className="nav-link active"  >Home</p>
            </li>
                </Link>
            <Link to={'/create/new'}>
            <li className="nav-item">
                <p className="nav-link active">Create new post</p>
            </li>
            </Link>
            <Link to={'/view/favorites'}>
                <li className="nav-item">
                    <p className="nav-link active" >Favorites</p>
                </li>
            </Link>
            <Link to={'/auth/logout'}>
            <li className="nav-item">
                <p className="nav-link active" >Logout</p>
            </li>
            </Link>
            <li className="nav-item">
                <a className="nav-link"> Hello {sessionStorage.getItem('username')}</a>
            </li>
        </ul>
    );
    }else {
    return(
        <ul className="nav justify-content-center">

                <li className="nav-item">
                    <Link to={'/'}>
                    <p className="nav-link active"  >Home</p>
                    </Link>
                </li>


            <li className="nav-item">
                <Link to={'/auth/login'}>
                <p className="nav-link active">Login</p>
                </Link>
            </li>


            <li className="nav-item">
                <Link to={'/auth/signup'}>
                <p className="nav-link">Register</p>
                </Link>
            </li>


    </ul>);
    }
    }

}