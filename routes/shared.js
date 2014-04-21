var _  = require("underscore");
var qs = require("querystring");

var urlParamDefaults = {
  type             : "feed",
  itemId           : 0,
  page             : 0,
  pageMax          : 3,
  itemsPerPage     : 5,
  itemIsStatic     : 1,
  feedIsStatic     : 1,
  itemLoadTimePage : 1000,
  feedLoadTimePage : 1000,
  itemLoadTimeAjax : 1000,
  feedLoadTimeAjax : 1000
};

function combineUrlParamsWithDefaults(req) {
  var urlParams = _.clone(req.query);

  return _.defaults(urlParams, urlParamDefaults);
}
function getBaseUrl(req) {
  var base_url = req.protocol + '://' + req.get('host')+"/";
  return base_url;
}
function getRenderObj(req) {
  var url_params = combineUrlParamsWithDefaults(req);
  var base_url   = getBaseUrl(req);

  var qss                = {};
  qss.feed               = {};
  qss.item               = {};

  qss.item.withoutItemId = _.clone(url_params);
  qss.feed.next          = _.clone(url_params);
  qss.current            = _.clone(url_params);

  qss.item.withoutItemId.type = "item";
  delete qss.item.withoutItemId.itemId;
  qss.feed.next.page++;

  qss.current            = qs.stringify(qss.current);
  qss.feed.next          = qs.stringify(qss.feed.next);
  qss.item.withoutItemId = qs.stringify(qss.item.withoutItemId);

  var urls = {
    base: base_url,
    qs: qss
  };

  var render_obj = {
    query_obj: url_params,
    url: urls
  };
  render_obj.stringified = JSON.stringify(render_obj, undefined, 2);

  return render_obj;
}

var obj = {};
obj.urlParamDefaults             = urlParamDefaults;
obj.combineUrlParamsWithDefaults = combineUrlParamsWithDefaults;
obj.getBaseUrl                   = getBaseUrl;
obj.getRenderObj                 = getRenderObj;

module.exports = obj;
