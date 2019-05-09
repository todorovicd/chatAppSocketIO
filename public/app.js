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

const messages = []; //{ author, date, content, type }

var socket = io();

socket.on("message", message => {
  console.log(message);

  if (message.type !== messageTypes.LOGIN) {
    if (message.author === username) {
      message.type = messageTypes.RIGHT;
    } else {
      message.type = messageTypes.LEFT;
    }
  }

  messages.push(message);
  displayMessages();
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

// take in message object, and return corresponding message HTML
const createMessageHTML = message => {
  if (message.type === messageTypes.LOGIN) {
    return `<p class="secondary-text text-center mb-2">${
      message.author
    } has joined the chat...</p>`;
  }
  return `<div class="message ${
    message.type === messageTypes.LEFT ? "message-left" : "message-right"
  }">
            <div id="message-details" class="flex">
                <p class="message-author">${
                  message.type === messageTypes.RIGHT ? "" : message.author
                }</p>
                <p class="message-date">${message.date}</p>
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

// sendBtn callback
sendBtn.addEventListener("click", e => {
  e.preventDefault();

  if (!messageInput.value) {
    return alert("must type up a message");
  }

  const date = new Date(),
    day = date.getDate(),
    year = date.getFullYear(),
    month = ("0" + (date.getMonth() + 1)).slice(-2),
    dateString = `${month}/${day}/${year}`;

  const message = {
    author: username,
    date: dateString,
    content: messageInput.value
  };

  sendMessages(message);

  messageInput.value = "";

  // Scroll to the bottom of the screen after every message
  // chatWindow.scrollTop = chatWindow.scrollHeight;
});

const sendMessages = message => {
  socket.emit("message", message);
};

// loginBtn callback
loginBtn.addEventListener("click", e => {
  // preventDefault of a form
  e.preventDefault();

  // set the usename and crete logged in message
  if (!usernameInput.value) {
    return alert("Must type in username!");
  }
  username = usernameInput.value;

  sendMessages({
    author: username,
    type: messageTypes.LOGIN
  });

  // hide login and show chat window
  loginWindow.classList.add("hidden");
  chatWindow.classList.remove("hidden");
});
