
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
 * @return {Emitter} tabs
 * @api public
 */

function tabify (el) {
  var links = []
  var targets = []
  var prev = null

  var emitter = Emitter({})

  // find tab links
  var res = el.querySelectorAll('a')

  for (var i = 0; i < res.length; i++) {
    var a = res[i]
    links.push(a)

    var id = a.attributes.href.textContent.split('#')[1]

    var target = document.getElementById(id)
    targets.push(target)

    a.__targetId = id
    a.__target = target

    // make the first one active by default

    if (i == 0) {
      a.classList.add('active')
      prev = a
    }
    else {
      target.classList.add('hide')
    }

    // assign onclick handler

    a.onclick = function (ev) {
      // don't do the default (jump to anchor)
      ev.preventDefault()
      ev.stopPropagation()

      // only emit if changed
      if (prev !== this) {
        emitter.emit('change', this.__targetId, this.__target, this)
      }
      prev = this

      // change classes for new active

      links.forEach(function (a) {
        a.classList.remove('active')
      })
      targets.forEach(function (t) {
        t.classList.add('hide')
      })
      this.classList.add('active')
      this.__target.classList.remove('hide')

      return false
    }
  }

  return emitter
}
