/* eslint-disable */
// this hurts me more than it hurts you


$(function () {
  // Start socket.io
  var socket = io();

  console.log('loader');
  // Key elements
  let keys = {
    up: $('div#controls p#up'),
    left: $('div#controls p#left'),
    down: $('div#controls p#down'),
    right: $('div#controls p#right'),
  };

  // Register keys
  registerKeysUp();
  registerKeysDown();

  // Handle key events
  function keyEvent(key, down) {
    switch (key) {
      case 'up':
        if (down) {
          keys.up.addClass('pressed');
        } else {
          keys.up.removeClass('pressed');
        }
        socket.emit('key event', {
          key,
          down
        });
        break;
      case 'left':
        if (down) {
          keys.left.addClass('pressed');
        } else {
          keys.left.removeClass('pressed');
        }
        socket.emit('key event', {
          key,
          down
        });
        break;
      case 'down':
        if (down) {
          keys.down.addClass('pressed');
        } else {
          keys.down.removeClass('pressed');
        }
        socket.emit('key event', {
          key,
          down
        });
        break;
      case 'right':
        if (down) {
          keys.right.addClass('pressed');
        } else {
          keys.right.removeClass('pressed');
        }
        socket.emit('key event', {
          key,
          down
        });
        break;
    }
  }

  // Register key events
  function registerKeysDown() {
    $(document).one('keydown', function (e) {
      switch (e.which) {
        // Up
        case 38:
        case 87:
          keyEvent('up', true);
          break;
        case 65:
        case 37:
          keyEvent('left', true);
          break;
        case 83:
        case 40:
          keyEvent('down', true);
          break;
        case 68:
        case 39:
          keyEvent('right', true);
          break;
        default:
          console.log('Unknown key pressed: ' + e.which);
          break;
      }
    });
  }
  function registerKeysUp() {
    $(document).keyup(function (e) {
      switch (e.which) {
        // Up
        case 38:
        case 87:
          keyEvent('up', false);
          break;
        case 65:
        case 37:
          keyEvent('left', false);
          break;
        case 83:
        case 40:
          keyEvent('down', false);
          break;
        case 68:
        case 39:
          keyEvent('right', false);
          break;
        default:
          console.log('Unknown key pressed: ' + e.which);
          break;
      }

      registerKeysDown();
    });
  }
});

// TODO: setup babel for more M O D E R N javascript

