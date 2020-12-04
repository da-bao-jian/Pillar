import React from 'react';
import ChatBox from './chat_box_container';

class DashBoard extends React.Component{
   
   constructor(props){
      super(props)
   }
   render(){
      return(
         <div className="dash-container-wrapper" className="fullscreen">
            <div className="dash-container"> 
               <ChatBox room="5fc90aaf6da6f760b4b3b84a"/>    
               <ChatBox room={"5fc9193d0cb8b668f49456cd"}/> 
               {/* <ChatBox room={3}/>  */}
               {/* <ChatBox room={4}/>  */}
            </div>
         </div>

      )
   }
}


export default DashBoard;