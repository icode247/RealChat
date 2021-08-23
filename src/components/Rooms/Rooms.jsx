import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import styles from "./rooms.module.css";
import Chats from "./Chats";

var firebaseConfig = {
  //Your firebase configuration objects
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: this.props.activeUser,
      value: "",
      isRecording: false,
      chats: [],
      Error: null,
      recordState: null,
      audio: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (db) {
      db.collection("chats")
        .orderBy("createdAt")
        .onSnapshot((querySnapShot) => {
          const chats = querySnapShot.docs.map((docs) => ({
            ...docs.data(),
            id: docs.id
          }));
          this.setState({ chats });
        });
    }
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  async sumitData(msg, cate) {
    await db.collection("chats").add({
      message: msg,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      user: this.state.activeUser,
      cate: cate
    });
  }
  async handleSubmit(e) {
    e.preventDefault();
    const { value } = this.state;
    try {
      await this.sumitData(value, "text");
      this.setState({ value: "" });
    } catch (error) {
      console.log(error);
      this.setState({ Error: error.message });
    }
  }

  start = () => {
    this.setState({
      recordState: RecordState.START,
      isRecording: !this.state.isRecording
    });
  };

  stop = () => {
    this.setState({
      recordState: RecordState.STOP,
      isRecording: !this.state.isRecording
    });
  };

  //audioData contains blob and blobUrl
  onStop = async (audioData) => {
    console.log(audioData);
    try {
      await this.sumitData(audioData, "voice");
    } catch (error) {
      console.log(error);
      this.setState({ Error: error.message });
    }
  };
  render() {
    const { recordState } = this.state;
    return (
      <Container maxWidth="lg">
        <AppBar position="absolute">
          <Toolbar className={styles.navRow}>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Real Chat
            </Typography>

            {/* Loggout Component */}
            <Button
              variant="contained"
              color="secondary"
              onClick={this.props.handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <main className={styles.main}>
          {this.state.chats.map((el) => (
            <Chats
              styles={styles}
              chat={el}
              key={el.id}
              activeUser={this.props.activeUser}
            />
          ))}
        </main>
        <form
          className={`${styles.form}`}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <div className={styles.formCol}>
            <TextField
              id="outlined-textarea"
              placeholder="Say somthing.."
              multiline
              variant="outlined"
              className={styles.text}
              onChange={this.handleChange}
              name="value"
            />
            {this.state.isRecording ? (
              <MicOffIcon className={styles.mic} onClick={this.stop} />
            ) : (
              <MicIcon className={styles.mic} onClick={this.start} />
            )}
            <Button
              variant="contained"
              color="primary"
              className={styles.textBtn}
              type="submit"
            >
              Send
            </Button>
          </div>
        </form>
        <div>
          <AudioReactRecorder
            state={recordState}
            onStop={this.onStop}
            canvasWidth="0"
            canvasHeight="0"
          />
          );
        </div>
      </Container>
    );
  }
}
module.exports = Rooms;
