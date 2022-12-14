export class QiniuDto {
  readonly key: string;

  readonly hash: string;

  readonly fsize: number;

  readonly mimeType: string;

  readonly putTime: string;

  readonly md5: string;

  readonly type: number; // 0 低频存储 1 归档存储 3 深度归档储存

  readonly status: number; // 0 启用 1 禁用
}
