import chardet from 'chardet'
import iconv from 'iconv-lite'
import { Transform, TransformCallback } from 'stream'

export default class IconvTransform extends Transform {
  private temp: string = ''
  public _transform(chunk: any, encoding: string, callback: TransformCallback) {
    this.temp += chunk
    // TODO temp is too big
    callback()
  }
  public _flush(callback: TransformCallback) {
    const buffer = Buffer.from(this.temp)
    const charset = chardet.detect(buffer)
    let output = buffer.toString()
    if (charset) {
      output =
        typeof charset === 'string'
          ? iconv.decode(buffer, charset as string)
          : iconv.decode(buffer, (charset as chardet.Confidence[])[0].name)
    }
    this.push(output)
    callback()
  }
}
