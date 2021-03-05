function getsysdata(request) {
  var ipaddress = request.headers['x-forwarded-for'].split(',')[0];
  var sysinfo = request.headers['user-agent'];
  var lang = request.headers['accept-language'];
  return [ipaddress, sysinfo, lang]
}

exports.getusersysinfo = getsysdata;