// https://github.com/Turfjs/turf/pull/986
function typescriptExport () {
  return {
    name: 'typescript-export',
    transformBundle (code) {
      code = code.trim()
      const name = code.match(/module.exports = (\w+)/)
      if (name) code += `\nmodule.exports.default = ${name[1]};\n`
      return code
    }
  }
}

export default {
  input: 'index.js',
  output: {
    extend: true,
    file: 'main.js',
    format: 'cjs'
  },
  plugins: [typescriptExport()]
}
