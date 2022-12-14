import * as fs from 'fs';
import * as path from 'path';

const isProd = process.env.NODE_ENV === 'production';
console.log(process.env.NEST_APP_MYSQL_HOST);
console.log(process.env.NEST_APP_MYSQL_PORT, 'NEST_APP_MYSQL_PORT');
function parseEnv() {
  const localEnv = path.resolve('.env.local');
  const prodEnv = path.resolve('.env');

  if (!fs.existsSync(localEnv) && !isProd) {
    throw new Error('缺少环境配置文件');
  }

  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;
  console.log(filePath, 'filePath');
  return { path: filePath };
}

export default parseEnv();
