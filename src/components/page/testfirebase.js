import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import db from '../../../config/firebase'
import ScrollToBottom from 'react-scroll-to-bottom';

import {useState,useRef,useEffect} from 'react'


function Firebase(){

    
   
   var inputref = useRef()
    const [firstname,setfirstname] = useState('')
    const [mess,setmess] = useState('')
    const [allmess,setallmess] = useState('')

    function addmess(e){
        setmess(e)
      
    }
    function submit(e){

        e.preventDefault();
        if(mess===''){
            alert('nhap mess')
        }else{
            inputref.value=''
        const timestamp = Date.now();
        db.database().ref("messages/" + timestamp).set({
            usr: firstname,
            msg: mess,
          });
          setmess('')
        }
       
        
    }
    //get data firebase
    useEffect(() => {
        const fetchChat = db.database().ref("messages/");
       
        fetchChat.on("value", function (snapshot) {
          

          var z =[]
         
         

          snapshot.forEach(data => {
            const dataVal = data.val()
            z.push({
              id: data.key,
              user: dataVal.usr,
              mess: dataVal.msg
            })
          
          });
          setallmess(z)
        })
    }, [])
  
function showallmess(e){
  if(e.length<1){
    return(
     <div className="chat-i">

     </div>
    )
 }else{
     return(
         <ScrollToBottom  className="chat-i">
             
            
             {e.map((value,index)=>{
                 return(
                     <div key={index}>{value.user}: {value.mess}</div>
                 )
             })}
           
         </ScrollToBottom>
        ) 
 }
  
     
   
}
    if(firstname!==''){
        return(
            <section className="chat">
            <h1>Test Firebase Chat</h1>
             {showallmess(allmess)}
            <form onSubmit={(e)=>submit(e)}>
            
             <input ref={ref=>inputref=ref} onChange={(e)=>addmess(e.target.value)} name='mess' placeholder='type ....' type='text' required/>
             <input className='input-chat' onClick={(e)=>submit(e)} type = 'submit'/>
            </form>
            
          </section>
        )
    }
    return(
        <section className="login">
        <h1>Test Firebase Chat</h1>
         <Formik
       initialValues={{ firstName: '' }}
       validationSchema={Yup.object({
         firstName: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('chua nhap first name'),
         
         
       })}
       onSubmit={(values, { setSubmitting }) => {
        setfirstname(values.firstName)
       }}
     >
       <Form>
       
       <div className='login-i'>
       <label htmlFor="firstName">Name</label>
         <Field name="firstName" type="text" />
         <ErrorMessage name="firstName" />
 
       </div>
       
 
         
 
         <button className='submit' type="submit">Submit</button>
       </Form>
     </Formik>
      </section>
    )
}

export default Firebase