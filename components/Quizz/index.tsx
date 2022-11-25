import * as React from 'react';
import { callApi } from '../Quizz/api';
import Score from '../Score';
import {
  ChoicesGroup,
  Container,
  Card,
  CardContent,
  CardHeader,
  Submit,
  CardResult,
  Form,
  Next,
  Prev,
  Restart,
  AdvicesUl,
  Progress,
  CardResultGrid,
  RestartContainer,
  CardResultPerfect,
} from './styles';

const MAP_FAKE_WIDTH = [200, 90, 150];

const Component = ({ answers, name, type, questionId }) => {
  if (type === 'text') {
    return <input type="text" name={name} />;
  }

  if (type === 'number') {
    return <input type="number" name={name} />;
  }

  if (type === 'select') {
    return (
      <select name={name} style={{ width: MAP_FAKE_WIDTH[2] }}>
        {answers &&
          answers.map((choice) => (
            <option
              value={`${questionId}|${choice.id}|${choice.score}${
                choice.adviceId ? `|${choice.adviceId}` : ''
              }`}
            >
              {choice.label}
            </option>
          ))}
      </select>
    );
  }

  if (type === 'choice' || type === 'bool') {
    return (
      <ChoicesGroup>
        {answers &&
          answers.map((choice, index) => (
            <label for={`${name}-${index}`}>
              {choice.label}
              <input
                name={name}
                id={`${name}-${index}`}
                type="radio"
                value={`${questionId}|${choice.id}|${choice.score}${
                  choice.adviceId ? `|${choice.adviceId}` : ''
                }`}
              />
            </label>
          ))}
      </ChoicesGroup>
    );
  }

  return null;
};

const Quizz = () => {
  const tips = [
    {
      name: 'Choisir des ampoules LED : celles-ci consomment 10 € d’électricité par an en moyenne, soit 6 fois moins que les anciennes ampoules incandescentes et halogènes.',
      id: '1',
    },
    {
      name: 'Choisir des appareils performants : grâce à la notation des performances énergétiques des appareils électroménagers',
      id: '2',
    },
  ];
  const [finalScore, setScore] = React.useState(0);
  const [current, setCurrent] = React.useState(1);
  const [showResult, setShowResult] = React.useState(false);
  const [questionsDisplayed, setQuestionDisplayed] = React.useState([]);
  const [displayAdvices, setDisplayAdvices] = React.useState([]);
  const currentRefPage = React.useRef(null);

  React.useEffect(() => {
    callApi(`/question`, 'GET').then((data) => {
      setQuestionDisplayed(data);
    });
  }, [current]);

  const handleNext = () => {
    setCurrent(current + 1);
    const cards = currentRefPage.current.querySelectorAll('.card');
    cards[1].classList.remove('swipe');
    cards[1].classList.remove('swipeReverse');
    cards[0].classList.add('swipe');
  };

  const handlePrev = () => {
    setCurrent(current - 1);
    const cards = currentRefPage.current.querySelectorAll('.card');
    cards[0].classList.remove('swipe');
    cards[0].classList.remove('swipeReverse');
    cards[1].classList.add('swipeReverse');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Math.random();

    const form: HTMLFormElement = document.getElementById('quizz');
    const formData = new FormData(form);
    let result = [];
    let advices = [];
    for (const [key, value] of formData) {
      const [questionId, key, score, adviceId] = value.toString().split('|');
      if (key) {
        const obj = {
          key,
          score,
          questionId,
          adviceId,
        };
        result.push(obj);
      }
    }
    // Search advice
    callApi(`/advice`, 'GET').then((a) => {
      advices = a;
      const findAdvices = [];
      result.map((d) => {
        const findAdvice = advices.find((a) => d.adviceId === a.id);
        if (findAdvice) {
          findAdvices.push(advices.find((a) => d.adviceId === a.id));
        }
      });

      let uniqAdvices = [
        ...new Map(findAdvices.map((item) => [item.id, item])).values(),
      ];
      setDisplayAdvices(uniqAdvices);
      // Cumul des points
      let score = 0;
      result.map((r) => {
        score += r.score ? parseInt(r.score, 10) : 0;
      });

      // POST response
      //
      const body = result.map((r) => {
        return {
          questionId: r.questionId,
          consumerToken: token,
          value: null,
          score: r.score,
        };
      });
      callApi('/response', 'POST', body).then((r) => {});
      setScore(score);
      setShowResult(true);
    });
  };

  const resetQuizz = () => {
    setCurrent(1);
    setShowResult(false);
    const form: HTMLFormElement = document.getElementById('quizz');
    form.reset();
  };

  const SMILE = ['😉', '😃', '😁', '😎'];

  return (
    <React.Fragment>
      <Container ref={currentRefPage}>
        {!showResult && (
          <React.Fragment>
            <h1>
              Bienvenue sur EcoQuizz
              <br />
              <small>
                Saisir quelques informations pour recevoir votre classe
                énergétique.
              </small>
            </h1>
            <Progress
              current={current}
              width={current === 1 ? '50%' : '100%'}
            />
          </React.Fragment>
        )}
        <Form id="quizz" onSubmit={handleSubmit} action="POST">
          {showResult ? (
            <React.Fragment>
              <CardResult>
                <CardResultGrid>
                  {(displayAdvices?.length > 0 && (
                    <div>
                      <h1>
                        Nos conseils personnalisés afin d'optimiser votre
                        consommation électrique
                      </h1>
                      <AdvicesUl>
                        {displayAdvices.map((ad, index) => (
                          <li>
                            <div>{SMILE[Math.floor(Math.random() * 3)]}</div>
                            <p>{ad.name}</p>
                          </li>
                        ))}
                      </AdvicesUl>
                    </div>
                  )) || (
                    <CardResultPerfect>
                      <div>🥳</div>
                      <div>Vous êtes parfait</div>
                    </CardResultPerfect>
                  )}
                  <div>
                    <h1>Résultat de votre évaluation</h1>
                    <Score score={finalScore} />
                  </div>
                </CardResultGrid>
              </CardResult>
              {showResult && (
                <RestartContainer>
                  <Restart type="button" onClick={resetQuizz}>
                    Recommencer le quizz
                  </Restart>
                </RestartContainer>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Card className="card" zIndex={4}>
                {questionsDisplayed
                  .filter((qd) => qd.block === 'identity')
                  .map((object, _index) => {
                    const { title, key, type, choices } = object;
                    return (
                      <CardContent>
                        <CardHeader>{title}</CardHeader>
                        <Component
                          questionId={object.id}
                          name={key}
                          type={type}
                          answers={choices || []}
                        />
                      </CardContent>
                    );
                  })}
              </Card>
              <Card className="card" zIndex={3}>
                {questionsDisplayed
                  .filter((qd) => qd.block === 'equipment')
                  .map((object, _index) => {
                    const { title, key, type, choices } = object;
                    return (
                      <CardContent>
                        <CardHeader>{title}</CardHeader>
                        <Component
                          questionId={object.id}
                          name={key}
                          type={type}
                          answers={choices || []}
                        />
                      </CardContent>
                    );
                  })}
              </Card>
            </React.Fragment>
          )}
          {current >= 1 && current < 2 && !showResult && (
            <Next type="button" onClick={handleNext}>
              Suivant
            </Next>
          )}
          {current > 1 && !showResult && (
            <Prev type="button" onClick={handlePrev}>
              Précédent
            </Prev>
          )}
          {current === 2 && !showResult && (
            <Submit type="submit">Envoyer</Submit>
          )}
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default Quizz;
