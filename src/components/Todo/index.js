import React, { useState } from "react";
import {
  AddTaskButton,
  EditActionButton,
  HorizontalRule,
  TodoInput,
  TodoListWrapper,
  TodoWrapper,
} from "../../styles";
import { motion } from "framer-motion";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [currentValue, setCurrentValue] = useState("");
  const [valueUpdateAtIndex, setValueUpdateAtIndex] = useState(undefined);

  const addTaskHandler = () => {
    const originalState = todoList;
    if (valueUpdateAtIndex !== undefined) {
      originalState[valueUpdateAtIndex]["value"] = currentValue;
      setValueUpdateAtIndex(undefined);
    } else {
      if (!valueExist(currentValue) && currentValue) {
        const newStateItem = [
          {
            value: currentValue,
            isCompleted: false,
            idx: todoList ? todoList.length + 1 : 0,
          },
        ];

        setTodoList((prev) => [...prev, ...newStateItem]);
      }
    }
    console.log(todoList);
    setCurrentValue("");
  };

  const enterKeyHandler = (event) => {
    console.log("Enter key pressed");
    if (event && event.key === "Enter") {
      addTaskHandler();
    }
  };

  const valueExist = (value) => {
    return todoList.map((x) => x.value).includes(value);
  };

  const deleteTaskHandler = (idx) => {
    const updatedState = todoList;
    updatedState.splice(idx, 1);
    if (valueUpdateAtIndex !== undefined) {
      setValueUpdateAtIndex(undefined);
      setCurrentValue("");
    }
    setTodoList([...updatedState]);
  };

  const editTaskHandler = (idx) => {
    const todoList_ = todoList;
    const valueToEdit = todoList_[idx]["value"];

    setValueUpdateAtIndex(idx);
    setCurrentValue(valueToEdit || "");
    setTodoList(todoList_);
  };

  const inputChangeListener = (event) => {
    setCurrentValue(event.target.value);
    console.log(currentValue);
  };

  const markAsCompleted = (idx) => {
    let toDos = todoList;
    toDos[idx].isCompleted = !toDos[idx].isCompleted;
    toDos = [
      ...todoList.filter((x) => !x.isCompleted),
      ...todoList.filter((x) => x.isCompleted),
    ];
    setTodoList(toDos);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <TodoWrapper>
        <TodoInput
          type="text"
          placeholder="New Task"
          onChange={inputChangeListener}
          required={true}
          onKeyPress={enterKeyHandler}
          autoFocus={true}
          value={currentValue}
        />
        <AddTaskButton
          className={
            valueUpdateAtIndex !== undefined
              ? "btn-sm bg-warning w-100"
              : "btn-close-white btn-sm mt-3 text-black text-light w-100"
          }
          onClick={addTaskHandler}
          type="submit"
        >
          {valueUpdateAtIndex !== undefined ? "Update Task" : "Add Task"}
        </AddTaskButton>
        <HorizontalRule />
        <div className="todo-container">
          {/* {todoList.length} */}
          {todoList &&
            todoList.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <TodoListWrapper key={item.idx}>
                  <div className="">
                    <input
                      type="checkbox"
                      className="form-check-input m-1 center-width"
                      id={item.idx}
                      onClick={(event) => markAsCompleted(index)}
                      onChange={(e) => {}}
                      checked={item.isCompleted}
                    />
                    <label
                      className={item.isCompleted ? "completed_task" : ""}
                      htmlFor={item.idx}
                    >
                      {item.value}
                    </label>
                  </div>
                  <div>
                    <EditActionButton>
                      <i
                        className={
                          valueUpdateAtIndex !== undefined
                            ? "bi bi-pencil-fill c-pointer no-pointer-event"
                            : "bi bi-pencil-fill c-pointer"
                        }
                        onClick={(event) => editTaskHandler(index)}
                      ></i>
                    </EditActionButton>
                    <div>
                      <i
                        className="bi bi-trash text-danger c-pointer ml-4"
                        onClick={(event) => deleteTaskHandler(index)}
                      ></i>
                    </div>
                  </div>
                </TodoListWrapper>
              </motion.div>
            ))}
        </div>
        {/* End of Todo Container */}
      </TodoWrapper>
    </motion.div>
  );
};

export default Todo;
