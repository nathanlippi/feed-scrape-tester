var _      = require("underscore");
var shared = require('./shared');

module.exports = function(req, res)
{
  var url_params = shared.combineUrlParamsWithDefaults(req);
  var loadTime   = url_params.type === "feed" ?
    url_params.feedLoadTimeAjax :
    url_params.itemLoadTimeAjax;

  if(url_params.type !== "feed" && url_params.type !== "item") {
    return res.send("type should be [item | feed]");      
  }

  setTimeout(function() {
    var render_obj = shared.getRenderObj(req);

    res.render(url_params.type+"_"+"filling", render_obj, function(err, html) {
      var obj = JSON.stringify(
        { filling : html,
          json    : render_obj.stringified });

      res.send(obj);
    });
  }, loadTime);
};
