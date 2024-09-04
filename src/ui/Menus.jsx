import { createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import styled from "styled-components";
import { useClickOutside } from "../hooks/useClickOutside";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openedId, setIsOpen] = useState("");
  const [position, setPosition] = useState({ x: 20, y: 20 });

  const close = () => setIsOpen("");
  const open = setIsOpen;

  // function getPosition() {
  //   const ref = useRef();

  // }

  return (
    <MenusContext.Provider
      value={{ openedId, open, close, position, setPosition }}
    >
      <Menu>{children}</Menu>
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { open, openedId, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    // console.log(id, openedId); //
    id !== openedId || openedId === "" ? open(id) : close();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisHorizontal />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openedId, position, close } = useContext(MenusContext);
  const ref = useClickOutside(close);
  if (id == openedId) {
    // console.log(id, openedId);
    return createPortal(
      <StyledList ref={ref} position={position}>
        {children}
      </StyledList>,
      document.body
    );
  }
}
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  return (
    <li>
      <StyledButton
        onClick={() => {
          onClick?.();
          close();
        }}
      >
        {icon} {children}
      </StyledButton>
    </li>
  );
}
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
