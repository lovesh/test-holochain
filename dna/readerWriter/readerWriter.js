/*******************************************************************************
 * Utility functions
 ******************************************************************************/

function genesis() {
  return true
}

// Write content
function holoTextWrite(text) {
  var hash = commit('holoText', text);
  var me = App.Key.Hash;
  debug("App key hash is " + me);
  var link_hash = commit("holoLink",{    
    Links: [
      {Base: me, Link: hash, Tag: "holoText"}
    ]
  });
  debug("Link hash is " + link_hash);
  return hash;
}

// Read content from source chain
function holoTextRead(hash) {
  var r = get(hash, { GetMask: HC.GetMask.All });
  debug("Local read for " + hash + " : " + JSON.stringify(r));
  return get(hash, { Local: true })
}

// Read content from DHT 
function holoTextReadFromDHT(hash) {
  var r = get(hash, { GetMask: HC.GetMask.All });
  debug("DHT read for " + hash + " : "+ JSON.stringify(r));
  return get(hash)
}

// Get all links from given base
function getHoloTextLinks(base) {
  debug("base is " + base);
  var links = getLinks(base, "holoText");
  debug(links);
  return links.length;
}

// Get all links from local source chain.
function getAllLinks() {
  var result = query({
    Return: {
      Hashes: true,
      Entries: true,
      GetMask: HC.GetMask.All,
      StatusMask: HC.Status.Live + HC.Status.Deleted + HC.Status.Modified + HC.Status.Rejected
    },
    Constrain: {
      EntryTypes: ["holoLink"]
    }
  });
  debug(result);
  return 0;
}

// Use the anchor mixin
function createAnchorToText(hash) {
  var text = holoTextRead(hash);
  var anchorHash = call("anchors", "anchor", {"anchorType": "holoText", "anchorText": text});
  debug("anchorHash "+ anchorHash);
  return JSON.parse(anchorHash);
}

// Update content
function holoTextUpdate(args) {
  debug("Hash to replace is " + args.replaces.toString());
  var hash = update('holoText', args.newText, args.replaces.toString());
  debug("Update hash is " + hash);
  return hash;
}

function listBridges() {
  debug(JSON.stringify(getBridges()));
  return 0;
}

// Print info about current agent
function introspect() {
  debug(JSON.stringify(App));
  debug(JSON.stringify(App.Agent));
  debug(JSON.stringify(App.Key));
  debug(get(App.Agent.Hash, { GetMask: HC.GetMask.All }));
  debug(get(App.Key.Hash, { GetMask: HC.GetMask.All }));
  return 0;
}

// Update current agent
function updateSelf() {
  debug("Updating self");
  updateAgent({Identity:"lovesh@example.com", Revocation:"testing revocation"});
  return 0;
}

// Get all content stored on local chain
function getAllTexts() {
  var result = query({
    Return: {
      Hashes: true,
      Entries: true,
      Stautus: true,
      GetMask: HC.GetMask.All,
      StatusMask: HC.Status.Live + HC.Status.Deleted + HC.Status.Modified + HC.Status.Rejected
    },
    Constrain: {
      EntryTypes: ["holoText"]
    }
  });
  debug(result);
  return 0;
}

function receive(from, msg) {
  var type = msg.type;
  if (type == "ping") {
    return "Return value from receive"
  }
  return "unknown type"
}

// Asynchronous send:
function asyncPing(message, id) {
  debug("async result of message id " + id + " was: " + JSON.stringify(message))
}

// Sending message to itself
function sendReceiveCheck() {
  send(App.Key.Hash, {type: "ping"}, {Callback: { Function: "asyncPing", ID:"123"}});
  return 0;
}

// All text should be less than or equal to 140 chars
function validateText(text) {
  return text.length <= 140
}

function validateCommit(entry_type, entry) {
  if (entry_type == 'holoText') 
    return validateText(entry)
  return true;
}

function validatePut(entry_type, entry) {
  if (entry_type == 'holoText') 
    return validateText(entry)
  return true;
}

function validateLink() {
  // This function is neccessary for links to work
  return true;
}

function validateMod() {
  // This function is neccessary for updates to work
  return true;
}