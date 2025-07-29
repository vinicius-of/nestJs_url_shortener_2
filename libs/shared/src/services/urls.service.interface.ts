import { Url } from '../contracts';
import {
    RedirectViaShortUrlDto,
    CreateUrlDto,
    ListAllUrlDto,
    EditUrlDto,
    RemoveUrlDto,
} from '../dtos';

export interface UrlShortenerService {
    accessShortLink(data: RedirectViaShortUrlDto): Promise<Url>;
    create(data: CreateUrlDto): Promise<Url>;
    listAllUrls(data: ListAllUrlDto): Promise<Url[]>;
    listAllLinksFromUser(data: ListAllUrlDto): Promise<Url[]>;
    update(data: EditUrlDto): Promise<boolean>;
    remove(data: RemoveUrlDto): Promise<boolean>;
}
