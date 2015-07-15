var express = require('express'),
  app = express(),
  NeDB = require('nedb'),
  db = new NeDB('hits.db');

app.set('view engine', 'jade');

app.use(express.static(process.cwd() + '/public'));

app.get('/', function(request, response) {
  addHit(function() {

    countHits(function(theNumber) {
      response.render('index', {
        myCoolMessage: 'Jade ROCKS!!!!',
        pageHits: theNumber
      });
    });
  });
});

app.get('/greet/:name', function(req, res) {
  var names = ['Howard', 'Trini', 'Dwight'];

  var name = req.params.name;

  if (names.indexOf(name) >= 0) {
    res.render('greet', {
      name: req.params.name
    });
  } else {
    res.status(404).render('404');
  }
});

db.loadDatabase(function(err) {
  if (err) {
    console.log('Error loading database:', err);
  } else {
    // console.log('listening on localhost:8025');
    console.log('listening on localhost:8026');
    app.listen(8026);
  }
});



function addHit(cb) {
  db.insert({
    created_at: new Date().toString()
  }, function(err) {
    if (err) {
      console.log('err adding hit', err);
    } else {
      cb();
    }
  });
}


function countHits(cb) {
  db.count({}, function(err, count) {
    if (err) {
      console.log('err counting hits', err);
    } else {
      cb(count);
    }
  });
}
