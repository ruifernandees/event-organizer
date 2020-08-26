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
            duration: 30
          },
          {
            title: "Ruby vs. Clojure para desenvolvimento backend",
            duration: 30
          },
          {
            title: "Manutenção de aplicações legadas em Ruby on Rails",
            duration: 60
          },
          {
            title: "Um mundo sem StackOverflow",
            duration: 30
          },
          {
            title: "Otimizando CSS em aplicações Rails",
            duration: 30
          }
        ],
        afternoonLectures: [
          {
            title: "Codifique menos, Escreva mais!",
            duration: 30
          },
          {
            title: "Programação em par",
            duration: 45
          },
          {
            title: "A mágica do Rails: como ser mais produtivo",
            duration: 60
          },
          {
            title: "Ruby on Rails: Por que devemos deixá-lo para trás",
            duration: 60
          },
          {
            title: "Clojure engoliu Scala: migrando minha aplicação",
            duration: 45
          }
        ]
      },
      {
        name: "Track B",
        morningLectures: [
          {
            title: "Diminuindo tempo de execução de testes em aplicações Rails enterprise",
            duration: 60
          },
          {
            title: "Reinventando a roda em ASP clássico",
            duration: 45
          },
          {
            title: "Apresentando Lua para as massas",
            duration: 30
          },
          {
            title: "Erros de Ruby oriundos de versões erradas de gems",
            duration: 45
          }
        ],
        afternoonLectures: [
          {
            title: "Erros comuns em Ruby",
            duration: 45
          },
          {
            title: "Rails para usuários de Django",
            duration: 5
          },
          {
            title: "Trabalho remoto: prós e cons",
            duration: 60
          },
          {
            title: "Desenvolvimento orientado a gambiarras",
            duration: 45
          },
          {
            title: "Aplicações isomórficas: o futuro (que talvez nunca chegaremos)",
            duration: 30
          }
        ]
      }
    ];

    expect(event).toStrictEqual(expectedEvent);
  });
});