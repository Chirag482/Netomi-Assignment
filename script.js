function access() {
  const iframe = document.getElementById("iFramed");
  const iframedoc = iframe.contentDocument;

  const username = iframedoc.getElementById("name"),
    email = iframedoc.getElementById("email"),
    phone = iframedoc.getElementById("phone"),
    dob = iframedoc.getElementById("dob"),
    submitBtn = iframedoc.getElementById("submitBtn"),
    errorText = document.getElementById("errorMsg"),
    country = iframedoc.getElementById("country");

  let state = "";

  setInterval(stateFunc, 100);

  function stateFunc() {
    state = iframedoc.getElementById("state");
  }

  function dispalyMessage(resultObj) {
    if (Object.keys(resultObj).length === 0) {
      errorText.innerText = `Result: {"Success": "All fields are valid."}`;
    } else {
      errorText.innerText = `Result: ${JSON.stringify(resultObj)}`;
    }
  }

  function validateDOB() {
    let dateFormat = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    if (!Boolean(dob.value))
      errorResult["Date Of Birth"] = { error: "Date Of Birth is Required" };
    else if (!dateFormat.test(dob.value))
      errorResult["Date Of Birth"] = { error: "Use Valid Date" };
    else errorResult["Date Of Birth"] = null;
  }
  function validateEmail() {
    let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.value)
      errorResult["Email Address"] = { error: "Email Address is Required" };
    else if (!email.value.match(emailformat))
      errorResult["Email Address"] = { error: "Email Address is not valid" };
    else errorResult["Email Address"] = null;
  }
  function validateCountry() {
    if (!country.value)
      errorResult["Country"] = {
        error: "Country is Required",
      };
    else {
      errorResult["Country"] = null;
    }
  }
  function validateState() {
    if (!state?.value)
      errorResult["State"] = {
        error: "State is Required",
      };
    else errorResult["State"] = null;
  }
  function validateContact() {
    if (!phone.value)
      errorResult["Contact Number"] = { error: "Contact Number is Required" };
    else if (phone.value.length !== 10)
      errorResult["Contact Number"] = "Contact Number shoulde be of 10 digits";
    else errorResult["Contact Number"] = null;
  }
  function validateName() {
    if (!username.value)
      errorResult["Name"] = {
        error: "Name is Required",
      };
    else if (username.value.length < 5 || username.value.length > 11)
      errorResult["Name"] = {
        error: "Length should be between 4-10 characters.",
      };
    else errorResult["Name"] = null;
  }

  function validateFields() {
    validateName();
    validateDOB();
    validateEmail();
    validateCountry();
    validateState();
    validateContact();
    Object.keys(errorResult).map((key) => {
      if (errorResult[key] === null) {
        delete errorResult[key];
      }
    });
    dispalyMessage(errorResult);
  }

  submitBtn.addEventListener("click", validateFields);

  var errorResult = {
    Name: null,
    "Date Of Birth": null,
    "Email Address": null,
    "Contact Number": null,
    Country: null,
    State: null,
  };
}
