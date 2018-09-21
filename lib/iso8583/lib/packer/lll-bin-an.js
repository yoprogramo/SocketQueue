exports.unpack = function(msg, packager) {
  //var length = parseInt(msg[0] + "" + msg[1]);
  var length = parseInt(('0' + (msg[0] & 0xFF).toString(16)).slice(-2)+""+('0' + (msg[1] & 0xFF).toString(16)).slice(-2));
  //console.log("[" + msg+ "]");
  //var length = parseInt(msg.slice(0, 3).toString('ascii'), 10);

  if(length > packager.length) {
    length = packager.length;
  }

  console.log("Recogemos "+length);

  var result = {
    data:       msg.slice(2, length + 2),
    chunk:      msg.slice(0, length + 2),
    restData:   msg.slice(length + 2)
  };

  return result;
};

exports.pack = function(row, packager) {
  var length      = row.length;

  if (typeof row == 'object' && row instanceof Buffer) {
    if (length > packager.length) {
      length = packager.length;
      row = row.slice(0, packager.length - 1);
    }

    var ll = ('0000' + length).slice(-4);
    var lb = new Buffer(ll, 'hex');

    return {
      msg: Buffer.concat([lb, row], row.length + lb.length)
    }
  } else {
    if (length > packager.length) {
      length = packager.length;
      row = row.substring(0, packager.length - 1);
    }

    var ll = ('0000' + length).slice(-4);
    var lb = new Buffer(ll, 'hex');

    return {
      msg: lb.toString('ascii') + row
    }
  }
};