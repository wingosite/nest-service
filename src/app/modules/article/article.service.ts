import { PaginationResultDto, QueryDto } from '@/dtos/page.dto';
import { ArticleEntity } from '@/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
  ) {}

  /**
   * 获取所有文章
   * @returns
   */
  async getList() {
    return await this.articleRepository.find();
  }

  /**
   * 获取最新的10条数据
   * @returns
   */
  async getLatest() {
    return await this.articleRepository
      .createQueryBuilder('article')
      .limit(10)
      .getMany();
  }

  /**
   * 获取推荐的文章
   * @returns
   */
  async getRecommendList() {
    return await this.articleRepository
      .createQueryBuilder('article')
      .where('article.isRecommend=:value', { value: true })
      .limit(10)
      .getMany();
  }

  /**
   * 根据文章ID获取文章内容
   * @param id 文章ID
   */
  async getArticleById(id: string) {
    const exitsArticle = await this.articleRepository.findOneBy({ id });
    if (!exitsArticle) {
      throw new HttpException('文章不存在', HttpStatus.NOT_FOUND);
    }
    return exitsArticle;
  }

  /**
   * 根据文章标签获取数据 -- 分页
   * */
  async getArticleByTagName(query: QueryDto): Promise<PaginationResultDto> {
    const { search, limit, pageNum } = query;
    const skipCount = (pageNum - 1) * limit;
    const [data, totalCount] = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.categories LIKE :value', {
        value: search ? `%${search}%` : '%',
      })
      .skip(skipCount)
      .limit(limit)
      .getManyAndCount();
    return {
      totalCount,
      data,
    };
  }
}
