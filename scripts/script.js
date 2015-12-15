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


//populate the table with all customers from db
$(document).ready(function() {
    var clientTable = $('.clients').DataTable( {
        "ajax": "/api/customers",
        "info": false,
        "ordering": true,
        "info":     false,
        "bLengthChange": false,
        "bProcessing": true,
        "columns": [
            { "data": "firstname", title: "Firstname" },
            { "data": "surname", title: "Surname" },
            { "data": "skype", title: "Skype"},
            { "data": "email", title: "E-mail"},
            { "data": "phone", title: "Telephone"}
          
        ]
    } );

    $('table.clients').on('click', 'tr',function(event) {
        var data = clientTable.row(this).data();  
        $('.edit-clients-wrapper').show();

        //bind model from api with knockout
        function clientModelKO () {
            var self = this;
            this.firstname = ko.observable(data.firstname);
            this.surname = ko.observable(data.surname);
            this.dateofbirth = ko.observable(data.databirth);
            this.age = ko.observable(data.age);
            this.address = ko.observable(data.address);
            this.skype = ko.observable(data.skype);
            this.email = ko.observable(data.email);
            this.phone = ko.observable(data.phone);
            this.work = ko.observable(data.work);

            this.setFirstname = function() {
                self.firstname(data.firstname);
            };

        }

        var vm = new clientModelKO();
        vm.setFirstname('hei');
        ko.applyBindings(vm);
    });

    $('.close-button').on('click', function () {
        $('.edit-clients-wrapper').hide();
    });

    ////bind data with knockout
    //window.onload= function() {
    //    var viewModel = {
    //        myMessage: ko.observable() // Initially blank
    //    };
    //    viewModel.myMessage("Hello, world!");
    //    ko.applyBindings(viewModel);
    //};

} );






