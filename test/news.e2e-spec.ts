import { Test, TestingModule } from '@nestjs/testing';
import { SimpleNewsController } from 'src/InterfaceAdaptersLayer/Controllers/new.Controllertest';
import { FindNewsService } from 'src/ApplicationLayer/UseCases/NewsUseCases/find.news';
import { NewsTopDto } from 'src/ApplicationLayer/dto/NewsDTOs/findTopNews.dto';

describe('SimpleNewsController', () => {
  let controller: SimpleNewsController;
  let findNewsService: FindNewsService;

  const mockNewsTop: NewsTopDto[] = [
    {
      NewsID: "d8240576-4682-4eb4-b5c9-9286a14b315a",
      Title: " Gobierno instruye retorno de la Policía al Trópico de Cochabamba",
      NewsImageURL: "https://res.cloudinary.com/dk2ycpyri/image/upload/v1752691269/certificados/Screenshot%20from%202025-06-02%2022-15-17.png",
      PublicationDate: "2025-07-15T04:00:00.000Z"
    },
    {
      NewsID: "457dd385-7612-470f-bec3-701f35a6a6cd",
      Title: " Defensoría entregó 11 mil permisos: los niños no pueden viajar solos",
      NewsImageURL: "https://res.cloudinary.com/dk2ycpyri/image/upload/v1752691996/certificados/Screenshot%20from%202025-07-16%2014-53-10.png",
      PublicationDate:"2025-07-15T04:00:00.000Z"
    }
  ];

  const mockFindNewsService = {
    getAllSummarized: jest.fn().mockResolvedValue(mockNewsTop),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimpleNewsController],
      providers: [
        { provide: FindNewsService, useValue: mockFindNewsService },
      ],
    }).compile();

    controller = module.get<SimpleNewsController>(SimpleNewsController);
    findNewsService = module.get<FindNewsService>(FindNewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllSummarized', () => {
    it('should return an array of news summaries with full details', async () => {
      const result = await controller.getAllSummarized();
      expect(result).toEqual(mockNewsTop);
      expect(findNewsService.getAllSummarized).toHaveBeenCalled();
    });
  });
});
