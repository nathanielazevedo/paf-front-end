/** @format */

import "./Chat.css";
import Paf from "../../api.js";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

//All api request regarding chatting are intiated here. (Paf.sendStatement)

function Chat() {
  const [formData, setFormData] = useState({ statement: "" });
  const { id } = useParams();
  const [text, setText] = useState([{ statement: "lets chat" }]);

  //handles form inputs, inputs state. Controlled component
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  //sends text to server, server responses with resposne.
  const addText = async (evt) => {
    evt.preventDefault();
    setText((data) => [...data, formData]);
    formData.friend_id = id;
    let res = await Paf.sendStatement(formData);
    setText((data) => [...data, { statement: res }]);
    setFormData({ statement: "" });
    return { success: true };
  };

  return (
    <div className="chat-container">
      <div className="chat-room-container">
        <ul className="chat-spot">
          {text.map((t, i) => {
            return (
              <li className="chat-text" key={i}>
                {t.statement}
              </li>
            );
          })}
        </ul>

        <form className="chat-form" autoComplete="off" onSubmit={addText}>
          <input
            type="text"
            name="statement"
            className="chat-input"
            value={formData.statement}
            onChange={handleChange}
            autoComplete="off"
          ></input>
          <button className="chat-button" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
