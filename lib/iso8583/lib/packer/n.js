exports.unpack = function(msg, packager) {
  return {
    raw: msg.slice(0, packager.length).toString('ascii'),
    data: parseInt(msg.slice(0, packager.length).toString('ascii')),
    restData: msg.slice(packager.length)
  };
};

exports.pack = function(row, packager) {
  return {
    msg: ("00000000000000000000000000000000" + row).slice(-packager.length)
  };
};
