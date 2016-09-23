let fs = require('fs')
  , utils = require('./utils')
  , Botkit = require('botkit')
  , controller = Botkit.slackbot()
  , Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(200, 200)
  , ctx = canvas.getContext('2d')
  , knox = require('knox');

class Bot {
  constructor(token) {
    this.bot = controller.spawn({token});
    this.bot.startRTM((err, bot, payload) => {
      controller.on('direct_message', (bot, message) => this.onMessage(message))
      controller.on('direct_mention', (bot, message) => this.onMessage(message))
    });
    this.knox = knox.createClient({
      key: 'AKIAJHWFFN7VY7WZVYCQ',
      secret: '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',
      bucket: 'meegoosta'
    })
  }

  onMessage(message) {
    this.renderImage(null, message.text, (filename, filepath) => {
      this.uploadImage(filename, filepath, (url) => {
        this.bot.reply(message, {text: url});
      });
    });
  }

  renderImage(image, message, cb) {
    let filename = 'megoosta-'+ utils.randomString() +'.png';
    let filepath = './images/'+ filename;
    fs.readFile('./images/loic.png', function(err, squid) {
      if (err) throw err;
      let canvas, ctx, m
        , fontsize = 300
        , img = new Image
        , first = true;
      img.src = squid;
      while(first || (m.width > img.width)) {
        first = false;
        canvas = new Canvas(img.width, img.height);
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        ctx.font = 'normal '+ fontsize +'px Impact, serif';
        ctx.lineWidth = 15;
        ctx.strokeStyle = '#000';
        m = ctx.measureText(message);
        fontsize = 0.8 * fontsize;
      }

      ctx.strokeText(message, img.width/2 - m.width/2, img.height-50);

      ctx.fillStyle = '#fff';
      ctx.fillText(message, img.width/2 - m.width/2, img.height-49);

      let stream = fs.createWriteStream(filepath);
      canvas.jpegStream(
        { bufsize: 4096 // output buffer size in bytes, default: 4096
        , quality: 75 // JPEG quality (0-100) default: 75
        , progressive: true
      }).pipe(stream);
      stream.on('close', () => {
        cb(filename, filepath);
      });
    })
  }

  uploadImage(filename, filepath, cb) {
    this.knox.putFile(filepath, filename, (err, res) => {
      if (res.statusCode == 200) {
        cb('https://s3-eu-west-1.amazonaws.com/meegoosta/' + filename);
      }
    });
  }
}

let bot = new Bot("xoxb-79603678482-wfrKBTF0fkeM1NFelxz6AAl6");
