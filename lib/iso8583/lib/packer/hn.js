// HEX encoded integer: when 800 goes as 0x08, 0x00
exports.unpack = function(msg, packager) {
  var result = '';
  
  for (var i = 0; i < packager.length / 2; i++) {
    var item = msg.readUInt8(i).toString(16);
    if (item.length < 2) item = '0' + item;
    result += item;
  }

  return {
    raw: result,
    data: parseInt(result),
    restData: msg.slice(packager.length / 2)
  };
};

exports.pack = function(row, packager) {
  row = '' + row;
  var data = new Array();

  if (row.length % 2) row = '0' + row;
  var len = row.length;

  for (var i = 0; i < len; i+=2) {
      data.push('0x' + row.slice(i, i + 2));
  }

  return {
    msg: new Buffer(data)
  }
};