import React, { useEffect, useState } from "react";
import {
  AddTaskButton,
  EditActionButton,
  HorizontalRule,
  TodoContainer,
  TodoInput,
  TodoListWrapper,
  TodoWrapper,
} from "../../styles";
import { motion } from "framer-motion";
import { BASE_URL, getField } from "../../utils/constants";
import toast, { Toaster } from "react-hot-toast";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [currentValue, setCurrentValue] = useState("");
  const [valueUpdateAtIndex, setValueUpdateAtIndex] = useState(undefined);

  useEffect(
    () =>
      todoListAPI(
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
        true
      ),
    /* eslint-disable */
    []
  );

  const notify = (message) => toast(message);

  const todoListAPI = (
    options,
    isInitialLoad = false,
    BaseURL = BASE_URL,
    successMessage = "List Updated"
  ) => {
    fetch(BaseURL, options)
      .then((res) => res.json())
      .then(
        (result) => {
          isInitialLoad ? notify("Todo List fetched") : notify(successMessage);
          setTodoList(result);
          const toDos = [
            ...result.filter((x) => !x.isCompleted),
            ...result.filter((x) => x.isCompleted),
          ];
          setTodoList(toDos);
        },
        (error) => {
          notify("Error in fetch", error.message || error);
          setTodoList([]);
        }
      );
  };

  const addEditTaskHandler = () => {
    const originalState = todoList;
    if (valueUpdateAtIndex !== undefined) {
      const taskValue = getField("", originalState, valueUpdateAtIndex);
      delete taskValue._id;
      taskValue.taskName = currentValue;
      todoListAPI(
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskValue),
        },
        false,
        `${BASE_URL}/${valueUpdateAtIndex}`,
        "Task Updated"
      );
      setValueUpdateAtIndex(undefined);
    } else {
      if (!valueExist(currentValue) && currentValue) {
        const newStateItem = {
          taskName: currentValue,
          isCompleted: false,
        };

        todoListAPI(
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStateItem),
          },
          false,
          undefined,
          "Task Added"
        );
      }
    }
    console.log(todoList);
    setCurrentValue("");
  };

  const enterKeyHandler = (event) => {
    console.log("Enter key pressed");
    if (event && event.key === "Enter") {
      addEditTaskHandler();
    }
  };

  const valueExist = (value) => {
    const alreadyExist = todoList
      .map((x) => x.taskName.toLowerCase().trim())
      .includes(value.toLowerCase().trim());
    if (alreadyExist) {
      notify("Task already exist");
    }
    return alreadyExist;
  };

  const deleteTaskHandler = (idx) => {
    todoListAPI(
      {
        method: "DELETE",
      },
      false,
      `${BASE_URL}/${idx}`,
      "Task Removed"
    );
  };

  const editTaskHandler = (idx) => {
    const todoList_ = todoList;
    const valueToEdit = getField("taskName", todoList_, idx);

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
    const taskValue = getField("", toDos, idx);
    delete taskValue._id;
    taskValue.isCompleted = !taskValue.isCompleted;
    todoListAPI(
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskValue),
      },
      false,
      `${BASE_URL}/${idx}`,
      taskValue.isCompleted ? "Marked as Complete" : "Marked as Incomplete"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <Toaster
        toastOptions={{
          duration: 2200,
          style: {
            padding: "5px",
            color: "#fff",
            backgroundColor: "#999",
          },
        }}
      />
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
          onClick={addEditTaskHandler}
          type="submit"
        >
          {valueUpdateAtIndex !== undefined ? "Update Task" : "Add Task"}
        </AddTaskButton>
        <HorizontalRule />
        <TodoContainer>
          {/* {todoList.length} */}
          {todoList &&
            todoList.map((item) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <TodoListWrapper key={item._id}>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input m-1 center-width"
                      id={item._idx}
                      onClick={(event) => markAsCompleted(item._id)}
                      onChange={(e) => {}}
                      checked={item.isCompleted}
                    />
                    <label
                      className={item.isCompleted ? "completed_task" : ""}
                      htmlFor={item._idx}
                    >
                      {item.taskName}
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
                        onClick={(event) => editTaskHandler(item._id)}
                      ></i>
                    </EditActionButton>
                    <div>
                      <i
                        className="bi bi-trash text-danger c-pointer ml-4"
                        onClick={(event) => deleteTaskHandler(item._id)}
                      ></i>
                    </div>
                  </div>
                </TodoListWrapper>
              </motion.div>
            ))}
        </TodoContainer>
        {/* End of Todo Container */}
      </TodoWrapper>
    </motion.div>
  );
};

export default Todo;
