const country = document.getElementById("country"),
  stateDiv = document.getElementById("stateDiv");
let state = "";

fetch(
  "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
)
  .then((response) => response.json())
  .then((country_list) => {
    let i = 0;
    for (; i < country_list.length; i++) {
      const options = document.createElement("option");
      options.innerText = country_list[i].name;
      options.setAttribute("value", `${country_list[i].code3}`);
      country.appendChild(options);
    }
  })
  .catch((error) => console.error(error));

function selectCountry() {
  stateDiv.removeChild(stateDiv.lastChild);

  fetch(
    "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
  )
    .then((response) => response.json())
    .then((country_list) => {
      let i = 0;
      let y = 0;

      let select = `<label for="state">State</label><br>
                          <select class="input" id="state">
                              <option value='' selected="selected"> -- Select Country First -- </option>
                          </select>`;

      stateDiv.innerHTML = select;

      for (; i < country_list.length; i++) {
        if (country.value == country_list[i].code3) {
          const statesList = country_list[i].states;

          for (; y < statesList.length; y++) {
            let options = document.createElement("option");
            options.innerText = statesList[y].name;
            options.setAttribute("value", `${statesList[y].code}`);
            stateDiv.lastChild.appendChild(options);
          }
        }
      }
    })
    .catch((error) => console.error(error));
}
