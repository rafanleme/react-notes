import styled from "styled-components";

export const Container = styled.section`
  height: fit-content;
  margin-top: 100px;
  padding: 30px;
  flex: 1;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const Button = styled.button`
  height: 200px;
  width: 20px;

  background-color: transparent;
  cursor: pointer;
  transition: 0.2s;
  border: 1px solid var(--white);
  border-radius: 5px;
  font-weight: bold;
  color: var(--white);

  :hover:enabled {
    box-shadow: 0px 4px 10px var(--bgPrimary);
  }

  :active:enabled {
    transform: scale(0.95);
  }

  :disabled {
    border: 1px solid var(--overlayLight);
    color: var(--overlayLight);
  }
  
`;