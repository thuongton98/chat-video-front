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
    const [alert,setalert] = useState('')

    function addmess(e){
        setmess(e)
      
    }
    function submit(e){

        e.preventDefault();
        if(mess===''){
            setalert('vui long nhap messsenger !!!!')
            setTimeout(() => {
              setalert('')
            }, 3000);
            window.scrollTo({
              top:0,
              left:0,
              behavior:'smooth'
            })
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
         <ScrollToBottom className="chat-i">
             
            
             {e.map((value,index)=>{
                if(value.user === firstname){
                  return(
                      <p className='right' key ={index}>{value.mess} <b>: {value.user}</b></p>
                  )
                 }else{
                  return(
                      <p key ={index}><b>{value.user} :</b> {value.mess}</p>
                  )
                 }
             })}
           
         </ScrollToBottom>
        ) 
 }
  
     
   
}
    if(firstname!==''){
        return(
            <div>
              <section className="chat">
            <h1>Test Firebase Chat</h1>
            <div className='mess'>{alert}</div>
             {showallmess(allmess)}
            <form onSubmit={(e)=>submit(e)}>
            
             <input ref={ref=>inputref=ref} onChange={(e)=>addmess(e.target.value)} name='mess' placeholder='type ....' type='text' required/>
             <input className='submit-chat' onClick={(e)=>submit(e)} type = 'submit' value='Send'/>
            </form>
            
          </section>
           <footer>
           <div className='copyright'>
                 <p>&copy; <a href='https://www.facebook.com/ton.that.thuong.98'>Thuong</a></p>
             </div>
           </footer>
            </div>
        )
    }
    return(
        <div>
          <section className="login">
        <h1>Test Firebase Chat</h1>
         <Formik
       initialValues={{ firstName: '' }}
       validationSchema={Yup.object({
         firstName: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('chua nhap name'),
         
         
       })}
       onSubmit={(values, { setSubmitting }) => {
        setfirstname(values.firstName)
       }}
     >
       <Form>
       
       <div className='login-i'>
       <label htmlFor="firstName">Name</label>
         <Field name="firstName" type="text" />
         <div className='error'>
         <ErrorMessage name="firstName" />
         </div>
 
       </div>
       
 
         
 
         <button className='submit' type="submit">Submit</button>
       </Form>
     </Formik>
      </section>
      <footer>
      <div className='copyright'>
            <p>&copy; <a href='https://www.facebook.com/ton.that.thuong.98'>Thuong</a></p>
        </div>
      </footer>
        </div>
    )
}

export default Firebase