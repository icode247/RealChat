import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import styles from "./rooms.module.css";

class Chats extends Component {
  render() {
    const {
      chat: { cate, user, message }
    } = this.props;
    const activeUser = this.props.activeUser;
    return (
      <>
        {this.props.chat.cate === "text" ? (
          <div
            className={`${styles.message} ${
              user === activeUser ? styles.sent : styles.received
            }`}
          >
            <div className={styles.text}>
              <h4 style={{ textAlign: "left" }}>{user}</h4>
              <span>{message}</span>
            </div>
          </div>
        ) : (
          <div
            className={`${styles.message} ${
              user === activeUser ? styles.sent : styles.received
            }`}
          >
            <div className={styles.audio}>
              <h4 style={{ textAlign: "left" }}>Zion</h4>
              <ReactAudioPlayer controls />
            </div>
          </div>
        )}
      </>
    );
  }
}
module.exports = Chats;
