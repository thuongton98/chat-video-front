import React from 'react'
import Peer from 'peerjs'
import io from 'socket.io-client';
import {useRef,useEffect} from 'react'


const socket= io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] })
const myPeer = new Peer({host:'thuongchat.tk', secure:true, port:443, path: '/peerjs/myapp'})

function Video(){

    //change room id
    let  ROOM_ID='123123'
    var videoz = useRef('')
    var videozz=useRef('')
   
  
useEffect(()=>{
    socket.on('accept',data=>{
        videoz.className='video default'
        videozz.className='video user'
       
    })
   
    socket.on('onroom', data => {
       if(data.length>1){
        videoz.className='video default'
        videozz.className='video user'
       }
    })
 
},[])
   


navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
   
    addVideoStream(videoz, stream)

    myPeer.on('call', call => {
        call.answer(stream)
       
        call.on('stream', userVideoStream => {
            addVideoStream(videozz, userVideoStream)
        })
    })

   
        socket.on('user-connected', userId => {
           
         
           socket.emit('accept',ROOM_ID)
        
            connectToNewUser(userId, stream)
           
        })
        socket.on('user-disconnected', data=>{
            videoz.className='video user'
            videozz.className='none'
              
        })
    

})

myPeer.on('open', id => {
const data = {
    //change room id
  ROOM_ID,
  id,
  // change name
  name:'thuong'
}
    if(socket!==''){
        socket.emit('join-room',data)
    }
})

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
  
    call.on('stream', userVideoStream => {
        
        addVideoStream(videozz, userVideoStream)
    })
   
}
function addVideoStream(video, stream) {
    
   if(video!==null){
    if ('srcObject' in video) {
        video.srcObject = stream
        video.play();
      } else {
        video.src = window.URL.createObjectURL(stream) // for older browsers
        video.play();
      }
   }
   
   
}

    return(
        <section className="p404">
        <h1>test video</h1>
       
        <video className='video user' autoPlay playsInline ref={ref=>videoz=ref} ></video>
        <video className='video none' autoPlay playsInline ref={ref=>videozz=ref}></video>
       
      </section>
    )
}

export default Video