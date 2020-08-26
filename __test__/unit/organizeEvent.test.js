import path from 'path';

import organizeEvent from '../../src/helpers/organizeEvent';

describe('Organize the event', () => {
  it("should return the organized event", () => {
    const filePath = path.resolve(__dirname, '..', 'attach', 'proposals.txt');

    const event = organizeEvent(filePath);

    const expectedEvent = [
      {
        name: "Track A",
        morningLectures: [
          {
            title: "Ensinando programação nas grotas de Maceió",
            time: "9:00"
          },
          {
            title: "Ruby vs. Clojure para desenvolvimento backend",
            time: "9:30"
          },
          {
            title: "Manutenção de aplicações legadas em Ruby on Rails",
            time: "10:30"
          },
          {
            title: "Um mundo sem StackOverflow",
            time: "11:00"
          },
          {
            title: "Otimizando CSS em aplicações Rails",
            time: "11:30"
          },
          {
            title: "Almoço",
            time: "12:00"
          }
        ],
        "afternoonLectures": [
          {
            title: "Codifique menos, Escreva mais!",
            time: "13:00"
          },
          {
            title: "Programação em par",
            time: "13:45"
          },
          {
            title: "A mágica do Rails: como ser mais produtivo",
            time: "14:45"
          },
          {
            title: "Ruby on Rails: Por que devemos deixá-lo para trás",
            time: "15:45"
          },
          {
            title: "Clojure engoliu Scala: migrando minha aplicação",
            time: "16:30"
          },
          {
            title: "Evento de networking",
            time: "17:00"
          }
        ]
      },
      {
        name: "Track B",
        morningLectures: [
          {
            title: "Diminuindo tempo de execução de testes em aplicações Rails enterprise",
            time: "9:00"
          },
          {
            title: "Reinventando a roda em ASP clássico",
            time: "9:45"
          },
          {
            title: "Apresentando Lua para as massas",
            time: "10:15"
          },
          {
            title: "Erros de Ruby oriundos de versões erradas de gems",
            time: "11:00"
          },
          {
            title: "Almoço",
            time: "12:00"
          }
        ],
        "afternoonLectures": [
          {
            title: "Erros comuns em Ruby",
            time: "13:00"
          },
          {
            title: "Rails para usuários de Django",
            time: "13:05"
          },
          {
            title: "Trabalho remoto: prós e cons",
            time: "14:05"
          },
          {
            title: "Desenvolvimento orientado a gambiarras",
            time: "14:50"
          },
          {
            title: "Aplicações isomórficas: o futuro (que talvez nunca chegaremos)",
            time: "15:20"
          },
          {
            title: "Evento de networking",
            time: "17:00"
          }
        ]
      }
    ];

    expect(event).toStrictEqual(expectedEvent);
  });
});