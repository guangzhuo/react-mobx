// import IDValidator from 'id-validator';

// 校验是否为空
const isEmpty = (value, msg) => {
  if (value === '') {
    return msg;
  }
}

// 校验昵称格式=>2-50位大小写英文、数字、中文
const isNickFormat =  (value, msg) => {
  const pat = /^[A-Za-z&\d\u4e00-\u9fa5]{2,50}$/;
  if (!pat.test(value)) {
    return msg;
  }
}


// 校验两个值是否相同
const isSame =  (value, msg, oldValue) => {
  if (value !== oldValue) {
    return msg;
  }
}

// 校验统一社会信用代码／纳税人识别号格式=>15、18、20位字符
const isIdentificationNumber =  (value, msg) => {
  const pat = /(^\S{15}$)|(^\S{18}$)|(^\S{20}$)/;
  if (!pat.test(value)) {
    return msg;
  }
}

/* 用id-validator校验身份证号码格式
const isIdcard = (value, msg) => {
  const Validator = new IDValidator();
  if (!Validator.isValid(value)) {
    return msg;
  }
},*/

// 校验是否为正数
const isPositiveNumber = (value, msg) => {
  const pat = /^([1-9]+\d*(\.\d+)?|0\.\d+)$/;
  if (!pat.test(value)) {
    return msg;
  }
}

// 校验是否为正整数
const isPositiveIntNumber = (value, msg) => {
  const pat = /^\+?[1-9][0-9]*$/;
  if (!pat.test(value)) {
    return msg;
  }
}

// 校验是否为整数
const isIntegerIntNumber = (value, msg) => {
  const pat = /^\+?[0-9][0-9]*$/;
  if (!pat.test(value)) {
    return msg;
  }
}

// 校验是否为固话或者移动电话号码
// 固话电话号码格式=>3-4位国家区号-3-4位地址区号-7-8位数字
// 移动电话号码格式=>11位数字、只能以13、14、15、17、18开头
const isTelOrMobile = (value, msg) => {
  if (!value) {return false;}
  const telPat = /^((0\d{2,3}-)?(0\d{2,3}-))?\d{7,8}$/;
  const mobilePat = /^1[34578]\d{9}$/;
  if (!telPat.test(value) && !mobilePat.test(value)) {
    return msg;
  }
}

// 校验手机号
const isMobile = (value, msg) => {
  if (!value) {return;}
  const mobilePat = /^1[3456789]\d{9}$/;
  if (!mobilePat.test(value)) {
    return msg;
  }
}

// 校验推荐码=> 6位数字
const isPhoneCode = (value, msg) => {
  if (!value) {return;}
  const pat = /\d{6}/;
  if (!pat.test(value)) {
    return msg;
  }
}

// 校验推荐码=>４位数字
const isRecomendCode = (value, msg) => {
  if (!value) {return;}
  const pat = /\d{4}/;
  if (!pat.test(value)) {
    return msg;
  }
}

export {
  isEmpty,
  isNickFormat,
  isSame,
  isIdentificationNumber,
  isPositiveNumber,
  isPositiveIntNumber,
  isIntegerIntNumber,
  isTelOrMobile,
  isMobile,
  isPhoneCode,
  isRecomendCode
}
