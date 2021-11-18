<template lang="html">

  <!-- <div class="form-group"> -->
  <div>
    <!-- <label class="text-muted">Using all of the character sets:</label> -->
    <vue-password size="10" auto="true" characters="a-z,A-Z,0-9,#"></vue-password>
  </div>

  <!-- <div class="form-group">
    <label class="text-muted">Using both the a-z and A-Z character sets:</label>
    <vue-password size="24" auto="true" characters="a-z,A-Z"></vue-password>
  </div>

  <div class="form-group">
    <label class="text-muted">Using only the A-Z character set:</label>
    <vue-password size="24" auto="true" characters="A-Z"></vue-password>
  </div>

  <div class="form-group">
    <label class="text-muted">Using only the a-z character set:</label>
    <vue-password size="24" auto="true" characters="a-z"></vue-password>
  </div>

  <div class="form-group">
    <label class="text-muted">Using only the number character set:</label>
    <vue-password size="24" auto="true" characters="0-9"></vue-password>
  </div> -->
  <!-- <br /> -->
</template>

<script>
import Vue from 'vue'
Vue.component('vue-password', {
//   template: '<div class="input-group"><span class="input-group-addon"><span class="fa fa-lock"></span></span><input :type="type" class="form-control" :placeholder="placeholder" :value="password" /><span class="input-group-btn"><button type="button" class="btn btn-primary" @click="generate()"><span class="fa fa-refresh"></span></button></span></div>',
  template: '<div class="input-group"><span class="input-group-addon"><span class="fa fa-lock"></span></span><input :type="password" class="form-control" :placeholder="placeholder" id="password" :value="password" /></div>',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String,
      default: '32'
    },
    characters: {
      type: String,
      default: 'a-z,A-Z,0-9,#'
    },
    placeholder: {
      type: String,
      default: 'Password'
    },
    auto: [String, Boolean],
    value: ''
  },
  data: function () {
    return {
      password: this.value
    }
  },
  mounted: function () {
    if (this.auto === 'true' || this.auto === 1) {
      this.generate()
    }
  },
  methods: {
    generate () {
      let charactersArray = this.characters.split(',')
      let CharacterSet = ''
      let password = ''
      if (charactersArray.indexOf('a-z') >= 0) {
        CharacterSet += 'abcdefghijklmnopqrstuvwxyz'
      }
      if (charactersArray.indexOf('A-Z') >= 0) {
        CharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      }
      if (charactersArray.indexOf('0-9') >= 0) {
        CharacterSet += '0123456789'
      }
      if (charactersArray.indexOf('#') >= 0) {
        CharacterSet += '![]{}()%&*$#^<>~@|'
      }
      for (let i = 0; i < this.size; i++) {
        password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length))
      }
      this.password = password
    }
  }
})
export default {
  name: 'passwordgenerator',
  value: this.value,
  data () {
    return {
      value: '',
      password: ''
    }
  },
  methods: {
    generate () {
      let charactersArray = this.characters.split(',')
      let CharacterSet = ''
      let password = ''
      if (charactersArray.indexOf('a-z') >= 0) {
        CharacterSet += 'abcdefghijklmnopqrstuvwxyz'
      }
      if (charactersArray.indexOf('A-Z') >= 0) {
        CharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      }
      if (charactersArray.indexOf('0-9') >= 0) {
        CharacterSet += '0123456789'
      }
      if (charactersArray.indexOf('#') >= 0) {
        CharacterSet += '![]{}()%&*$#^<>~@|'
      }
      for (let i = 0; i < this.size; i++) {
        password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length))
      }
      this.password = password
    }
  }
}
</script>
