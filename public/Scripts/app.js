/* app.js by Stefan Lovecchio ID# 301305372 18/06/23 */
// IIFE -- Immediately Invoked Function Expression
(function(){
    function Start()
    {
        console.log("App started!");

        //create event listener for delete button
        let deleteButtons = document.querySelectorAll('.btn-danger')
        for ( button of deleteButtons)
        {
            button.addEventListener('click', (event) => {
                //request deletion confirmation
                if (!confirm("Are your sure?"))
                {
                    //if unconfirmed, return to contacts list
                    event.preventDefault();
                    window.location.assign('/contacts-list');
                }
            });
        }
        
        //if conctactee is hiring, display hourly rate
    function handleClick() {
        if (document.getElementById("hiring").checked) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    }

    //capture form data
    function getData(form) {
        var formData = new FormData(form);
        // iterate through entries...
        for (var pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
      }
      //capture contact form info on submit
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
      //create event listener for "inquiring about..." radio buttons
    const radioBtn = document.querySelectorAll("input[type=radio]");
    radioBtn.forEach((radio) => {
        radio.addEventListener("click", handleClick);
    });
}
    window.addEventListener("load", Start);
})();