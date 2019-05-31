import XLSX from 'xlsx';

function exportExcel(headers, data, fileName = '数据表.xlsx') {
  const _headers = headers
    .map((item, i) => Object.assign({}, { kdataIndexey: item.dataIndex, title: item.title, position: String.fromCharCode(65 + i) + 1 }))
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { dataIndex: next.dataIndex, v: next.title } }), {});
  const _data = data
    .map((item, i) => headers.map((key, j) => Object.assign({}, { content: item[key.dataIndex], position: String.fromCharCode(65 + j) + (i + 2) })))
    // 对刚才的结果进行降维处理（二维数组变成一维数组）
    .reduce((prev, next) => prev.concat(next))
    // 转换成 worksheet 需要的结构
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});

  // 合并 headers 和 data
  const output = Object.assign({}, _headers, _data);
  // 获取所有单元格的位置
  const outputPos = Object.keys(output);
  // 计算出范围 ,["A1",..., "H2"]
  const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;
  const widthArray = headers.map(item => {return {"wpx": 100}})
  const heightArray = data.map(item => {return {"hpx": 25}})
  // 构建 workbook 对象
  const wb = {
    SheetNames: ['mySheet'],
    Sheets: {
      mySheet: Object.assign(
        {},
        output,
        {
          '!ref': ref,
          '!cols': widthArray,
          '!rows': [{ hpx: 25 }, ...heightArray]
        },
      ),
    },
  };

  // 导出 Excel
  XLSX.writeFile(wb, fileName);
}
export default exportExcel;