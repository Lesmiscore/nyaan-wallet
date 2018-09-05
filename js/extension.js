/*
    Monya - The easiest cryptocurrency wallet
    Copyright (C) 2017-2018 MissMonacoin

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
const storage = require("./storage.js")

const extensions = {}

exports.get = extId => {
  return extensions[extId]
}

exports.each = (fn) => {
  for (let extName in extensions) {
    if (extensions[extName] && extensions[extName].id) {
      fn(extensions[extName])
    }
  }
}

exports.extStorage = (extId) => ({
  set: (key, data) => storage.get("extData").then(d => {
    if (!d) {
      d = {}
    }
    if (!d[extId]) {
      d[extId] = {}
    }
    d[extId][key] = data
    storage.set("extData", d)
  }),
  get: key => storage.get("extData").then(d => {
    if (!d) {
      return null
    }
    if (!d[extId]) {
      return null
    }
    return d[extId][key]
  })
})