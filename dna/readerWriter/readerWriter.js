/*******************************************************************************
 * Utility functions
 ******************************************************************************/

function genesis() {
  return true
}

function holoTextWrite(text) {
  return commit('holoText', text)
}

function holoTextRead(hash) {
  return get(hash, { Local: true })
}

function holoTextReadFromDHT(hash) {
  return get(hash)
}

function validateText(text) {
  return text.length <= 140
}

function validateCommit(entry_type, entry) {
  return validateText(entry)
}

function validatePut(entry_type, entry) {
  return validateText(entry)
}