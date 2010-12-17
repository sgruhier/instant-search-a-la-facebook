$(function() {
  var cache = [];
    
  // Cache element, name and container
  $(".name").each(function() {
    var elt = $(this);
    cache.push({element: elt[0], name: elt.html(), container: elt.parents("li")[0]})
  });
  
  var selecteds = new Array(cache.length), nbSelected = 0;
  
  // Reset names and CSS display attribute
  function reset() {
    if (!selecteds) {
      return;
    }
    for (var i = 0; i < nbSelected; i++) {
      var item = selecteds[i];
      item.element.innerHTML = item.name;
    };
    for (var i = 0, length = cache.length; i < length; i++) {
      cache[i].container.style.display = "block";
    }
  }
  $("#filter").focus();
  
  // Observe key press
  $("#filter").keyup(function() {
    reset();
    
    // Find matching names (case insensitive)
    var regexp = new RegExp(this.value, "i");
    nbSelected = 0;
    for (var i = 0, length = cache.length; i < length; i++) {
      var item = cache[i];
      text = item.name.match(regexp);
      // No match, hide the element
      if (!text) {
        item.container.style.display = "none";
      } 
      // Match, hilight matching text and add it in selecteds array
      else {
        item.element.innerHTML = item.name.replace(text, "<span>" + text + "</span>");
        selecteds[nbSelected++] = item;
      }
    }
  })
})

//http://www.skorks.com/2009/07/how-to-write-a-name-generator-in-ruby/