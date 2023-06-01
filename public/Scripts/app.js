// IIFE -- Immediately Invoked Function Expression
(function(){
    function Start()
    {
        console.log("App started!");
    function handleClick() {
        if (document.getElementById("hiring").checked) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    }

    function getData(form) {
        var formData = new FormData(form);
      
        // iterate through entries...
        for (var pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
      }
      try{
      document.getElementById("contact-form").addEventListener("submit", function (e) {
       e.preventDefault();
        getData(e.target);
        const myTimeout = setTimeout(retrn, 300);
      });
      } catch {}

      function retrn(){
        window.location.href = "/home";
      }

    const radioBtn = document.querySelectorAll("input[type=radio]");

    radioBtn.forEach((radio) => {
        radio.addEventListener("click", handleClick);
    });
}
    window.addEventListener("load", Start);
})();