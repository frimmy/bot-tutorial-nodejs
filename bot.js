var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy$/;

  if(request.text && botRegex.test(request.text)) {
      this.res.writeHead(200);
      postMessage();
      this.res.end();

  } else if(request.text && /^(\w+)*\?$/.test(request.text)){
      this.res.writeHead(200);
      var newResponse = "WE GOTTA QUESTION?! OOO OOO ME FIRST."
      postMessage(newResponse);
      this.res.end();
  } else if(request.text && /.*comedy_bot.*$/.test(request.text)){
      this.res.writeHead(200);
      var newResponse = "Y'know, comedy_bot...we're not so different, you and I...";
      postMessage(newResponse);
      this.res.end();
  } else if(request.text && /.*frimmy_bot.*$/.test(request.text)){
      this.res.writeHead(200);
      var newResponse = "NOOO...I only wanted to learn this thing humans call: \"love\"...";
      postMessage(newResponse);
      this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(newResponse) {
  var botResponse, options, body, botReq;

  if(!newResponse){
    botResponse = cool();
  }else{
    botResponse = newResponse;
  }

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;