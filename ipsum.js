var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    fs = require('fs');

var count = require('./count.json');

app.use(express.static(__dirname + '/client', {maxAge: 60*60*24*7}));

module.exports.app = app;

app.get(/.*\/.*\/.*/, function(req, res) {
  res.charset = 'utf-8';
  res.end(go(req.url));
});

if(!String.prototype.repeat) {
  String.prototype.repeat = function(n) {
    return new Array(n+1).join(this);
  };
}

function randomize() {
  return Math.floor(Math.random()*3-1);
}

var stretch = function stretch(a, n) {
  var d = a;
  if(typeof d == 'string') {
    while(d.length < n) {
      d = d.repeat(2);
    }
    return d;
  }
  while(d.length < n) {
    d = d.concat(a.sort(randomize));
  }
  return d;
};

/* IPSUM GENERATOR */
var general = require('./general.json');
var dictionary = {
  'design': require('./design.json'),
  'news': require('./news.json')
};
var normal = 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیستری را برای طراحان رایانه ای و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.';

function loremipsum(data) {
  var method = data[0],
      unit = data[1],
      amount = +data[2],
      r;


  if(method == 'normal' && unit == 'p')
    return (normal + '<br>').repeat(amount);
  else if (method == 'normal')
    r = normal.split(' ');

  if(!r) {
    r = dictionary[method].concat(general);
    r.sort(randomize);
  }

  switch(unit) {
    case 'c':
      r = stretch(r, amount/2);
      var c = 0;
      r = r.filter(function(a) {
        if(c < amount && c + a.length <= amount) {
          c += a.length;
          return true;
        }
        return false;
      });
      return r.slice(0, Math.round(amount/2)).join(' ');
    case 'w':
      r = stretch(r, amount);
      return r.slice(0, amount).join(' ');
    case 'p':
      r = stretch(r, 15*(Math.random()+1));
      var s = r.join(' ') + '. <br>';
      for(var i = 1; i < amount; i++) {
        r = r.sort(randomize);
        r = stretch(r, 15*(Math.random()*3+2));

        s += r.join(' ') + '. <br>';
      }
      return s;
  }
}
function go(url) {
  var req = url.split('/');
  return loremipsum(req.slice(1));
}

//COUNTER
io.on('connection', function(socket) {
  socket.on('counter', function(data) {
    if(data) {
      var r = data.split(' ').join('').length + count;
      fs.writeFile(__dirname + '/count.json', r, function() {
        count = +(fs.readFileSync(__dirname + '/count.json', 'utf8'));
      })
      io.emit('counter', r);
    }
    else io.emit('counter', count);
  })
});
