var http = require("http"),
	mongoose = require("mongoose"),
	MongoClient = require("mongodb").MongoClient,
	dbUrl = "mongodb://andrada:password@ds055812.mongolab.com:55812/avofdb",
	express = require("express"),
	path = require("path"),
	routes = require("./routes"),
	ordersheetsByProvider = {},
	providers = {},
	clients = {},
	searchedProviderName = 'Avon';
	providerId = '',
	campaignNumber = '',
	orderDate = '';

var app = express();


//return a client object with a specific id
var findClientsById = function(db, clientId, callback) {

	var clientRes = '';
	db.collection("Clients").find().toArray(function(err, allClients) {
		if (err) {
			console.err('Error retrieving clients');
		} else {
			allClients.forEach(function(client) {
				if (client._id == clientId) {
					clientRes = client;
				}
			})
			callback(clientRes);
		}
	});
};

//find all providers
var findProviders = function(db, callback) {
	db.collection("Providers").find().toArray(function(err, allProviders) {
			if (err) {
				console.err('Error retrieving providers');
			} else {
				console.log('[INFO] Retrieving providers');
				allProviders.forEach(function(provider) {
						callback(provider);					
				});
			}
		});
};

//find all customers
var findClients = function(db, callback) {
	db.collection("Clients").find().toArray(function(err, allClients) {
			if (err) {
				console.err('Error retrieving customers');
			} else {
				console.log('[INFO] Retrieving providers');
				callback(allClients);					
			}
		});
};

//find a provider object with a specific id
var findProvidersById = function(db, providerId, callback) {
	var providerRes = '';

	db.collection("Providers").find().toArray(function(err, allProviders) {
		if (err) {
			console.err('Error retrieving providers');
		} else {
			console.log('[INFO] Retrieving providers by ' + providerId + ' provider id');
			allProviders.forEach(function(provider) {
				if (provider._id == providerId) {
					providerRes = provider;
					callback(providerRes);					
				}
			});
		}
	});
};


//find all orders with a specific client id
var findOrdersByClientId = function(db, callback) {
	db.collection("Orders").find().toArray(function(err,allOrders) {
		if (err) {
			console.err('Error retrieving orders');
		} else {
			allOrders.forEach(function(order) {
				findClientsById(db,order.clients_id, function(res) {
					console.log(order.description, 'ordered by', res.firstname);				
				});
			});
		}
	});	
};


//find all ordersheets with a specific providers name
var findOrdersheetsByProvider = function(db, searchedProviderName, callback) {
	
	db.collection("Ordersheets").find().toArray(function(err,allOrdersheets) {
		if (err) {
			console.err('Error retrieving ordersheets');
		} else {
			console.log('[INFO] Retrieving ordersheets with', searchedProviderName, 'as provider');
			allOrdersheets.forEach(function(ordersheet) {
				
				findProvidersById(db, ordersheet.providers_id, function(res) {
					if (res.name == searchedProviderName) {
						//console.log(ordersheet);
						//ordersheetsByProvider = ordersheet;
						callback(ordersheet);
					}			
				});
			});
		}
	});	
};


//display cn0 when accessing /example/c
/* MongoClient.connect(dbUrl, function(err, db) {
	if (!err) {

		console.log("We are connected");	
		findOrdersheetsByProvider(db, searchedProviderName, function(res) {
			//console.log(res);
			ordersheetsByProvider[res._id] = res;
			//db.close();
		});

		findProviders(db, function(res) {
			providers[res._id] = res;
		});

		findClients(db, function(res) {
			clients[res._id] = res;
		});

		startApplication(db);
	} else {
		console.log("We are not connected, and the application won`t start");
	}
});



var startApplication = function(db) {
	//set jade template for using
	app.set('view engine', 'jade');
	app.use(express.static(path.join(__dirname, '')));


	//endpoints for application
	/*app.get('/', function(req, res) {
		res.render('layout', {
			title: "Av'Of application", 
			dataOBP: JSON.stringify(ordersheetsByProvider), 
			dataP: JSON.stringify(providers),
			pageContent: "overview"
		});
		
	});


*/
/*	app.get('/', function(req, res) {
		res.redirect('/overview');
	});
	app.get('/overview', function(req, res) {
		res.render("overview");
	});

	app.get('/orders', function(req, res) {
		res.render("orders");
	});

	app.get('/customers', function(req, res) {
		res.render("customers");
	});


	app.get('/customersjson', function(req,res){
	  var clients = '';
	  MongoClient.connect(dbUrl, function(err, db){
		console.log("We are connected");	
		clients = findClients(db, function(req, res) {
			console.log('rezultatul din db pentru client', res);
		});
	  });
	  res.setHeader('Content-Type', 'application/json');
	  res.send(JSON.stringify(clients));
	});

	/*app.get('/orders', function(req, res) {
		res.render('layout', {
			title: "Av'Of orders", 
			dataOBP: JSON.stringify(ordersheetsByProvider), 
			dataP: JSON.stringify(providers),
			pageContent: "orders"
		});
		
	});*/

	/*app.get('/customers', function(req, res) {
		res.render('layout', {
			title: "Av'Of customers", 
			dataC: JSON.stringify(clients),
			pageContent: "customers"
		});
		
	});*/

/*	app.get('/mails', function(req, res) {
		res.render('layout', {
			title: "Av'Of mails", 
			dataOBP: JSON.stringify(ordersheetsByProvider), 
			dataP: JSON.stringify(providers),
			pageContent: "mails"
		});
		
	});

	app.get('/statistics', function(req, res) {
		res.render('layout', {
			title: "Av'Of statistics", 
			dataOBP: JSON.stringify(ordersheetsByProvider), 
			dataP: JSON.stringify(providers),
			pageContent: "statistics"
		});
		
	});

}
*/

var startApplication1 = function () {
	app.set('view engine', 'jade');
	app.use(express.static(path.join(__dirname, '')));

	app.get('/', function(req, res) {
		res.redirect('/overview');
	});

	app.get('/overview', function(req, res) {
		res.render("overview");
	});

	app.get('/orders', function(req, res) {
		res.render("orders");
	});

	app.get('/mails', function(req, res) {
		res.render("mails");
	});

	app.get('/customers', function(req, res) {
		res.render("customers");
	});


	app.get('/api/customers', function(req,res){
		var data = [];
		res.setHeader('Content-Type', 'application/json');
		MongoClient.connect(dbUrl, function(err, db){
			console.log("We are connected");	
			findClients(db, function(result) {		
				clients = {'data': result};
				res.send(JSON.stringify(clients));
			});

		});
	});

	app.get('/api/customers/:id', function(req,res){
		res.setHeader('Content-Type', 'application/json');
		MongoClient.connect(dbUrl, function(err, db){
			console.log("We are connected");
			var id = req.params.id; 	
			findClientsById(db, id, function(res1) {				
				res.send(JSON.stringify(res1));
			});
		});
	});

	app.post("/api/customers", function(req,res){
	});

	app.put('/api/customers/:id', function(req,res){
	});

	app.delete('/api/customers/:id', function(req,res){
	});

}

startApplication1();


http.createServer(app).listen('3000', function() {
	console.log("[INFO] Starting application");
});


 

