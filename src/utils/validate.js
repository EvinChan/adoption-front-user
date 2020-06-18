//检验手机号
export function validMobile(str) {
  const reg = /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
  return reg.test(str)
}

//检验验证码
export function validVerificationCode(str) {
  const reg = /^\d{6}$/
  return reg.test(str)
}

//检验密码
export function validPwd(str) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  return reg.test(str)
}


//检验真实姓名
export function validRealName(str) {
  const reg = /^[\u4E00-\u9FA5]{2,6}$/
  return reg.test(str)
}

// 检验身份证号
export function validIdcard(str) {
  const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(str)
}

// 检验年龄1-100
export function validAge(str) {
  const reg = /^([1-9]\d?|100)$/
  return reg.test(str)
}
