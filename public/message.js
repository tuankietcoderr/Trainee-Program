let _id;
function init() {
  _id = prompt("What's your ID: ");
  if (!_id) {
    init();
  }
}
init();

function $(id) {
  return document.getElementById(id);
}

let traineeMessages;

function getDataRecusively() {
  async function getTrainees() {
    await fetch(
      `https://www.tuankietcoder.tech/api/trainee_program/message?send_to=${_id}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.success) {
          location.reload();
        }
        traineeMessages = res.data;
        getDataRecusively();
      });
  }
  if (traineeMessages === undefined) {
    getTrainees();
    return;
  }
  //** Du lieu xu li tu day... **//
  console.log(traineeMessages);
  traineeMessages.forEach((item) => {
    $("all-messages").innerHTML +=
      item.message +
      `<br />` +
      `<cite>Sent from ${item.send_from.fullName}</cite>` +
      `<br/>`;
  });
}

getDataRecusively();
