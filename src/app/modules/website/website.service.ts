import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppWebsiteService {
  // constructor() { }

  /**
   * 获取必应每日一图
   */
  async getBingImage() {
    try {
      const url = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';
      const result = await axios.get(url);
      const {
        images: [data],
      } = result.data;
      if (result.status === 200) {
        return {
          url: `https://cn.bing.com${data.url}`,
          title: data.title,
          startdate: data.startdate,
          enddate: data.enddate,
        };
      }
    } catch (error) {
      throw new HttpException({ message: '获取失败' }, 400);
    }
  }
}
