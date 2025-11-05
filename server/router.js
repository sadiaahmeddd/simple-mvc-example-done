/*// import the controllers
// This only specifies the folder name, which means it will automatically pull the index.js file
const controllers = require('./controllers');

// function to attach routes
const router = (app) => {
  // pass the express app in

  // app.VERB maps get requests to a middleware action
  // For example
  // app.get handles GET requests
  // app.post handles POST requests

  // when someone goes to the /page1 page, call controllers.page1
  // For example, www.webpage.com/page1, it will route to controllers.page1
  app.get('/page1', controllers.page1);
  app.get('/page2', controllers.page2);
  app.get('/page3', controllers.page3);
  app.get('/getName', controllers.getName);
  app.get('/findByName', controllers.searchName);

  // whenever someone goes to the site without a path (AKA the home page), call controllers.index
  // For example www.webpage.com
  app.get('/', controllers.index);

  // catch for any other GET request. The *wild means anything
  app.get('/*wild', controllers.notFound);

  // When someone POSTS to /setName, call controllers.setName
  // For example, a form submission to www.webpage.com/setName
  app.post('/setName', controllers.setName);

  // When someone POSTS to /updateLast, call controllers.updateLast
  app.post('/updateLast', controllers.updateLast);
};

// export the router function



//Dog 

// server/router.js
const controllers = require('./controllers');

// Dog routes
app.post('/dogs/create', controllers.Dog.createDog);
app.post('/dogs/increment', controllers.Dog.incrementAgeByName);

// Page 4 – list all dogs
app.get('/page4', controllers.Dog.listDogs);





module.exports = router;
*/ 


// server/router.js
// import the controllers (this loads controllers/index.js)
const controllers = require('./controllers');

// function to attach routes
const router = (app) => {
  // --- existing demo routes ---
  app.get('/page1', controllers.page1);
  app.get('/page2', controllers.page2);
  app.get('/page3', controllers.page3);
  app.get('/getName', controllers.getName);
  app.get('/findByName', controllers.searchName);

  // --- Dog routes (add BEFORE the catch-all) ---
  app.post('/dogs/create', controllers.Dog.createDog);
  app.post('/dogs/increment', controllers.Dog.incrementAgeByName);
  app.get('/page4', controllers.Dog.listDogs);

  // --- home ---
  app.get('/', controllers.index);

  // --- POST routes ---
  app.post('/setName', controllers.setName);
  app.post('/updateLast', controllers.updateLast);

  // --- catch-all 404 (keep LAST) ---
  app.get('*', controllers.notFound);
};

// export the router function
module.exports = router;
