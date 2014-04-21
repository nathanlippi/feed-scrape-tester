var _      = require("underscore");
var qs     = require("querystring");
var url    = require('url');
var shared = require('./shared');

exports.index = function(req, res)
{
  var url_params = shared.combineUrlParamsWithDefaults(req);
  var render_obj = shared.getRenderObj(req);

  var loadTimePage = url_params.type === "feed" ?
    url_params.feedLoadTimePage :
    url_params.itemLoadTimePage;

  var title    = "Help page";
  var toRender = "help";

  if(url_params.type === "feed")
  {
    if(url_params.feedIsStatic == 1) {
      title = "Feed, static";
      toRender = "feed_static";
    }
    else {
      title    = "Feed, ajax";
      toRender = "feed_ajax";
    }
  }
  else if(url_params.type === "item")
  {
    if(url_params.itemIsStatic == 1) {
      title    = "Item, static";
      toRender = "item_static";
    }
    else {
      title    = "Item, ajax";
      toRender = "item_ajax";
    }
  }

  setTimeout(function() {
    render_obj.title = title;
    return res.render(toRender, render_obj);
  }, loadTimePage);
};
