// 工具函数·数据判断类is X：形容词词性
const opt = Object.prototype.toString
export function isString(obj: any): obj is string {
  return opt.call(obj) === '[object String]'
}

export function isX() {
  return true
}
