import styled from "styled-components";

export const HeaderStyle = styled.div`
  padding: 10px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const PositionThemeButton = styled.div`
  float: right;
  margin: 0 10px;
`;

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.wrapper};
  color: ${({ theme }) => theme.text};
  width: 100%;
  margin: 0 auto;
  padding: 0px 0 20px 0;
  min-height: 100vh;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TodoWrapper = styled.div`
  width: 65%;
  text-align: center;
  margin: 10px auto;
  @media (max-width: 768px) {
    width: 95%;
    margin: 10px auto;
  }
`;

export const TodoInput = styled.input`
  padding: 15px;
  width: 100%;
  display: block;
  border-radius: 5px;
  border: none;
  outline: none;
  background: ${({ theme }) => theme.inputBG};
  color: ${({ theme }) => theme.text};
`;

export const AddTaskButton = styled.button`
  padding: 10px;
  width: 100%;
  display: block;
  margin: 10px 0;
  border-radius: 5px;
  border: none;
  background: ${({ theme }) => theme.actionButtonBG};
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

export const HorizontalRule = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.actionButtonBG};
  margin: 1em 0;
  padding: 10px;
`;

export const TodoListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0 20px 0;
  padding: 15px;
  align-items: center;
  border-radius: 10px;
  background: ${({ theme }) => theme.inputBG};
  box-shadow: inset  0 100px ${({ theme }) => theme.actionButtonBG};
  color: ${({ theme }) => theme.text};
  word-break: break-all;
`;

export const EditActionButton = styled.div`
  margin-bottom: 15px;
`;
