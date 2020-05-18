var request = require('request'),
    app = require('express')();
		
app.set("port", (process.env.PORT || 3000));
	
// Handle OPTIONS requests
app.options('/rest/api/1.0/*', (req, res) => {
  // Add CORS headers to the response
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "authorization");
  
  res.send();
});
		
// Handle GET requests: https://bitbucket.tcsgroup.ch/rest/api/1.0/projects/NIP/repos/api-design/raw/BOM_TCS.yaml
app.get('/rest/api/1.0/*', (req, res) => {
  "use strict";
	
  // Forward the request through to Bitbucket
  const opts = {
    method: req.method,
    baseUrl: "https://bitbucket.tcsgroup.ch",
    url: req.originalUrl,
    headers: {
      authorization: req.headers.authorization
    }
  };
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "authorization");

  request(opts).pipe(res);
  
});
	
app.listen(app.get("port"));