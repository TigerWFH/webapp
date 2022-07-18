const fs = require('fs');

/*
字段：
    id：自增序号
    realname：真实姓名
    gender：性别
    birth: 出生日期,
    idcard_type：证件类型，{身份证，驾驶证，护照}
    idcard：证件号码,
    blood_type: 血型，
    edu: 受教育程度，{中专、大专、本科、硕士研究生、博士研究生}
    edu_place：毕业院校,

    phone: 手机号,
    home: 户籍所在地,扩展表
    home2: 现居住地,扩展表
    corp：公司名称
    corp_depart：所在部门

主要换行有三种：
CR换行符，Carriage Return，转义字符\r，十六进制0x0D，用于Commodore 8位机、TRS-80、苹果II家族、Mac OS 9及更早版本
LF换行符，Line Feed，转义字符\n，十六进制是0x0A，用于Multics、Unix、类Unix（如GNU/Linux、AIX、Xenix、Mac OS X、FreeBSD等）、BeOS、Amiga、RISC OS等操作系统中。
CRLF换行符，转义字符\r\n，用于DEC TOPS-10、RT-11和其他早期的非Unix，以及CP/M、MP/M、DOS（MS-DOS、PC-DOS等）、Atari TOS、OS/2、Microsoft Windows、Symbian OS、Palm OS等系统中。

一般操作系统上的运行库会自动决定文本文件的换行格式：程序在Windows上运行就生成CRLF换行格式的文本文件，
而在Linux上运行就生成LF格式换行的文本文件。因此，当我们在Windows系统上编辑文本文件时，
敲下“enter”键或者写入“\n”，系统会经过一个隐式的转换，将“\n”转换成“\r\n”再写入文件，
反过来当我们对文件进行读取时，系统又会进行一个隐式的转换，将读取到的“\r\n”转换为“\n”输出。

*/
fs.readFile(
  '/Users/monkey/Downloads/资源/数据/shga_sample_750k/person_info.json',
  (err, data) => {
    if (!err) {
      const ret = data.toString();
      const tmp = ret.replace(/"PHOTO":"\{".+QUERY_STRING/g, '"QUERY_STRING');
      const list = tmp.split('\n');
      const tmpTarget = list.map((line) => {
        const regexp = /\{"AGE".+},"_type"/gm;
        const result = regexp.exec(line);
        if (result) {
          const ret = result[0].replace(',"_type"', '');
          return ret;
        }

        return '';
      });
      const target = [];
      const step = 1000;
      // 260000
      for (let i = 0; i < 250; i++) {
        tmpTarget.slice(i * step, step * (i + 1));
        target.push(tmp);
      }
      target.forEach((tmpList, index) => {
        console.log('tmpList');
        const content = `[${tmpList.join(',')}]`;
        fs.writeFileSync(
          `/Users/monkey/Desktop/targets/target_${index}.json`,
          content,
          (err) => {
            if (err) {
              console.log('err===>', err);
            }
          }
        );
      });
    }
  }
);
