import React from "react";  

class SplashPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: 0
    };
    this.loginModal = this.loginModal.bind(this);
  }

//   componentDidMount() {
//     this.interval = setInterval(() => this.changeBackgroundImage(), 5000);
//   }

//   componentWillUnmount() {
//     if (this.interval) {
//       clearInterval(this.interval);
//     }
//   }

//   changeBackgroundImage() {
//     let newCurrentImg = 0;
//     const { currentImg } = this.state;
//     const noOfImages = images.length;

//     if (currentImg !== noOfImages - 1) {
//       newCurrentImg = currentImg + 1;
//     }

//     this.setState({ currentImg: newCurrentImg });
//   }

  loginModal(e) {
    e.preventDefault();
    this.props.openModal("login");
  }

  render() {

    return (
      <div className="splash-wrapper">
        <div className="splash-container-1">
          <div className="logo-button">
            <h1 onClick={this.loginModal}>PILLR</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default SplashPage;
