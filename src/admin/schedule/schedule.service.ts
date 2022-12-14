import { BAIDU_SEO_SITE, BING_SEO_SITE } from '@/constants';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  // @Cron('45 * * * * *')
  @Cron('10 * * * * *')
  async handleCorn() {
    this.logger.debug('called when second is 10s');
  }

  /**
   * 将文章推送到百度
   * @returns
   */
  async postToBaidu(urls: string[]) {
    const res = await axios({
      method: 'post',
      url: BAIDU_SEO_SITE,
      data: urls.join('\n'),
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new HttpException({ message: '推送失败' }, 400);
    }
  }

  /**
   * 推送到必应
   */
  async postToBing(urls: string[]) {
    const res = await axios({
      method: 'post',
      url: BING_SEO_SITE,
      data: {
        siteUrl: 'https://www.wingosite.site',
        urlList: urls,
      },
    });
    return res.data;
  }
}
