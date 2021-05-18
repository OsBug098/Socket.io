const socket = io.connect("http://localhost:9876");

const msgs = document.getElementById("msgs");
const user = document.getElementById("name");
const input = document.getElementById("input");
const button = document.getElementById("send");
const status = document.getElementById("status");

button.addEventListener("click", sendMessage, false);
input.addEventListener("keypress", typing);

socket.on("chat", (data) => {
    status.innerHTML = "";
    msgs.innerHTML += "<br>" + data.name + ": " + data.message;
});

socket.on("typing", (data) => {
    status.innerHTML = data.name + " is typing...";
});

function sendMessage() {
    socket.emit("chat", {
        name: user.value,
        message: input.value,
    });
    input.value = "";
}

function typing() {
    socket.emit("typing", {
        name: user.value,
        status: "typing",
    });
}