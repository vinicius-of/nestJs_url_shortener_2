import { IsNotEmpty, IsUrl, IsUUID, IsString } from 'class-validator';
import { isCleanSlug } from '../decorators/isCleanSlug.decorator';
import { Url } from '../contracts';

export class CreateUrlDto implements Pick<Url, 'fullUrl'> {
    @IsNotEmpty()
    @IsUrl({
        require_valid_protocol: true,
        require_host: true,
        require_tld: true,
        require_protocol: true,
    })
    @IsString()
    @isCleanSlug()
    fullUrl: string;
}

export class ListAllUrlsClicksDto {
    @IsUUID()
    userId: string;
}

export class EditUrlDto {
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsUrl({
        require_valid_protocol: true,
        require_host: true,
        require_tld: true,
        require_protocol: true,
    })
    @IsString()
    @isCleanSlug()
    fullUrl: string;
}

export class RemoveUrlDto implements Pick<Url, 'id'> {
    @IsUUID()
    id: string;
}

export class RedirectViaShortUrlDto implements Pick<Url, 'shortUrl'> {
    @IsString()
    shortUrl: string;
}
