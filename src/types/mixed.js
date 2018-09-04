const yup = require('yup')

class YupMixed {
  constructor({
    key,
    value,
    config
  }) {
    this.yup = yup
    this.key = key
    this.value = value
    this.format = value.format
    this.config = config || {}
    this.type = 'mixed'
    this.base = yup[this.type]()
  }

  yupped() {
    return this.convert().base
  }

  convert() {
    this.required().enum().oneOf()
  }

  required() {
    this.value.required && this.base.required(this.errMessage['required'])
    return this
  }

  oneOf() {
    const {
      oneOf
    } = this.value
    const $oneOf = this.value.enum || oneOf
    return $oneOf && this.base.oneOf($oneOf, this.errMessages['oneOf'] || this.errMessages['enum'])
    return this
  }

  notOneOf() {
    const {
      not
    } = this.value
    const $oneOf = not.enum || not.oneOf
    return $oneOf && this.base.notOneOf($oneOf, this.errMessages['notOneOf'])
    return this
  }

  $const() {
    this.value.const
    return this
  }

  // boolean
  // https: //ajv.js.org/keywords.html#allof
  $allOf() {
    return this
  }

  // https://ajv.js.org/keywords.html#anyof
  $anyOf() {
    return this
  }

  // https: //ajv.js.org/keywords.html#oneof
  $oneOf() {
    return this
  }

  // conditions

  // https://ajv.js.org/keywords.html#not
  $not() {
    return this
  }

  $if() {
    return this
  }

  $then() {
    return this
  }

  $else() {
    return this
  }

  message() {
    return config.messages[this.key] || config.messages[this.type] || {}
  }

  errMessage(errKey = 'default') {
    return this.message[errKey] || 'error'
  }

  normalize() {}
}

module.exports = {
  YupMixed
}