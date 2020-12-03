import React from "react"
import io from "socket.io-client";
import moment from "moment";
import './chat_box.css';


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
    this.props.getMessages();
    this.socket = io(server);
    this.socket.on("Broadcast Message", theMessage =>{
      console.log(theMessage);
      // debugger;
      this.props.afterMessageSent(theMessage);
      // this.setState({
      //   messages: 
      // })
    })
    // debugger;
  }

  // componentDidUpdate(prevProps){
  //   debugger;
    
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
    // debugger;
    console.log(username);
    let timestamp = moment().format('LT');
    let message = this.state.chatMessage;

    this.socket.emit("Create Message", {
      message,
      timestamp,
      username,
      //add room id here
    })

    this.setState({
      chatMessage: "",
    })

  }

  render(){
    let messages = this.props.messages.data || [];
    debugger;
    
    return(
        <div className="chatbox-container">
          <h2 className="room-name">Room Name</h2>
        
        <ul>
          {messages.map(msg => (
            <div>
                <p className="message" key={msg._id}>
                {msg.sender.username}:  {msg.message}
                </p>
                 
            </div>
          ))}

        </ul>
        <form onSubmit={this.submitMessage}>

          <input className="send" type="text" value={this.state.chatMessage} onChange={this.handleChange} />
          <button>Send</button>
        </form>
        </div>
    )
  }

}


export default ChatBox;