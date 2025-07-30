import { Url, UrlErrorMessages, UserErrorMessages } from '@app/shared';
import { CreateUrlDto, EditUrlDto, RedirectViaShortUrlDto, RemoveUrlDto } from '@app/shared/dtos';
import { IUrlsService } from '@app/shared/services/urls.service.interface';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UrlEntity } from './entities/url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UrlsService implements IUrlsService {
    constructor(
        @InjectRepository(UrlEntity)
        private readonly urlRepository: Repository<UrlEntity>,
        private readonly userService: UsersService,
    ) {}

    async accessShortLink(data: RedirectViaShortUrlDto): Promise<Url> {
        const urlFound = await this.urlRepository.findOneBy({
            shortUrl: data.shortUrl,
        });

        if (!urlFound) {
            throw new NotFoundException(UrlErrorMessages.UrlNotFound);
        }

        await this.urlRepository
            .createQueryBuilder()
            .update()
            .set({
                clicks: () => 'clicks + 1',
            })
            .where('id = :id', {
                id: urlFound.id,
            })
            .execute();

        return urlFound;
    }

    async create(data: CreateUrlDto, userId: string): Promise<Url> {
        let userFound;

        const suffixCode = this.generateSuffixCode();
        const shortUrlCode = this.generateUrlCode();

        const payloadCreateUrl: Partial<UrlEntity> = {
            fullUrl: data.fullUrl,
            shortUrl: suffixCode + shortUrlCode,
        };

        if (userId) {
            userFound = await this.userService.findUserById({
                id: userId,
            });

            if (!userFound) {
                throw new BadRequestException(UserErrorMessages.UserNotFound);
            }

            payloadCreateUrl.user = userFound;
        }

        const url = await this.urlRepository.save(payloadCreateUrl);

        if (url?.user) {
            delete url.user;
        }

        if (userFound) {
            await this.userService.addCountLink({
                id: userFound.id,
            });
        }

        return url;
    }

    async listAllLinksWithCounts(userId: string): Promise<Pick<Url, 'clicks' | 'fullUrl'>[]> {
        const result = await this.urlRepository.find({
            withDeleted: false,
            where: {
                user: {
                    id: userId,
                },
            },
            select: {
                clicks: true,
                fullUrl: true,
            },
        });

        const allLinksWithCounts = result.map<Pick<Url, 'clicks' | 'fullUrl'>>(url => {
            return {
                clicks: url.clicks,
                fullUrl: url.fullUrl,
            };
        });

        return allLinksWithCounts;
    }

    async listAllUrls(userId: string): Promise<Url[]> {
        const list = await this.urlRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
        });

        console.log([list, userId]);

        return list;
    }

    async remove(data: RemoveUrlDto, userId: string): Promise<boolean> {
        const urlFound = await this.urlRepository.findOneBy({
            id: data.id,
            user: {
                id: userId,
            },
        });

        if (!urlFound) {
            throw new BadRequestException(UrlErrorMessages.UrlNotFound);
        }

        const softDeleteResult = await this.urlRepository.softDelete({
            id: urlFound.id,
        });

        return softDeleteResult.affected! > 0;
    }

    async update(data: EditUrlDto, userId: string): Promise<boolean> {
        const url = await this.urlRepository.findOne({
            where: {
                id: data.id,
                user: {
                    id: userId,
                },
            },
        });

        if (!url || url.removedAt) {
            throw new NotFoundException(UrlErrorMessages.UrlNotFound);
        }

        const updated = await this.urlRepository.update(
            {
                id: url.id,
            },
            {
                fullUrl: data.fullUrl,
            },
        );

        return updated.affected! > 0;
    }

    generateUrlCode(): string {
        return nanoid(3);
    }

    generateSuffixCode(): string {
        return nanoid(3);
    }
}
