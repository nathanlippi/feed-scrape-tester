APP           = {};
APP.SELECTORS =
{
  PAGE_JSON: "#page_json_data",
  ITEM: {
    AREA: "#item_area"
  },
  FEED: {
    AREA: "#feed_area"
  }

};

APP.helpers = {
  get_page_json: function() {
    var json = $(APP.SELECTORS.PAGE_JSON).text();
    json     = $.parseJSON(json);

    return json;
  },
  ajax: {
    get_filling_url: {
      current: function() {
        var json = APP.helpers.get_page_json();
        var url  = json.url.base+"filling/?"+json.url.qs.current;
        return url;
      },
      next: function() {
        var json = APP.helpers.get_page_json();
        // TODO: Should not be feed.next? However 'next' is not needed for
        // 'item', so maybe this is okay for now.
        var url  = json.url.base+"filling/?"+json.url.qs.feed.next;
        return url;
      }
    },
    put_filling_in_selector: function(selector, isNext)
    {
      if(typeof isNext !== "boolean") {
        isNext = false;
      }

      var url = APP.helpers.ajax.get_filling_url.current();
      if(isNext) {
        url = APP.helpers.ajax.get_filling_url.next();
      }

      $.get(url, function(data) {
        data = $.parseJSON(data);

        $(APP.SELECTORS.PAGE_JSON).html(data.json);
        $(selector).html(data.filling);
      });
    },
    item: {
      put_filling: function(isNext) {
        APP.helpers.ajax.put_filling_in_selector(APP.SELECTORS.ITEM.AREA);
      }
    },
    feed: {
      put_filling: function(isNext) {
        APP.helpers.ajax.put_filling_in_selector(
          APP.SELECTORS.FEED.AREA, isNext);
      }
    }
  }
};
