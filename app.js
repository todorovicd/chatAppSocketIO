const messageTypes = { LEFT: "left", RIGHT: "right", LOGIN: "login" };

// Chat Stuff

const chatWindow = document.getElementById("chat");
const messagesList = document.getElementById("messagesList");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Login Stuff

let username = "";
const usernameInput = document.getElementById("usernameInput");
const loginBtn = document.getElementById("loginBtn");
const loginWindow = document.getElementById("login");

const messages = [
  {
    author: "Dom Todorovic",
    date: "5/8/2019",
    content: "hey, how's it going?",
    type: messageTypes.RIGHT
  }
]; //{ author, date, content, type }

// take in message object, and return corresponding message HTML

const createMessageHTML = message => {
  if (message.type === messageTypes.LOGIN) {
    return `<p class="secondary-text text-center mb-2">${
      message.author
    } has joined the chat...</p>`;
  }
  return;
  `<div class="message ${
    message.type === messageTypes.LEFT ? "message-left" : "message-right"
  }">
            <div id="message-details" class="flex">
                <p class="message-author">${
                  message.author === messageTypes.RIGHT ? "" : message.author
                }</p>
                <p class="message-date">${massage.date}</p>
            </div> 
            <p class="message-content">${message.content}</p>
        </div>`;
};

const displayMessages = () => {
  console.log("displaying messages!");
  const messagesHTML = messages
    .map(message => createMessageHTML(message))
    .join("");

  messagesList.innerHTML = messagesHTML;
};

displayMessages();
