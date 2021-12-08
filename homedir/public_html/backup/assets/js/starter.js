// Importing JavaScript
//
// You have two choices for including Bootstrap's JS files—the whole thing,
// or just the bits that you need.


// Option 1
//
// Import Bootstrap's bundle (all of Bootstrap's JS + Popper.js dependency)



// Option 2
//
// Import just what we need

// If you're importing tooltips or popovers, be sure to include our Popper.js dependency
// import "../../node_modules/popper.js/dist/popper.min.js";

// import "../../node_modules/bootstrap/js/dist/util.js";
// import "../../node_modules/bootstrap/js/dist/modal.js";



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