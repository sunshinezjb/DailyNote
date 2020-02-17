// 2.1 省级地址码校验
// 华北：北京11，天津12，河北13，山西14，内蒙古15

// 东北： 辽宁21，吉林22，黑龙江23

// 华东： 上海31，江苏32，浙江33，安徽34，福建35，江西36，山东37

// 华中： 河南41，湖北42，湖南43

// 华南： 广东44，广西45，海南46

// 西南： 四川51，贵州52，云南53，西藏54，重庆50

// 西北： 陕西61，甘肃62，青海63，宁夏64，新疆65

// 特别：台湾71，香港81，澳门82

// 根据上述地址码做身份证号码的前两位校验，进一步的提高准确率。当前的地址码以2013版的行政区划代码【GB/T2260】为标准。由于区划代码的历史演变，使得地址码后四位校验变得不太可能。以三胖的身份证号为例，本人号码是2321开头，而当前行政区划代码表中并无此代码。因此本文只做前两位省级地址码的校验。

// 也有说法表述91开头是外国人取得中国身份证号码的前两位编码，但本人并未得到证实。如有持91开头身份证或认识马布里的，请帮忙确认相关信息。

// 根据以上分析，给出省级地址码校验及测试程序如下：
var checkProv = function (val) {
    var pattern = /^[1-9][0-9]/;
    var provs = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门" };
    if (pattern.test(val)) {
        if (provs[val]) {
            return true;
        }
    }
    return false;
}
//输出 true，37是山东
console.log(checkProv(37));
//输出 false，16不存在

// 2.2 出生日期码校验
// 出生日期码的校验不做解释，直接给出如下函数及测试程序：
var checkDate = function (val) {
    var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if (pattern.test(val)) {
        var year = val.substring(0, 4);
        var month = val.substring(4, 6);
        var date = val.substring(6, 8);
        var date2 = new Date(year + "-" + month + "-" + date);
        if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
            return true;
        }
    }
    return false;
}
//输出 true
console.log(checkDate("20180212"));
//输出 false 2月没有31日
console.log(checkDate("20180231"));

// 2.3 校验码校验
// 校验码的计算略复杂，先给出如下公式：

// 校验码公式

// 其中 ai 表示身份证本体码的第 i 位值，而 Wi 表示第 i 位的加权因子值。

// 加权因子表 【表1】：
// i	1	2	3	4	5	6	7	8
// Wi	7	9	10	5	8	4	2	1
// 9	10	11	12	13	14	15	16	17
// 6	3	7	9	10	5	8	4	2
// X与校验码换算表 【表2】
// X	0	1	2	3	4	5	6	7	8	9	10
// a18	1	0	X	9	8	7	6	5	4	3	2
// 算法过程：
// 根据身份证主体码（前17位）分别与对应的加权因子（表1）计算乘积再求和，根据所得结果与11取模得到X值。
// 根据 X 值查询表2，得出a18即校验码值。

// 校验码计算程序及测试见如下代码：
var checkCode = function (val) {
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var code = val.substring(17);
    if (p.test(val)) {
        var sum = 0;
        for (var i = 0; i < 17; i++) {
            sum += val[i] * factor[i];
        }
        if (parity[sum % 11] == code.toUpperCase()) {
            return true;
        }
    }
    return false;
}
// 输出 true， 校验码相符
console.log(checkCode("11010519491231002X"));
// 输出 false， 校验码不符
console.log(checkCode("110105194912310021"));

// 2.4 方案2整体代码
var checkID = function (val) {
    if (checkCode(val)) {
        var date = val.substring(6, 14);
        if (checkDate(date)) {
            if (checkProv(val.substring(0, 2))) {
                return true;
            }
        }
    }
    return false;
}
//输出 true
console.log(checkID("11010519491231002X"));
//输出 false，校验码不符
console.log(checkID("110105194912310021"));
//输出 false，日期码不符
console.log(checkID("110105194902310026"));
//输出 false，地区码不符
console.log(checkID("160105194912310029"));






