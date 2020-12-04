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
    //debugger;
    this.socket.on("Broadcast Message", theMessage =>{
      console.log(theMessage);
      // ;
      this.props.afterMessageSent(theMessage);
      // this.setState({
      //   messages: 
      // })
    })
    // ;
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
    // ;
    console.log(username);
    let timestamp = moment().format('LT');
    let message = this.state.chatMessage;
    //debugger;
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

  render(){
    let messages  = [];
    
    if (this.props.messages.data) messages =this.props.messages.data.filter(message => (message.room === this.props.room));
    ;
    return(
        <div className="chatbox-container">
            <h1 className="room-name">Room Name</h1>
          
            <ul>
              {messages.map(msg => (

                msg.username? (  
                
                <div>
                    <p className="message" key={msg._id}>
                    {msg.username}:  {msg.message}
                    </p>
                    
                </div>
                ): (
                    <div>
                      <p className="message" key={msg._id}>
                        {msg.sender.username}:{msg.message}
                      </p>

                    </div>
                )
              ))}

            </ul>
          <div className="chatbox-input-form" onSubmit={this.submitMessage}>
            <input className="send" type="text" value={this.state.chatMessage} onChange={this.handleChange} />
            <button>Send</button>
          </div>
        </div>
    )
  }

}


export default ChatBox;