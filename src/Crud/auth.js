
import {ToastStore} from "react-toasts";


const AuthObj =  {
    GUEST_TOKEN:'b43d71af-4a5e-42d6-8cb7-edc11164db8f.3Jdgq4s7fve7yUS0pj4FxTU6ed7h6vC1aZyTQZPC4DQ=',
     BASE_URL : 'https://baas.kinvey.com/',
     APP_KEY :'kid_S1wP8tRfX',
     AUTH_HEADERS : {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + btoa('kid_S1wP8tRfX:7166d55c549a41f390b49f1066ca40da')
    }
};


const postReq =  (url, header, body,callback,props)=> {
    fetch(
        url,
        {
            method:'POST',
            headers: header,
            body:JSON.stringify(body)

        })
        .then(data=>data.json()).then(res=>{
      //  console.log(res);
        if(res.error){
        ToastStore.error(res.description.toString());
        }
       if(callback!==null)callback(res);
       showHome(props)
    }).catch(
       err=>{
           console.log(err);
       }
    )
 };


const putReq = (url, header, body,callback,props)=> {
    fetch(
        url,
        {
            method:'PUT',
            headers: header,
            body:JSON.stringify(body)

        })
        .then(data=>data.json()).then(res=>{
      //  console.log(res);
        if(res.error){
            ToastStore.error(res.description.toString());
        }
        if(callback!==null) {
            callback(res);
        }
        showHome(props)
    }).catch(
        err=>console.log(err));
};


const deleteReq = (url, header,callback,props)=> {
    fetch(
        url,
        {
            method:'DELETE',
            headers: header,
        })
        .then(data=>data.json()).then(res=>{
      //  console.log(res);
        if(res.error){
            ToastStore.error(res.description.toString());
        }
        if(callback!==null){
            callback(res)
        }
          if(props!==null)  {
            showHome(props)
        }
    }).catch(err=>console.log(err));
};

const signInUser = (res) =>{
     sessionStorage.setItem('username', res.username);
     sessionStorage.setItem('authToken', res._kmd.authtoken);
     sessionStorage.setItem('userId', res._id);
  // console.log(res._kmd.authtoken);
 };

const showHome = (props)=>{
    if(props.history)
    {
            props.history.push('/');


    }
    ToastStore.success("Success");
};

export default {AuthObj,postReq,signInUser,putReq,deleteReq};

