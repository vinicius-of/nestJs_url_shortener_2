import { Url } from '../contracts';
import { RedirectViaShortUrlDto, CreateUrlDto, EditUrlDto, RemoveUrlDto } from '../dtos';

export interface IUrlsService {
    accessShortLink(data: RedirectViaShortUrlDto): Promise<Url>;
    create(data: CreateUrlDto, userId?: string): Promise<Url>;
    listAllUrls(userId: string): Promise<Url[]>;
    update(data: EditUrlDto, userId: string): Promise<boolean>;
    remove(data: RemoveUrlDto, userId: string): Promise<boolean>;
}
