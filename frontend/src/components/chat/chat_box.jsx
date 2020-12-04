import React from "react"
import io from "socket.io-client";
import moment from "moment";

class ChatBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }


  componentDidMount(){
    
    /// this may be an issue when we push to Heroku! How to dynamically set the server?
    let server = "http://localhost:5000";
    let roomId = this.props.socketId.substring(1);
    this.props.getMessages(roomId)
      .then(messages => {
         
        this.setState({ messages: messages.messages.data })
      })

    this.socket = io(this.props.socketId);
    this.socket.on("Broadcast Message", theMessage =>{
      //  
      console.log(theMessage[0].message);

      //how do I make sure a message only goes to one room?
      let msg = theMessage[0];
      
      msg.room = roomId;
      //  
      this.props.afterMessageSent(msg);
     })
    //  
  }

  // componentDidUpdate(prevProps){
  //   ;
    
  // }

  handleChange(e){
    this.setState({
      chatMessage: e.currentTarget.value,
    })
  }

  submitMessage(e){
    e.preventDefault();
    //add room id to props
    let username = this.props.user.username;
    let userId = this.props.user.id;
    let room = this.props.socketId.substring(1);
    //  
    console.log(username);
    let timestamp = moment().format('LT');
    let message = this.state.chatMessage;
    // 
    this.socket.emit("Create Message", {
      message,
      timestamp,
      username,
      room: this.props.room,
      user: this.props.user.id
      //add room id here
    })

    this.setState({
      chatMessage: "",
    })

  }

  render() {
    // let messages = this.props.messages.data || [];
    let messages = this.state.messages || [];

     
    return (
      <div className="chatbox-container">
        <h1>Chat Window</h1>
        <form className="chatbox-input-form" onSubmit={this.submitMessage}>
      
          <input type="text" value={this.state.chatMessage} onChange={this.handleChange} />
          <button>Send</button>
        </form>
        <ul>
          {messages.map(msg => (
            <li className="message" key={msg._id}>{msg.sender.username} says: {msg.message}</li>
          ))}

        </ul>
      </div>
    )
  }
}


export default ChatBox;