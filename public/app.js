const socket = io("https://app-chat-24cj.onrender.com");

// Add a flag to check if the server is connected
let isServerConnected = false;

// Handle connection error
socket.on("connect_error", (error) => {
  console.error("Error connecting to the server:", error);

  // Display an error message to the user
  const errorMessage = document.createElement("div");
  errorMessage.textContent =
    "Unable to connect to the server. Please try again later.";
  errorMessage.style.color = "red";
  document.body.appendChild(errorMessage);

  // Set the flag to indicate that the server is not connected
  isServerConnected = false;
});

// Handle successful connection
socket.on("connect", () => {
  console.log("Connected to the server");

  // Remove any previous error messages
  const errorMessage = document.querySelector("div");
  if (errorMessage) {
    document.body.removeChild(errorMessage);
  }

  // Set the flag to indicate that the server is connected
  isServerConnected = true;
});

// ... (rest of your existing code)

// Function to send a message
window.sendMessage = (e) => {
  e.preventDefault();

  // Check if the server is connected before sending the message
  if (isServerConnected && nameInput.value && msgInput.value && chatRoom.value) {
    socket.emit("message", {
      name: nameInput.value,
      text: msgInput.value,
    });
    msgInput.value = "";
    msgInput.focus();
  }
};

// Function to enter a room
window.enterRoom = (e) => {
  e.preventDefault();

  // Check if the server is connected before entering the room
  if (isServerConnected && nameInput.value && chatRoom.value) {
    socket.emit("enterRoom", {
      name: nameInput.value,
      room: chatRoom.value,
    });
  }
};

// ... (rest of your existing code)
