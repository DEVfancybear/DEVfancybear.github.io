// menu dropdown

(function($) {
  $(".dropdown-menu a.dropdown-toggle").on("click", function(e) {
    if (
      !$(this)
        .next()
        .hasClass("show")
    ) {
      $(this)
        .parents(".dropdown-menu")
        .first()
        .find(".show")
        .removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass("show");

    $(this)
      .parents("li.nav-item.dropdown.show")
      .on("hidden.bs.dropdown", function(e) {
        $(".dropdown-submenu .show").removeClass("show");
      });

    return false;
  });
});

// end menu dropdown

//login/register
var emailArray = [];
var passwordArray = [];

var loginBox = document.getElementById("login");
var regBox = document.getElementById("register");
var forgetBox = document.getElementById("forgot");

var loginTab = document.getElementById("lt");
var regTab = document.getElementById("rt");

function regTabFun() {
  event.preventDefault();

  regBox.style.visibility = "visible";
  loginBox.style.visibility = "hidden";
  forgetBox.style.visibility = "hidden";

  regTab.style.backgroundColor = "rgb(12, 132, 189)";
  loginTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";
}

function loginTabFun() {
  event.preventDefault();

  regBox.style.visibility = "hidden";
  loginBox.style.visibility = "visible";
  forgetBox.style.visibility = "hidden";

  loginTab.style.backgroundColor = "rgb(12, 132, 189)";
  regTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";
}

function forTabFun() {
  event.preventDefault();

  regBox.style.visibility = "hidden";
  loginBox.style.visibility = "hidden";
  forgetBox.style.visibility = "visible";

  regTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";
  loginTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";
}

function register() {
  event.preventDefault();

  var email = document.getElementById("re").value;
  var password = document.getElementById("rp").value;
  var passwordRetype = document.getElementById("rrp").value;

  if (email == "") {
    alert("Email required.");
    return;
  } else if (password == "") {
    alert("Password required.");
    return;
  } else if (passwordRetype == "") {
    alert("Password required.");
    return;
  } else if (password != passwordRetype) {
    alert("Password don't match retype your Password.");
    return;
  } else if (emailArray.indexOf(email) == -1) {
    emailArray.push(email);
    passwordArray.push(password);

    alert(email + "  Thanks for registration. \nTry to login Now");

    document.getElementById("re").value = "";
    document.getElementById("rp").value = "";
    document.getElementById("rrp").value = "";
  } else {
    alert(email + " is already register.");
    return;
  }
}

function login() {
  event.preventDefault();

  var email = document.getElementById("se").value;
  var password = document.getElementById("sp").value;

  var i = emailArray.indexOf(email);

  if (emailArray.indexOf(email) == -1) {
    if (email == "") {
      alert("Email required.");
      return;
    }
    alert("Email does not exist.");
    return;
  } else if (passwordArray[i] != password) {
    if (password == "") {
      alert("Password required.");
      return;
    }
    alert("Password does not match.");
    return;
  } else {
    alert(email + " yor are login Now \n Welcome to our website.");

    document.getElementById("se").value = "";
    document.getElementById("sp").value = "";
    return;
  }
}

//thêm số lượng sản phẩm mỗi lần click vào add-to-cart
$(document).ready(function() {
  // tạo biến ban đầu
  var counts = 0;
  $(".addToCart").click(function() {
    // đánh số và tăng lên 1 đơn vị mỗi lần nhấp
    counts += +1;
    $(".cart-counter").animate(
      {
        opacity: 1
      },
      300,
      function() {
        // viết số lượng vào thẻ
        $(this).text(counts);
      }
    );
  });
});

// end thêm số lượng sản phẩm mỗi lần click vào add-to-cart

//click chọn số lượng sản phẩm
$(document).ready(function() {
  $(".count").prop("disabled", true);
  $(document).on("click", ".plus", function() {
    $(".count").val(parseInt($(".count").val()) + 1);
  });
  $(document).on("click", ".minus", function() {
    $(".count").val(parseInt($(".count").val()) - 1);
    if ($(".count").val() == 0) {
      $(".count").val(1);
    }
  });
});

// lọc sản phẩm
(function(document) {
  "use strict";

  var LightTableFilter = (function(Arr) {
    var _input;

    function _onInputEvent(e) {
      _input = e.target;
      var tables = document.getElementsByClassName(
        _input.getAttribute("data-table")
      );
      Arr.forEach.call(tables, function(table) {
        Arr.forEach.call(table.tBodies, function(tbody) {
          Arr.forEach.call(tbody.rows, _filter);
        });
      });
    }

    function _filter(row) {
      var text = row.textContent.toLowerCase();
      var val = _input.value.toLowerCase();
      row.style.display = text.indexOf(val) === -1 ? "none" : "table-row";
    }

    return {
      init: function() {
        var inputs = document.getElementsByClassName("light-table-filter");
        Arr.forEach.call(inputs, function(input) {
          input.oninput = _onInputEvent;
        });
      }
    };
  })(Array.prototype);

  document.addEventListener("readystatechange", function() {
    if (document.readyState === "complete") {
      LightTableFilter.init();
    }
  });
})(document);
//end lọc sản phẩm
//chatbox message
var element = $(".floating-chat");
var myStorage = localStorage;

if (!myStorage.getItem("chatID")) {
  myStorage.setItem("chatID", createUUID());
}

setTimeout(function() {
  element.addClass("enter");
}, 1000);

element.click(openElement);

function openElement() {
  var messages = element.find(".messages");
  var textInput = element.find(".text-box");
  element.find(">i").hide();
  element.addClass("expand");
  element.find(".chat").addClass("enter");
  var strLength = textInput.val().length * 2;
  textInput
    .keydown(onMetaAndEnter)
    .prop("disabled", false)
    .focus();
  element.off("click", openElement);
  element.find(".header button").click(closeElement);
  element.find("#sendMessage").click(sendNewMessage);
  messages.scrollTop(messages.prop("scrollHeight"));
}

function closeElement() {
  element
    .find(".chat")
    .removeClass("enter")
    .hide();
  element.find(">i").show();
  element.removeClass("expand");
  element.find(".header button").off("click", closeElement);
  element.find("#sendMessage").off("click", sendNewMessage);
  element
    .find(".text-box")
    .off("keydown", onMetaAndEnter)
    .prop("disabled", true)
    .blur();
  setTimeout(function() {
    element
      .find(".chat")
      .removeClass("enter")
      .show();
    element.click(openElement);
  }, 500);
}

function createUUID() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

function sendNewMessage() {
  var userInput = $(".text-box");
  var newMessage = userInput
    .html()
    .replace(/\<div\>|\<br.*?\>/gi, "\n")
    .replace(/\<\/div\>/g, "")
    .trim()
    .replace(/\n/g, "<br>");

  if (!newMessage) return;

  var messagesContainer = $(".messages");

  messagesContainer.append(['<li class="self">', newMessage, "</li>"].join(""));

  userInput.html("");
  userInput.focus();

  messagesContainer.finish().animate(
    {
      scrollTop: messagesContainer.prop("scrollHeight")
    },
    250
  );
}

function onMetaAndEnter(event) {
  if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
    sendNewMessage();
  }
}
//end chatbox
