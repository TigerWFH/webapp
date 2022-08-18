const fs = require('fs');
const OUTPUT_PATH = '/Users/admin/Desktop/target.csv';
fs.readFile('/Users/admin/Desktop/data.json', (err, data) => {
  if (!err) {
    const ret = data.toString();
    const result = JSON.parse(ret);
    if (Array.isArray(result)) {
      let csvData =
        'page_id, page_name, event_type, inner_version, app_identifier\r\n';
      result.forEach((meta) => {
        csvData += `${meta[0]}, ${meta[1]}, ${meta[2]}, ${meta[3]}, ${meta[4]}\r\n`;
      });
      const err = fs.writeFileSync(OUTPUT_PATH, csvData, { encoding: 'utf8' });
      if (err) {
        console.log('json to csv err====>', err);
      } else {
        console.log('json to csv success====>', OUTPUT_PATH);
      }
    } else {
      console.log('result===>非数组');
    }
  }
});
