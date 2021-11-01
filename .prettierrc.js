module.exports = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,

  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',

  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,

  // 末尾不需要逗号
  trailingComma: 'none',

  // 大括号内的首尾需要空格
  bracketSpacing: true,

  // 标签的反尖括号需要换行
  bracketSameLine: false,

  // 箭头函数，只有一个参数的时候，无需括号
  arrowParens: 'avoid',

  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,

  rangeEnd: Infinity,

  // 不需要写文件开头的 @prettier
  requirePragma: false,

  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,

  // 使用默认的折行标准
  proseWrap: 'preserve',

  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',

  // 换行符使用 lf
  endOfLine: 'lf',
  overrides: [
    {
      files: ['*.wxss', '*.acss'],
      options: {
        parser: 'css'
      }
    },
    {
      files: ['*.wxml', '*.axml'],
      options: {
        parser: 'html'
      }
    },
    {
      files: ['*.wxs', '*.sjs'],
      options: {
        parser: 'babel'
      }
    }
  ]
}
