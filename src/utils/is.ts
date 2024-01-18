const opt = Object.prototype.toString

export function isFailCode(obj: any): boolean {
  return opt.call(obj).startsWith('4') || opt.call(obj).startsWith('5')
}
