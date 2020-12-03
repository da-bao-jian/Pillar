import React from 'react';
import ChatBox from './chat_box_container';
import "./dashboard.css"
class DashBoard extends React.Component{
   
   constructor(props){
      super(props)
   }
   render(){
      return(

         <div className="dash-container" style={{ backgroundImage: "linear-gradient(to right, #BA5898 , rgb(65, 152, 176))"}}> 
            <ChatBox/>    
            <ChatBox /> 
            <ChatBox /> 
            <ChatBox /> 
         </div>


      )
   }
}


export default DashBoard;