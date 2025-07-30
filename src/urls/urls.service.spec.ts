describe('UrlsService', () => {
    describe('when calling accessShortLink service', () => {
        test.todo('NotFoundException when URL is not found');
        test.todo('Success');
    });
    describe('when calling create service', () => {
        test.todo('BadRequestException when userId is passed but is not found into Database');
        test.todo('Success');
    });
    describe('when calling listAllUrls service', () => {
        test.todo('Returning when there is no URL saved');
        test.todo('Returning when there is URL saved into User');
    });
    describe('when calling remove service', () => {
        test.todo('BadRequestException when URL is not found');
        test.todo('Success');
    });
    describe('when calling update service', () => {
        test.todo('NotFoundException when URL is not found');
        test.todo('Success');
    });
});
