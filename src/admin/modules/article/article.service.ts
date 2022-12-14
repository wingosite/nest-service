import { ArticleDto } from '@/dtos';
import { PaginationResultDto, QueryDto } from '@/dtos/page.dto';
import { ArticleEntity } from '@/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
  ) {}
  /**
   * @description 增加文章
   * @author ZiYing
   * @param createArticleDto
   * @returns Article
   */
  async create(createArticleDto: ArticleDto): Promise<ArticleEntity> {
    const { title } = createArticleDto;
    if (!title) {
      throw new HttpException('标题不能为空', HttpStatus.BAD_REQUEST);
    }
    return await this.articleRepository.save(createArticleDto);
  }

  /**
   * @description 查询文章
   * @author ZiYing
   */
  async findAll(query: QueryDto): Promise<PaginationResultDto> {
    const { limit, pageNum, search } = query;
    const skipCount = (pageNum - 1) * limit;
    const [data, totalCount] = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.title LIKE :title', {
        title: search ? `%${search}%` : '%',
      })
      .orWhere('article.categories LIKE :categories', {
        categories: search ? `%${search}%` : '%',
      })
      .orderBy('article.update_date', 'DESC')
      .skip(skipCount)
      .limit(limit)
      .getManyAndCount();
    return {
      totalCount,
      data,
    };
  }

  /**
   * 通过ID查询文章的信息
   * @param id 文章ID
   * @returns
   */
  async findById(id: string): Promise<ArticleEntity> {
    const exitsArticle = await this.articleRepository.findOneBy({ id });
    if (!exitsArticle) {
      throw new HttpException('文章不存在', HttpStatus.NOT_FOUND);
    }
    return exitsArticle;
  }

  /**
   * @description 编辑文章
   * @author ZiYing
   * @param id  文章ID
   * @param updateArticleDto 文章参数
   */
  async updateArticle(id: string, updateArticleDto: ArticleDto) {
    const exitsArticle = await this.articleRepository.findOneBy({ id });
    if (!exitsArticle) {
      throw new HttpException('文章不存在', HttpStatus.NOT_FOUND);
    }
    const result = await this.articleRepository.merge(
      exitsArticle,
      updateArticleDto,
    );
    return await this.articleRepository.save(result);
  }

  /**
   * @description 删除文章
   * @author ZiYing
   * @param id 文章ID
   */
  async deleteArticle(id: string) {
    const exitsArticle = await this.articleRepository.findOneBy({ id });
    if (!exitsArticle) {
      throw new HttpException('文章不存在', HttpStatus.NOT_FOUND);
    }
    return await this.articleRepository.remove(exitsArticle);
  }

  /**
   *
   * @param ids 批量删除文章
   * @returns
   */
  async deleteManyArticle(ids: string) {
    return '批量删除';
  }
}
