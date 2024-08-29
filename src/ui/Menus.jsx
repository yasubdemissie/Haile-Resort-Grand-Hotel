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
  const [openId, setIsOpen] = useState("");
  console.log("id : ", openId);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const ref = useRef();

  const close = () => setIsOpen("");
  const open = setIsOpen;

  // function getPosition() {
  //   const ref = useRef();

  // }

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition, ref }}
    >
      <Menu>{children}</Menu>
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { open, openId, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    // console.log(id, openId); //
    (id !== openId || openId === "") ? open(id) : close();
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
  const { openId, position, ref, close } = useContext(MenusContext);
  useClickOutside(ref, close);
  if (id == openId) {
    // console.log(id, openId);
    return createPortal(
      <StyledList ref={ref} position={position}>
        {children}
      </StyledList>,
      document.body
    );
  }
}
function Button({ children, icon, onClick }) {
  return (
    <li>
      <StyledButton onClick={onClick}>{icon} {children}</StyledButton>
    </li>
  );
}
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
