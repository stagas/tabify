
/*!
 *
 * tabify
 *
 * MIT licence
 *
 */

/**
 * Module dependencies.
 */

var Emitter = require('emitter')

/**
 * Exports.
 */

module.exports = tabify

/**
 * Convert a list to tabs.
 *
 * @param {Element} el
 * @return {Object} tabs
 * @api public
 */

function tabify (el) {
  var links = []
  var targets = []

  var tabs = {}

  Emitter(tabs)

  /**
   * Show tab of link `el`.
   *
   * @param {Element} el
   * @api private
   */

  tabs.show = function (el) {
    el.classList.add('active')
    el.__target.classList.remove('hide')
    tabs.active = el
    tabs.activeTarget = el.__target
    tabs.activeTargetId = el.__targetId
  }

  /**
   * Hide tab of link `el`.
   *
   * @param {Element} el
   * @api private
   */

  tabs.hide = function (el) {
    el.classList.remove('active')
    el.__target.classList.add('hide')
  }

  /**
   * Hide all tabs.
   *
   * @api private
   */

  tabs.hideAll = function () {
    // change classes for new active
    links.forEach(function (a) {
      a.classList.remove('active')
    })
    targets.forEach(function (t) {
      t.classList.add('hide')
    })
  }

  /**
   * Unbind all listeners.
   *
   * @api public
   */

  tabs.unbind = function () {
    links.forEach(function (a) {
      console.log('removing listener...')
      a.removeEventListener('click', tabs.onclick)
    })
    tabs.removeAllListeners('change')
  }

  /**
   * onclick listener.
   *
   * @param {Event} ev [description]
   * @api private
   */

  tabs.onclick = function (ev) {
    // don't do the default (jump to anchor)
    ev.preventDefault()
    ev.stopPropagation()

    // only emit if changed
    if (tabs.active !== this) {
      tabs.emit('change', this.__targetId, this.__target, this)
      tabs.show(this)
    }

    tabs.hideAll()
    tabs.show(this)

    return false
  }

  // find tab links
  var res = el.querySelectorAll('a')
  var active = el.querySelectorAll('a.active')[0]

  // make tabs
  for (var i = 0; i < res.length; i++) {
    var a = res[i]
    var id = a.attributes.href.textContent

    var target = document.getElementById(id.substr(1))
    if (!target) continue

    links.push(a)
    targets.push(target)

    a.__target = target
    a.__targetId = id

    if (active ? a === active : i == 0) tabs.show(a)
    else tabs.hide(a)

    a.addEventListener('click', tabs.onclick)
  }

  return tabs
}
