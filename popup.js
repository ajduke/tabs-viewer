document.addEventListener('DOMContentLoaded', function() {
  var header =  document.getElementById('header')
  var list = document.getElementById('tabs_list')
  chrome.tabs.query({}, function(tabs){
    var all = tabs.map(function(t){
      return {title: t.title, url: t.url, id: t.index, favicon: t.favIconUrl,
        highlighted: t.highlighted}
    })

    var info = all.reduce(function(acc, current) {
      acc += "<li class='"+current.highlighted+"'> <img src='" + current.favicon + "'> <a href='"+ current.url +
            "' data-id='"+current.id +"'>"
            + current.title + "</a> </li>"
      return acc
    }, '')

    header.innerHTML = tabs.length + " active tabs"
    list.innerHTML = info

    document.querySelectorAll('#tabs_list a').forEach(function(elem){
      elem.addEventListener('click', function(e){
        var tab_id =  parseInt(this.getAttribute('data-id'))
        chrome.tabs.highlight({'tabs': tab_id}, function(){})
      })
    })
  })

}, false);
