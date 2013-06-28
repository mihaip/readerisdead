function main() {
  loadSubscriptions();
}

function loadSubscriptions() {
  fetchData('data/subscriptions.json', function(subscriptionsJson) {
    fetchData('data/tags.json', function(tagsJson) {
      buildTree(subscriptionsJson, tagsJson);
    });
  });
}

function fetchData(path, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/archive/' + path, true);
  xhr.onload = function() {
    callback(JSON.parse(xhr.responseText));
  };
  xhr.send();
}

function buildTree(subscriptionsJson, tagsJson) {
  var rootItem = new TreeItem('');

  // Seeed the list with all tags, and remove those that are used by
  // subscriptions.
  var tagsByStreamId = {};
  for (var i = 0; i < tagsJson.length; i++) {
    tagsByStreamId[tagsJson[i]['stream_id']] = 1;
  }

  var subscriptionsByInsertStreamId = {};
  for (var i = 0; i < subscriptionsJson.length; i++) {
    var subscriptionJson = subscriptionsJson[i];
    var insertStreamIds = subscriptionJson['insert_stream_ids'];
    for (var j = 0; j < insertStreamIds.length; j++) {
      var insertStreamId = insertStreamIds[j];
      if (!(insertStreamId in subscriptionsByInsertStreamId)) {
        subscriptionsByInsertStreamId[insertStreamId] = [];
      }
      subscriptionsByInsertStreamId[insertStreamId].push(subscriptionJson);
      delete tagsByStreamId[insertStreamId];
    }
  }

  for (var insertStreamId in subscriptionsByInsertStreamId) {
    var insertStreamItem = new TreeItem(insertStreamId);
    rootItem.addChild(insertStreamItem);
    var subscriptionsJsonForInsertStream =
        subscriptionsByInsertStreamId[insertStreamId];
    for (var i = 0; i < subscriptionsJsonForInsertStream.length; i++) {
      var subscriptionJson = subscriptionsJsonForInsertStream[i];
      var subscriptionItem = new TreeItem(subscriptionJson['title']);
      insertStreamItem.addChild(subscriptionItem);
    }
  }

  // Remaining tags are item-level tags.
  var tagsItem = new TreeItem('tags');
  rootItem.addChild(tagsItem);
  for (var tagStreamId in tagsByStreamId) {
    tagsItem.addChild(new TreeItem(tagStreamId));
  }

  document.getElementById('tree').appendChild(rootItem.renderToNode());
}

function TreeItem(title) {
  this.title_ = title;
  this.children_ = [];
}

TreeItem.prototype.addChild = function(child) {
  this.children_.push(child);
};

TreeItem.prototype.renderToNode = function() {
  var node = document.createElement('li');
  node.appendChild(document.createTextNode(this.title_));
  if (this.children_.length) {
    var childrenNode = document.createElement('ul');
    node.appendChild(childrenNode);
    for (var i = 0; i < this.children_.length; i++) {
      childrenNode.appendChild(this.children_[i].renderToNode());
    }
  }
  return node;
};

main();
