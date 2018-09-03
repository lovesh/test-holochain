/*******************************************************************************
 * Utility functions
 ******************************************************************************/

function genesis() {
  return true
}

function holoTextWrite(text) {
  var hash = commit('holoText', text);
  var me = App.Key.Hash;
  debug("App key hash is" + me);
  var link_hash = commit("holoLink",{    
    Links: [
      {Base: me, Link: hash, Tag: "holoText"}
    ]
  });
  debug("Link hash is" + link_hash);
  return hash;
}

function holoTextRead(hash) {
  var r = get(hash, { GetMask: HC.GetMask.All });
  debug(r);
  return get(hash, { Local: true })
}

function holoTextReadFromDHT(hash) {
  var r = get(hash, {StatusMask: HC.Status.Default });
  debug(r);
  return get(hash)
}

function getHoloTextLinks(base) {
  debug("base is " + base);
  var links = getLinks(base, "holoText");
  debug(links);
  return links.length;
}

function getAllLinks(dummy_arg) {
  var result = query({
    Return: {
      Hashes: true,
      Entries: true
    },
    Constrain: {
      EntryTypes: ["holoLink"]
    }
  });
  debug(result);
  return 0;
}

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