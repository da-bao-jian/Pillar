import React from 'react';
import ChatBox from './chat_box_container';
 
class DashBoard extends React.Component{
   constructor(props){
      super(props)
   }
   render(){
      return(

         <div className="dash-container"> 
            <ChatBox/>    
            <ChatBox /> 
            <ChatBox /> 
            <ChatBox /> 
         </div>


      )
   }
}


export default DashBoard;