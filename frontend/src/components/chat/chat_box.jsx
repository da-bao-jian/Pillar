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
    this.props.getMessages();
    this.socket = io(server);
    this.socket.on("Broadcast Message", theMessage =>{
      console.log(theMessage);
      this.props.afterMessageSent(theMessage);
      // this.setState({
      //   messages: 
      // })
    })
  }

  // componentDidUpdate(prevProps){
    
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
    
    return(
        <div className="chatbox-container">
          <h1>Chat Window</h1>
          <form onSubmit={this.submitMessage}>

            <input type="text" value={this.state.chatMessage} onChange={this.handleChange}/>
        </form>
        <ul>
          {messages.map(msg => (
            <li key={msg._id}>{msg.message}</li>
          ))}
   
        </ul>
        </div>
    )
  }

}


export default ChatBox;