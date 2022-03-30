import { parseCmdParams } from '@mxssfd/ts-utils';
/**
 * 获取命令行的参数
 * @param prefix 前缀 --d --f 前缀是"--"
 * @param defaultKey 如果前面没有变量名那么使用默认
 */
export function getParams(prefix = '-', defaultKey = 'default'): ReturnType<typeof parseCmdParams> {
  return parseCmdParams(process.argv.slice(2), prefix, defaultKey);
}
