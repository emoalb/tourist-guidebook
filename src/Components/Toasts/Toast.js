import React, { Component } from 'react';
import {ToastContainer, ToastStore} from 'react-toasts';


export default class Position extends Component {
    render(){
            return(
                <ToastContainer store={ToastStore}/>


                    );
        }

}