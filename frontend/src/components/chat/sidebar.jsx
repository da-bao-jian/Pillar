import React from "react"
import { Link } from "react-router-dom"
import axios from "axios";
class SideBar extends React.Component {
   constructor(props) {
      super(props)

      this.state = {
         title: "",
         admin: this.props.user.id,
         users: this.props.user.id,
         rooms: [],
         show_rooms: false,
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.displayRooms = this.displayRooms.bind(this)
   }

   update(field) {
      return e => this.setState({ [field]: e.currentTarget.value })
   }
   
   componentDidMount(){
      //  
      this.props.fetchRooms()
         .then(rooms => {
            // debugger
            this.setState({ rooms: rooms.rooms.data})
         })
          
      let userId = this.props.user.id
      this.props.fetchUserRooms(userId)
         .then(rooms => {
            //  
            this.setState({ userRooms: rooms.rooms.data })
         }, errors =>{
            //  
         })
   }
   
   handleSubmit(e) {
      e.preventDefault();
      debugger
      let room = { title: this.state.title, admin: this.state.admin, users: this.props.user.id};
      //  

      this.props.createRoom(room)
   }
   displayRooms(){
      this.state.show_rooms === true ? 
      this.setState({show_rooms: false}) : this.setState({show_rooms: true});
   }



   render() {
      let rooms = this.state.rooms
      let rooms_current_user_belongs_to = rooms.filter(room=>(
         room.users.filter((user)=>(
            user.id === this.props.user.id
         )) 
      ));
      return (
         <div>
            <div>
               <form onSubmit={this.handleSubmit}>
                  <input placeholder="title" type="text" onChange={this.update("title")} />
                  <button>Create Room</button>
               </form>               
            </div>
            <div>
               <button onClick={()=>this.displayRooms()}>Display created chatrooms</button>
            </div>

            { this.state && this.state.show_rooms === true ? 
               rooms.map(room => (
                  <p>
                     {room.title}
                     {/* {<Link to=""/>} */}
                  </p>
               ))   
               : ""}
         </div>
      )
   }
}

export default SideBar