// **** Utilities

// only number and  arabic number converstion
$(document).on("keyup", ".onlyNumber", function (e) {
  var ar = "٠١٢٣٤٥٦٧٨٩".split("");
  var en = "0123456789".split("");
  $(this).val(
    $(this)
      .val()
      .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (x) {
        return en[ar.indexOf(x)];
      }) // arabic to english number
      .replace(/[^\d]/g, "") // allow only number
  );
});

// handle header fixed top
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      document.getElementById("nav-top-line").classList.add("fixed-top");
      // add padding top to show content behind navbar
      // navbar_height = document.querySelector(".navbar").offsetHeight;
      // document.body.style.paddingTop = navbar_height + "px";
    } else {
      document.getElementById("nav-top-line").classList.remove("fixed-top");
      // remove padding top from body
      document.body.style.paddingTop = "0";
    }
  });
});

// *** Funcitons

function handleDispProduct(img) {
  $("#imgDispProduct").attr("src", "assets/img/product/" + img);
}

$("#btnSubscriber").on("click", () => {
  var email = $("#txtEmail").val();

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    addSubscriber(email);
  } else {
    showAlert("Please enter valid email", 0);
  }
});

function handleOwnCall(scode, ip) {
  $("#btnVerifyCode").attr("disabled", true);
  $("#btnVerifyCode").text("Loading...");

  if (ip.length > 15) {
    ip = "127.0.0.1";
  }

  $.ajax({
    url: "/services/verifycode.php?code=" + scode + "&uip=" + ip,
    dataType: "xml",
    success: function (result) {
      confirmationModal.show();

      var resVal = $(result).children().eq(0).text().trim();

      var splitedRes = resVal.split("#");
      var sucContent = "";
      if (splitedRes.indexOf("mi") != -1) {
        sucContent =
          "Congrats! You have verified that your product is an authentic AUC Product.";
      } else if (splitedRes.indexOf("mc") != -1) {
        var times = resVal.split("被查询过")[1].split("次")[0].trim();
        sucContent =
          "Congrats! You have verified that your product is an authentic AUC Product. <br> <br> This code is checked for #" +
          times +
          " time";
      } else if (splitedRes.indexOf("e1") != -1) {
        sucContent = "Verification code you have entered is invalid";
      } else if (splitedRes.indexOf("e2") != -1) {
        sucContent = "Anti-counterfeiting code is not activated";
      } else if (splitedRes.indexOf("e3") != -1) {
        sucContent =
          "Please Try Again. If Error Shows Again, You May Got a Counterfeit AUC Product.";
      } else {
        sucContent = "Verification code you have entered is invalid";
      }

      $("#lblSucMsg").html(sucContent);
    },
    error: function (e, xhr, opt) {
      $("#lblErr").text(e.status + "--" + e.responseText);
      console.error(e.status + "--" + e.responseText);
    },
  }).done(function (data) {
    $("#btnVerifyCode").text("Submit");
    $("#btnVerifyCode").attr("disabled", false);
  });
}

function addSubscriber(email) {
  fetch("/services/subscribeEmail.php?email=" + email, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      debugger;
      if (res.status == "success") {
        console.log("Succ: ", res);
        showAlert("You have subscribed successfully...", 1);
      } else {
        console.log("Err: ", res);
        showAlert(res, 0);
      }
    })
    .catch((err) => {
      console.log(err);
      showAlert(err, 0);
    });
}

function sendContactEmail(from, msg, star) {
  const fomData = new FormData();
  fomData.append("from", from);
  fomData.append("star", star);
  fomData.append("message", msg);

  fetch("/services/contactEmail.php", {
    method: "POST",
    body: fomData,
  })
    .then((response) => response.json())
    .then((res) => {
      debugger;
      if (res.status == "success") {
        console.log("Succ: ", res);
        showAlert(res.message, 1);
      } else {
        console.log("Err: ", res.message);
        showAlert(res.message, 0);
      }
    })
    .catch((err) => {
      console.log(err);
      showAlert(err, 0);
    });
}

function showAlert(message, type) {
  // var myToastEl = document.getElementById('myToastEl')
  // var myToast = bootstrap.Toast.getInstance(myToastEl) // Returns a Bootstrap toast instance

  var rNumb = Math.floor(Math.random() * 9999);

  var id = "alert-" + rNumb;

  var alertClass =
    type === 1 ? " border-primary text-white" : " border-danger text-danger ";

  var toastHtml = `  <div
                      style="
                        position: fixed;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        background: rgba(0, 0, 0, 0.7);
                      "
                      class="alert-msg"
                      >
                      <div class="d-flex justify-content-center align-items-center h-100">
                        <div
                          style="width: 500px"
                          class="border border-2 bg-dark rounded p-3  ${alertClass} "
                        >
                          <div class="row">
                            <div class="col-10">${message}</div>
                            <div
                              class="col-2 my-auto text-end"
                              onclick="$('.alert-msg').hide();"
                            >
                              <i class="fa fa-times text-danger"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>`;

  $("body").append(toastHtml);
}

function pageRedirection() {
  if (window.location.protocol.includes("s")) {
    var u = window.location.href;
    window.location.replace(u.replace("https:", "http:"));
  }
}

// pageRedirection(); // to redirect the site to
