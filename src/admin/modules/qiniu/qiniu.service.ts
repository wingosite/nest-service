import { ACCESS_KEY, BUCKET_KEY, SECRET_KEY } from '@/constants';
import { Injectable } from '@nestjs/common';
import * as qiniu from 'qiniu';
@Injectable()
export class QiniuService {
  async getImageList() {
    const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
    const config = new qiniu.conf.Config();
    const options = {
      prefix: 'uploads',
    };
    const bucketManager = new qiniu.rs.BucketManager(mac, config);
    return new Promise((resolve) => {
      bucketManager.listPrefix(
        BUCKET_KEY,
        options,
        function (err, respBody, respInfo) {
          if (err) {
            console.log(err);
          }
          if (respInfo.status === 200) {
            const data =
              respBody.items.length &&
              respBody.items.map((item) => {
                return {
                  path: item.key,
                  name: item['x-qn-meta'].name,
                  size: item.fsize,
                  mimeType: item.mimeType,
                };
              });
            resolve(data);
          }
        },
      );
    });
  }
}
