import React from 'react'
import io from 'socket.io-client';
import {useState,useRef,useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

//
const socket= io('https://thuongchat.tk', { transports: ['websocket', 'polling', 'flashsocket'] })

function Home(){
   
   
    var checkref = useRef('')
    var messref = useRef('')
    const [username,setusername] = useState('')
    const [pass,setpass] = useState('')
    const [ok,setok] = useState('')
    const [user,setuser] = useState('')
    const [mess,setmess] = useState('')
    const [allmess,setallmess] = useState('')
   
    const [style,setstyle] = useState('')
    const [room,setroom] = useState('')
   
    const [hoverok,sethoverok] = useState('')
    const [defaultz,setdefaultz] = useState('online-default')
   
    useEffect(() => {
        
        socket.on('getuser',data=>{setuser(data)})
        
        socket.on('join_room',data=>{
          setroom(data)
         
   
           
        })
       
        socket.on('allmess',data=>{
           
           
          
           setallmess(data)
          
        })
   
       
        
       
    }, [])

    function showpass(){
        if(checkref.type==='password'){
            checkref.type ='text'
        }else{
            checkref.type = 'password'
        }
    }
    function submit(e){
       
        e.preventDefault();
      
         
                const add ={
                    username,
                    pass
                }
                socket.emit("user",add);
                setok('ok')
            
            
         
               
       
       
    }

    function global(e){
      setroom('')
      setstyle(e.target)
      e.target.style.backgroundColor = '#42bcf5'
      e.target.style.borderColor = '#42bcf5'
      e.target.style.color = '#fff'
    }
    function hover(e){
        e.target.style.backgroundColor = '#42bcf5'
      e.target.style.borderColor = '#42bcf5'
      e.target.style.color = '#fff'
      sethoverok(e.target)
    }
    function hoverchinh(e){
       if(hoverok!==''){
        if(style!==hoverok){
            hoverok.style.backgroundColor = '#fff'
        hoverok.style.borderColor = 'red'
        hoverok.style.color = 'black'
        }
        sethoverok('')
       }
    }
    function mouse(e){
        
     
        var x = document.querySelectorAll('.online-ii')
      
        if(style!==''){
            if(e.target!==style){
               
                
                for(let i=0;i<x.length;i++){
                    if(e.target === x[i]&& style!==x[i]){
                        style.style.backgroundColor = '#fff'
                        style.style.borderColor = 'red'
                        style.style.color = 'black'
                       setdefaultz('')
                    }
                }
               
            }
        }else{
            for(let i=0;i<x.length;i++){
                if(e.target === x[i]){
                
                   setdefaultz('')
                }
            }
        }
    }
    function showuseronline(e){
       
       
      
        if(e.length>0){
            const find = e.filter(function(value){
                return value.name === username
            })
            var z
            if(find.length>0){
               z = find[0].name
            }
           
           
                     
            return(
               <div className='online-i'>
                    <h4>Online:</h4>
                <div className="online">
                   
                    <div className={'online-ii '+defaultz} onClick={(e)=>{global(e)}}>Global</div>
                    {e.map((value,index)=>{
                       
                       if(value.name!==username){
                        return(
                            <div className='online-ii' onMouseOver={(e)=>hover(e)} onClick={(e)=>showmess(value.name, z,e)} key={index}>{value.name}</div>
                        )
                       }else{
                           return(
                            <span  key={index}></span>
                           )
                       }
                    })}
                </div>
               </div>
            )
        }
    }
    function showmess(e,v,k){
        k.target.style.backgroundColor='#42bcf5'
        k.target.style.color='#fff'
        k.target.style.borderColor='#42bcf5'
        setstyle(k.target)
        const add = [
            e,
            v
        ]
       socket.emit('room',add)
       
      
    }
    if(room!==''){
        var z = []
        if(allmess.length>0){
            const findmess = allmess.filter(function(value){
                return ((value.room_id[0] === room[0]||value.room_id[0]===room[1])&&(value.room_id[1] === room[0]||value.room_id[1]===room[1]))
            })
            z = findmess
        }
        
            return(
                <div onMouseOver={(e)=>hoverchinh(e)} onClick={(e)=>mouse(e)}>
                <section className="chat">
                {showuseronline(user)}
           {showallmess(z)}
          
            <form onSubmit={(e)=>submitchat(e,room)}>
              <input ref={ref=>messref=ref} onChange={(e)=>setmess(e.target.value)} type="text" placeholder="type ....." />
              <input  onClick={(e)=>submitchat(e,room)} className="submit-chat" type="submit" value="Send" />
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
    function submitchat(e,v){
        e.preventDefault();
        messref.value =''
        if(mess===''){
            alert('nhap mess ')
        }else{
        
         
            const add ={
                username,
                mess,
                room_id:v,
               
            }
            socket.emit("mess",add);
           
            setmess('')
        }
    }
    
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
                       if(value.name === username){
                        return(
                            <p className='right' key ={index}>{value.mess} <b>: {value.name}</b></p>
                        )
                       }else{
                        return(
                            <p key ={index}><b>{value.name} :</b> {value.mess}</p>
                        )
                       }
                    })}
                </ScrollToBottom>
               ) 
        }
    }
   

if(ok!==''){
 
   if(user.length>0){
       const find = user.filter(function(value){
           return value.name === username
       })
      var k = []
      if(allmess.length>0){

        const findmess = allmess.filter(function(value){
            return value.room_id[0] === 'global'
        })
        k = findmess
    }
   
        if(find.length<2){
            return(
             <div onMouseOver={(e)=>hoverchinh(e)} onClick={(e)=>{mouse(e)}}>
             <section className="chat">
         {showuseronline(user)}
        {showallmess(k)}
         <form onSubmit={(e)=>submitchat(e,'global')}>
           <input ref={ref=>messref=ref} onChange={(e)=>setmess(e.target.value)} type="text" placeholder="type ....." />
           <input  onClick={(e)=>submitchat(e,'global')} className="submit-chat" type="submit" value="Send" />
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
        else{
         
     
 
         return(
        
             <section className="p404">
             <h1>da co nguoi dang nhap</h1>
             <p>vui long dang nhap lai</p>
             <button onClick={(e)=>window.location.reload()}>Login</button>
           </section>
         )
         
        }
      
       
      
   }
    return(
       
        <section className="p404">
        <h1>Wait...</h1>
        <p>Please Wait a moment</p>
      </section>
    )
}
    return(
        <section className="login">
        <div className="login-i">
          <label htmlFor="username">Username: </label>
          <input onChange={(e)=>setusername(e.target.value)} type="text" id="username" placeholder="nhap username" />
        </div>
        <div className="login-i">
          <label htmlFor="pass">Password: </label>
          <input onChange={(e)=>setpass(e.target.value)} ref={ref=>checkref=ref} id="pass" type="password" placeholder="nhap password" />
        </div>
        <div className="login-check">
          <input onClick={(e)=>{showpass(e)}} id="checkbox" type="checkbox" />
          <label htmlFor="checkbox">show password</label>
        </div>
       
        <input onClick={(e)=>{submit(e)}} className="submit" type="submit" defaultValue="Login" />
        <div className='copyright'>
            <p>&copy; <a href='https://www.facebook.com/ton.that.thuong.98'>Thuong</a></p>
        </div>
      </section>
    )
}

export default Home