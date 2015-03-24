// SNOW OBJECT >>
function Kar(x) {
    var timer;
    var ME = this;
    this.durdu = false;
    this.son = 200;
    this.w = 32;
    this.x = Math.round(Math.random() * (canvas.width - this.w)); // * canvas.width );
    this.y = 10;
    this.r = random(0.2, 1.5);
    // this.img = rastgeleKarImg(); // Instead, used context.arc() is used

    this.stop = function() {
        ME.durdu = true;
    }
    this.vx = function() {
        return random(-0.25, 0.25);
    };

    this.vy = function() {
        return 5 * random(0.8, 1.5);
    };

    this.draw = function() {
        context.beginPath();
        context.arc(ME.x, ME.y, this.r, 0, 2 * Math.PI, false);
        context.fillStyle = '#ffffff';
        context.fill();
    }

    this.drawOld = function() {
        var imageObj = new Image();
        // https://dl.dropboxusercontent.com/u/150596595/img/bogaz.jpg
        imageObj.onload = function() {
            context.drawImage(imageObj, ME.x, ME.y, ME.w, ME.w);
        };
        imageObj.src = ME.img;
        //context.fillRect(ME.x, ME.y, ME.w, ME.w);
    };

    /*
    this.clear = function() {
        var bY = ME.y > canvas.height - random(1.1, 1.5) * ME.w; //Yerde birikme efekti
    };
    */

    this.move = function() {
        // ME.clear();
        // Thanks to http://stackoverflow.com/a/11822267/1766716
        if (!ME.durdu) {
            ME.x += (ME.vx() + (-5 + Math.round(Math.random() * 10.0))); // -5/+5 arası
            ME.y += ME.vy(); //Math.round ( Math.random() );
        }
    };

    this.timer = setInterval(this.move, timeOut);

};
// SNOW OBJECT <<


function resizeCanvas() {

    // http://stackoverflow.com/a/11744120/1766716 >>
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        w = w.innerWidth || e.clientWidth || g.clientWidth,
        h = w.innerHeight || e.clientHeight || g.clientHeight;
    // http://stackoverflow.com/a/11744120/1766716 <<

    var canvas = d.getElementById('myCanvas');
    with(canvas) {
        setAttribute('width', w);
        setAttribute('height', h)
    };

};

// GLOBAL AREA >>
var canvas;
var context;
var timeOut = 100.0;
var stepSize = 1.0;
var n = 12;
// var karlar = []; || GEREK YOK. Her `Kar` nesnesi kendi kendini kontrol
// ediyor.

var karlar = []; //gerek var ;)

var timer1;
var timer2;

// GLOBAL AREA <<


// HELPER FUNCTIONS >>

function random(a, b) {
    return a + b * Math.random();
};

// HELPER FUNCTIONS <<

// Render the snow flakes >> 
function render() {
    // Çizim yapar.
    // renderBG();  

    context.clearRect(0, 0, canvas.width, canvas.height);

    karlar.forEach(function(kar, index) {
        /*
        if (kar.y > canvas.height) {
            // karlar.slice(index, index+1); // MEMORY OVERFLOW 
            delete karlar[index];
        };
    */

        if (kar.y >= canvas.height - random(1, 15)) {
            kar.stop();
        }

        kar.draw();
    });
};
// Render the snow flakes <<

// Generate new snow falls >>
function karMakinasi() {
    // karlar.push( new Kar() ); // MEMORY LEAK WILL OCCUR ;)     
    //new Kar(); // uzaya atılmış başı boş karlar :)
    karlar.push(new Kar());
}
// Generate new snow falls <<

(function init() {
    window.addEventListener('load', function() {

        // CREATE/SET CANVAS and CONTEXT >>
        // Create Canvas 
        var e = document.createElement('canvas');
        e.setAttribute('id', 'myCanvas');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(e);
        resizeCanvas();

        // Set canvas context
        canvas = document.getElementById("myCanvas");
        context = canvas.getContext("2d");

        // SET CANVAS and CONTEXT >>

        // INIT THE Timers and Snows >>
        timer1 = setInterval(karMakinasi, 1000 / n); // yeni kar oluşturma sıklığı. n saniyedeki kar adedi
        timer2 = setInterval(render, 100); // Çizim Sıklığı

        for (var i = 0; i < 10; i++) { // 10 tane kar taneciğini ilk açılışta oluşturuyoruz.
            karlar.push(new Kar);
        };
        // INIT THE Timers and Snows <<

    });

    window.addEventListener('resize', resizeCanvas);
})();