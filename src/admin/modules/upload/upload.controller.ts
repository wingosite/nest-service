import { ACCESS_KEY, BUCKET_KEY, SECRET_KEY } from '@/constants';
import {
  Controller,
  HttpException,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as md5 from 'md5';
import * as qiniu from 'qiniu';

@Controller('upload')
export class UploadController {
  @ApiTags('工具接口')
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '上传文件', description: '上传文件接口' })
  async upload(@UploadedFile() file: Express.Multer.File) {
    const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: BUCKET_KEY,
    });
    const uploadToken = putPolicy.uploadToken(mac);
    const putExtra = new qiniu.form_up.PutExtra();
    const fileName = Buffer.from(file.originalname, 'latin1').toString('utf-8');
    putExtra.metadata = {
      'x-qn-meta-name': fileName,
    };
    const formUploader = new qiniu.form_up.FormUploader(
      new qiniu.conf.Config({
        zone: qiniu.zone.Zone_z2,
      }),
    );

    // 上传到指定的文件夹,在路径前面加上文件夹名称
    return new Promise((resolve) => {
      formUploader.put(
        uploadToken,
        this.getFileName(fileName),
        file.buffer,
        putExtra,
        function (respErr, respBody, respInfo) {
          if (respErr) {
            throw new HttpException({ message: respErr.message }, 400);
          }
          if (respInfo.statusCode === 200) {
            resolve({
              url: respBody.key,
            });
          } else {
            throw new HttpException({ message: respInfo }, 400);
          }
        },
      );
    });
  }

  /**
   * 格式化文件名
   * @param filename 文件名
   * @returns
   */
  getFileName(filename: string) {
    const fileSplit = filename.split('.');
    const format = fileSplit[fileSplit.length - 1];
    return `uploads/${md5(filename)}.${format}`;
  }
}
