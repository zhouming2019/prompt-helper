const fs = require('fs');
const path = require('path');
const PNG2Icons = require('png2icons');

// 源图标路径
const sourcePng = path.join(__dirname, '../resources/icon.png');
// 输出目录
const outputDir = path.join(__dirname, '../resources');

// 读取源PNG文件
const pngBuffer = fs.readFileSync(sourcePng);

// 生成ICO文件
const icoData = PNG2Icons.createICO(pngBuffer, PNG2Icons.BILINEAR, 0, false, true);
if (icoData) {
  fs.writeFileSync(path.join(outputDir, 'icon.ico'), icoData);
  console.log('✓ Generated icon.ico');
}

// 生成ICNS文件
const icnsData = PNG2Icons.createICNS(pngBuffer, PNG2Icons.BILINEAR, 0);
if (icnsData) {
  fs.writeFileSync(path.join(outputDir, 'icon.icns'), icnsData);
  console.log('✓ Generated icon.icns');
}

console.log('Icon generation completed!'); 