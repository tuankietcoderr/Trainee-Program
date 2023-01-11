// alert("Welcome back!");

let fullName;
let _id;
function init() {
  fullName = prompt("What's your name: ");
  _id = prompt("What's your ID: ");
  if (!fullName || !_id) {
    init();
  }
}

init();

$("fullName").textContent = fullName;
$("_id").textContent = _id;

function $(id) {
  return document.getElementById(id);
}

let traineeData;
function getDataRecusively() {
  async function getTrainees() {
    await fetch("https://www.tuankietcoder.tech/api/trainee_program")
      .then((res) => res.json())
      .then((res) => {
        traineeData = res.data;
        getDataRecusively();
      })
      .catch((error) => {
        console.log(error);
        init();
      });
  }
  if (!traineeData) {
    getTrainees();
    return;
  }
  //** Du lieu xu li tu day... **//
  console.log(traineeData);
  traineeData.forEach((item) => {
    const traineeStringify = JSON.stringify(item);
    $(
      "select-person"
    ).innerHTML += `<option value='${traineeStringify}'>${item.fullName}</option>`;
  });
}

getDataRecusively();

let sendToId;
// trainee selection changed
$("select-person").onchange = function (e) {
  // event object
  try {
    const trainee = JSON.parse(e.target.value);
    const traineeId = trainee.id;
    sendToId = traineeId;
  } catch (error) {
    sendToId = undefined;
    console.log(error);
  }
};

// send message to trainee with id: id
$("send-btn").onclick = function () {
  // Sender -> send_from
  // Message -> message
  // Receiver -> send_to
  const messageObject = {
    send_from: "",
    message: "",
    send_to: "",
  };
  if (!sendToId) {
    console.log("Error while fetching with current data object...");
    return;
  }
  messageObject.send_from = _id;
  messageObject.message = $("message").value;
  messageObject.send_to = sendToId;

  sendMessageToId(messageObject);

  async function sendMessageToId(object) {
    console.log(object);
    await fetch("https://www.tuankietcoder.tech/api/trainee_program/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    })
      .then((res) => res.json)
      .then((res) => {
        console.log(res);
      });
  }
};
