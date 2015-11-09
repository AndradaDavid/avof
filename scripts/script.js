/*var app = require("./app")

console.log(app(2,3));
*/
$('nav li').on('click', function() {
	$(this).parent().children().removeClass('active');
	$(this).addClass('active');
	var contentName = $(this).data('tab');
	if (contentName == 'overview') {
		window.location.pathname = '/';
	} else {
		window.location.pathname = contentName;	
	}
	 
	$('.' + contentName).show();

});

$("nav li[data-tab='" + window.location.pathname.split('/')[1] +"']").addClass('active');


//calling the customers from db
$('nav li[data-tab="customers"]').on('click', function() {
	

    
	
});

$(document).ready(function() {
    $('.clients').DataTable( {
        "ajax": "/api/customers",
        "info": false,
        "ordering": true,
        "info":     false,
        "bLengthChange": false,
        "columns": [
            { "data": "firstname", title: "Firstname" },
            { "data": "surname", title: "Surname" },
            { "data": "skype", title: "Skype"},
            { "data": "email", title: "E-mail"},
            { "data": "phone", title: "Telephone"}
          
        ]
    } );
} );






