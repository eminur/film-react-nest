import { Injectable } from '@nestjs/common';
import { FilmDto } from '../films/dto/films.dto';
import { TicketDto } from '../order/dto/order.dto';
import { faker } from "@faker-js/faker";
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsRepositoryMock implements FilmsRepository {
    private readonly films: FilmDto[] = [
        {
            id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
            rating: 2.9,
            director: 'Итан Райт',
            tags: ['Документальный'],
            image: '/bg1s.jpg',
            cover: '/bg1c.jpg',
            title: 'Архитекторы общества',
            about:
                'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
            description:
                'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.',
            schedule: [
                {
                    id: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
                    daytime: '2024-06-28T10:00:53+03:00',
                    hall: 0,
                    rows: 5,
                    seats: 10,
                    price: 350,
                    taken: [],
                },
                {
                    id: '5beec101-acbb-4158-adc6-d855716b44a8',
                    daytime: '2024-06-28T14:00:53+03:00',
                    hall: 1,
                    rows: 5,
                    seats: 10,
                    price: 350,
                    taken: [],
                },
                {
                    id: '89ee32f3-8164-40a6-b237-f4d492450250',
                    daytime: '2024-06-28T16:00:53+03:00',
                    hall: 2,
                    rows: 5,
                    seats: 10,
                    price: 350,
                    taken: [],
                },
                {
                    id: 'd6a4ed9b-51d6-4df2-b66e-d75175deb373',
                    daytime: '2024-06-29T11:00:53+03:00',
                    hall: 0,
                    rows: 5,
                    seats: 10,
                    price: 350,
                    taken: [],
                },
                {
                    id: 'a8af36c3-65ee-4224-a77d-c9ebb790ba66',
                    daytime: '2024-06-29T15:00:53+03:00',
                    hall: 1,
                    rows: 5,
                    seats: 10,
                    price: 350,
                    taken: [],
                },
                {
                    id: '0cf8b68c-fcf2-4c0a-97ba-45990231fa0e',
                    daytime: '2024-06-29T17:00:53+03:00',
                    hall: 2,
                    rows: 5,
                    seats: 10,
                    price: 350,
                    taken: [],
                },
                {
                    id: '2519ca34-32b4-4a7f-971d-3bb585c6450b',
                    daytime: '2024-06-30T12:00:53+03:00',
                    hall: 0,
                    rows: 5,
                    seats: 10,
                    price: 350,
                    taken: [],
                },
                {
                    id: 'b105ad4b-ecd2-4556-abaf-9a95403dc01c',
                    daytime: '2024-06-30T16:00:53+03:00',
                    hall: 1,
                    rows: 5,
                    seats: 10,
                    price: 350,
                    taken: [],
                },
                {
                    id: '02a9feb2-fc92-4386-a917-aa79e7f8fd7f',
                    daytime: '2024-06-30T18:00:53+03:00',
                    hall: 2,
                    rows: 5,
                    seats: 10,
                    price: 350,
                    taken: [],
                },
            ],
        },
        {
            "id": "51b4bc85-646d-47fc-b988-3e7051a9fe9e",
            "rating": 9,
            "director": "Харрисон Рид",
            "tags": ["Рекомендуемые"],
            "image": "/bg3s.jpg",
            "cover": "/bg3c.jpg",
            "title": "Недостижимая утопия",
            "about": "Провокационный фильм-антиутопия, исследующий темы свободы, контроля и цены совершенства.",
            "description": "Провокационный фильм-антиутопия режиссера Харрисона Рида. Действие фильма разворачивается в, казалось бы, идеальном обществе, и рассказывает о группе граждан, которые начинают подвергать сомнению систему. Фильм исследует темы свободы, контроля и цены совершенства.",
            "schedule": [{
                "id": "9647fcf2-d0fa-4e69-ad90-2b23cff15449",
                "daytime": "2024-06-28T10:00:53+03:00",
                "hall": 0,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "9f2db237-01d0-463e-a150-89f30bfc4250",
                "daytime": "2024-06-28T14:00:53+03:00",
                "hall": 1,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "3d5f5d12-b4d8-44d3-a440-1b91616fda40",
                "daytime": "2024-06-28T16:00:53+03:00",
                "hall": 2,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "7f59de0d-62b2-412f-9e0b-bf6e971c44e5",
                "daytime": "2024-06-29T11:00:53+03:00",
                "hall": 0,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "65f4a65e-1bc1-4677-842b-10e9b317b287",
                "daytime": "2024-06-29T15:00:53+03:00",
                "hall": 1,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "b3ba6b69-050e-498c-9cdb-92711d8e4180",
                "daytime": "2024-06-29T17:00:53+03:00",
                "hall": 2,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "d87ee9ab-4d84-43bb-85d6-f71aced22f73",
                "daytime": "2024-06-30T12:00:53+03:00",
                "hall": 0,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "eed1469f-c95e-428a-870d-13cbfe4ac2ac",
                "daytime": "2024-06-30T16:00:53+03:00",
                "hall": 1,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "68437c84-6c35-4203-bff7-021d16042a6b",
                "daytime": "2024-06-30T18:00:53+03:00",
                "hall": 2,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }]
        },
        {
            "id": "3bedbc5a-844b-40eb-9d77-83b104e0cf75",
            "rating": 8.5,
            "director": "Элиза Уиттакер",
            "tags": ["Рекомендуемые"],
            "image": "/bg5s.jpg",
            "cover": "/bg5c.jpg",
            "title": "Звёздное путешествие",
            "about": "Научно-фантастический фильм о команде астронавтов, исследующий темы жизнестойкости, надежды и силы человеческих связей",
            "description": "«Звёздное путешествие» — прекрасный научно-фантастический фильм о команде астронавтов, путешествующих по галактике в поисках нового дома для человечества. Помимо потрясающей работы оператора и специалистов по визуальным эффектам, можно отметить темы, исследуемые в фильме: жизнестойкости, надежды и силы человеческих связей.",
            "schedule": [{
                "id": "351b437c-3430-4a35-b71d-b93b3d80274a",
                "daytime": "2024-06-28T10:00:53+03:00",
                "hall": 0,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "2661b7e2-7654-4d17-aa5d-9da76e4fb563",
                "daytime": "2024-06-28T14:00:53+03:00",
                "hall": 1,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "d155ff3f-d547-4e4d-a530-bfcdcb3efbd5",
                "daytime": "2024-06-28T16:00:53+03:00",
                "hall": 2,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "baf5d315-f3ad-4ebc-bbdc-544c51f3a2f3",
                "daytime": "2024-06-29T11:00:53+03:00",
                "hall": 0,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "5a102896-b6ac-4db1-9f93-1653dde8a5f2",
                "daytime": "2024-06-29T15:00:53+03:00",
                "hall": 1,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "c06b2048-a159-4356-b51b-3d7817766d02",
                "daytime": "2024-06-29T17:00:53+03:00",
                "hall": 2,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "ee489a8b-68be-48a1-b62f-896981d60b06",
                "daytime": "2024-06-30T12:00:53+03:00",
                "hall": 0,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "a33f5fda-c4d8-4a1b-9f86-cd39d73fdc98",
                "daytime": "2024-06-30T16:00:53+03:00",
                "hall": 1,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }, {
                "id": "24074084-1d42-49ff-b0fb-e64029674718",
                "daytime": "2024-06-30T18:00:53+03:00",
                "hall": 2,
                "rows": 5,
                "seats": 10,
                "price": 350,
                "taken": []
            }]
        },
    ];

    async findAll() {
        return this.films;
    }

    async findById(id: string) {
        return this.films.find((film) => film.id === id) || null;
    }

    async takeSeat(ticket: TicketDto) {
        return { success: true, ticketId: faker.string.uuid() };
    }
}