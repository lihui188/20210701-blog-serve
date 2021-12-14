var CryptoJS = require("crypto-js")
var aseKey = "sljfeiwofjdkslekksekskcqoskjdskf" //秘钥必须为：8/16/32位
// var message = "lihui18864221514";
//加密
 const encrypt = (pwd) => {
  return CryptoJS.AES.encrypt(pwd, CryptoJS.enc.Utf8.parse(aseKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString()
}
//解密
const decrypt = (encrypt) => {
  return CryptoJS.AES.decrypt(encrypt, CryptoJS.enc.Utf8.parse(aseKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8)
}
module.exports = {
  decrypt
};