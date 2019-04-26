const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#msg1");
const messageTwo = document.querySelector("#msg2");

weatherForm.addEventListener("submit", e => {
    //e => event object
    e.preventDefault(); //stops the default browser like reloading the page : try removing it and looking up in console.

    const location = search.value;

    messageOne.textContent = "Loading...";
    messageOne.textContent = "";

    //fetch api allows user to fetch data from url
    fetch("//weather?address=" + location).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});