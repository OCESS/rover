/* eslint-disable prefer-destructuring */

const Koa = require('koa');
const serve = require('koa-static');
const IO = require('koa-socket-2');
const Gpio = require('onoff').Gpio;


// PI SETUP
const pins = {
  left: {
    forw: new Gpio(27, 'out'),
    back: new Gpio(22, 'out'),
  },
  right: {
    forw: new Gpio(23, 'out'),
    back: new Gpio(24, 'out'),
  },
};


// WEBSERVER
const app = new Koa();
const io = new IO();

const PORT = process.env.PORT || 3002;

app.use(serve('./public'));

// Socket.io
io.attach(app);
// eslint-disable-next-line no-underscore-dangle
app._io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
io.on('key event', (ctx, data) => {
  console.log(`key event: ${JSON.stringify(data)}`);
  const val = (data.down) ? 1 : 0;
  switch (data.key) {
    case 'up':
      pins.left.forw.writeSync(val);
      pins.right.forw.writeSync(val);
      break;
    case 'down':
      pins.left.back.writeSync(val);
      pins.right.back.writeSync(val);
      break;
    case 'left':
      pins.left.back.writeSync(val);
      pins.right.forw.writeSync(val);
      break;
    case 'right':
      pins.right.back.writeSync(val);
      pins.left.forw.writeSync(val);
      break;
    default:
      console.log(`unknown key ${data.key}`);
      break;
  }
});

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);

