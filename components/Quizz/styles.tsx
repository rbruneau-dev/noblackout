import styled, { keyframes } from 'styled-components';

export const swipeTo = keyframes`
0% {
  transfrom: translateX(-50%);
  opacity: 1;
  z-index: 100;
}

30% {
  transform: translateX(90%);
}

35% {
  z-index: 1;
}
60% {
  opacity: 1;
}

100% {
  transform: translateX(-49%);
  opacity: 0.6;
  box-shadow: 1px 1px 1px rgba(255,255,255, 0.1);
}
`;

export const AppearCard = keyframes`
0% {
  opacity: 0;
  transform: translateY(-1000px) scale(1.4);
}

80% {
  opacity: 1;
}

100% {
  transform: translateY(0) scale(1);
}
`;

export const Header = styled.header`
text-align: center;
`;

export const Container = styled.section`
  font-family: 'Inter', Lato, Roboto, Arial, Helvetica, sans-serif;
  position: relative;
  max-width: 900px;
  margin: auto;
  height: 100%;
  h1 {
    margin: 50px 0;
    text-align: center;
    color: #E7CE41;
    font-size: 1.4rem;
    small {
      font-size: 16px;
    }
  }
`;

export const Form = styled.form`
  position: relative;
  max-width: 900px;
  margin: auto;
  min-height: 400px;
`;

export const Progress = styled.div<{ width: string }>`
  padding: 2px 0;
  background-color: #4E4E4E;
  height: 0px;
  line-height: 5px;
  margin: auto;
  position: relative;
  margin-bottom: 10px;

  &:after {
    position: absolute;
    left: 10px;
    top: -15px;
    content: 'Etape ${({ current }) => current}';
    font-size: 12px;
    font-weight: bold;
    color: #E7CE41;
  }

  &:before {
    transition: width 0.5s ease;
    position: absolute;
    bottom: 0;
    left: 0;
    content: ' ';
    height: 3px;
    background-color: #E7CE41;
    width: ${({ width }) => width};
  }
`;

export const Card = styled.div<{ zIndex: number }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  gap: 15px;
  flex-wrap: wrap;
  background-color: #222;
  color: #fff;
  padding: 15px 20px;
  border-radius: 15px;
  border: 2px solid #E7CE41;
  box-shadow: 1px 2px 8px 0px rgba(0,0,0, 0.8);
  left: 50%;
  width: 100%;
  height: 80%;
  transform: translateX(-50%);
  overflow: hidden;
  overflow-y: auto;
  &:not(.swipe) {
    z-index: ${({ zIndex }) => zIndex};
  }

  &.swipe {
    animation: ${swipeTo} 1.2s ease-in-out;
    animation-fill-mode: forwards;
  }

  &.swipeReverse {
    animation: ${swipeTo} 1.2s ease-in-out;
    animation-fill-mode: forwards;
  }

  &::-webkit-scrollbar {
    width: 20px;
  }

  scrollbar-width: thin;
  // scrollbar-color: blue orange;
`;

export const CardResultGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;

  h1 {
    text-align: left !important;
    font-size: 20px;
  }
`;

export const CardResultPerfect = styled.div`
  text-align: center;
display: flex;
justify-content: center;
align-items: center;
font-size: 25px;
color: #e7ce41;
font-weight: bold;
flex-direction: column;

@keyframes rotate {
  0% {
    transform: rotateX(-20deg);
  }

  100% {
    transform: rotateZ(20deg);
  }
}

div:first-child {
  font-size: 50px;
  margin-bottom: 10px;
  animation: rotate linear .6s infinite alternate;


}
`;

export const CardResult = styled.div`
  color: #fff;
  background: #222;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 40px;
  z-index: 100;
  border: 1px solid #333;
  box-shadow: 5px 5px 10px #111;
  animation: ${AppearCard} .8s ease;
  padding: 20px;
  h1 {
    width: 100%;
    text-align: center;
    margin: 0;
    margin-bottom: 20px;
  }

  span {
    display: block;
    margin-top: 10px;
    text-align: center;
    font-size: 5rem;
  }
`;

export const CardHeader = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

export const CardContent = styled.div`
  position: relative;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 45%;

  input, select {
    margin: 0;
    max-width: 300%;
    outline: none;
    border:none;
    padding: 10px 5px;
    border-radius: 4px;
    background-color: rgba(255,255,255,0.1);
    border: 1px solid #ccc;
    transition: all 0.3s ease;
    color: #ccc;
    &:focus, &:active {
      background-color: rgba(255,255,255,0.2);
      border: 1px solid #E7CE41;
    }
  }
`;

export const ButtonMain = styled.button`
  border: 2px solid #E7CE41;
  background-color: #161A1D;
  color: rgb(231, 206, 65);
  cursor: pointer;
  font-weight: bold;
  padding: 5px 15px;
  text-align: center;
  text-transform: uppercase;
  transition: border 200ms ease;
  width: auto;
  border: 0;
  font-size: 0.9rem;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  border: 2px solid rgba(231, 206, 65, 0);
  transition: 0.2s;

  &:hover {
    border-radius: 2px;
    background-color: rgb(231, 206, 65);
    border: 2px solid rgba(231, 206, 65, 0.1);
    color: #000;
  }
`;

export const Next = styled(ButtonMain)`
  position: absolute;
  bottom: 20px;
  right: 0;
`;

export const Prev = styled(ButtonMain)`
  position: absolute;
  left: 0;
  bottom: 20px;
`;

export const Submit = styled(ButtonMain)`
  position: absolute;
  bottom: 20px;
  right: 0;
`;

export const RestartContainer = styled.div`
margin: 30px auto;
text-align: center;
`;

export const Restart = styled(ButtonMain)`
display: inline-block;
`;

export const ChoicesGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.8rem;
  align-items: flex-start;
  label {
    display: flex;
    gap: 10px;
    flex-direction: row-reverse;
    align-items: center;
  }
`;

export const AdvicesUl = styled.ul`
  list-style: none;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0;
  padding: 0;

  li {
    background-color: rgba(0,0,0, 0.2);
    padding: 10px;
    border-radius: 5px;
    color: #CCC;
    font-size: .9em;
    transition: .2s;

    display: flex;
    align-items: center;
    gap: 15px;
    
    > div {
      font-size: 1.2rem;
    }
    
    &:hover {
      background-color: rgba(0,0,0, 0.4);
    }
  }
`;
