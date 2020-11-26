import "./TasksForm.css";
import Table from "../../../components/table/Table";
import SelectItem from "../../../components/selectItem/SelectItem";
import MembersTaskSearch from "./membersTaskSearch/MembersTaskSearch";
import React, { useState } from "react";
import { v4 } from "uuid";
import { onItemChangedHandler } from "../../../utils/Utils";

const TasksForm = ({
  selectedMembers,
  selectedTasks,
  setSelectedTasks,
  changedList,
  setChangedList,
  changedList2,
  setChangedList2,
}) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [addTaskInputValue, setAddTaskInputValue] = useState("");
  const [error, setError] = useState("");
  const columns = {
    people: {
      key: "action",
      width: "20%",
      convertData: (element) => (
        <SelectItem onClickHandler={() => onRemoveTaskHandler(element)}>
          <p
            style={{
              fontSize: "1.9rem",
              fontWeight: "550",
            }}
          >
            {element.name}
          </p>
        </SelectItem>
      ),
    },
    visibleTo: {
      key: "name",
      width: "80%",
      convertHeader: () => (
        <p
          style={{
            color: "var(--color-dark-tertiary)",
          }}
        >
          Visible to
        </p>
      ),
      cssHeader: {
        textAlign: "left",
      },
      convertData: (element) => (
        <MembersTaskSearch
          data={element}
          onMemberSelected={onAddMember}
          onMemberRemove={onRemoveMember}
          selectedTask={selectedTask}
          members={selectedMembers}
          onAddAllMember={onAddAllMember}
          onRemoveAllMember={onRemoveAllMember}
        />
      ),
    },
  };

  const onAddTaskHandler = (value) => {
    const newTask = {
      id: v4(),
      name: value,
      users: [],
      addMode: true,
    };
    const result = onItemChangedHandler(newTask, changedList, "name", "name");

    setChangedList(result);
    setSelectedTasks([...selectedTasks, newTask]);
    setAddTaskInputValue("");
  };

  const onRemoveTaskHandler = (task) => {
    const result = onItemChangedHandler(
      { ...task, addMode: false },
      changedList,
      "name",
      "name"
    );

    setChangedList(result);
    setSelectedTasks([...selectedTasks.filter((ele) => ele.id !== task.id)]);
  };

  const onAddMember = (member, task) => {
    const index = changedList.findIndex((ele) => ele.id === task.id);
    if (index !== -1) {
      const taskTemp = changedList[index];
      if (taskTemp.addMode) {
        const temp = [...changedList];
        temp.splice(index, 1, { ...task, users: [...task.users, member] });
        setChangedList(temp);
      }
    } else {
      const index = changedList2.findIndex((ele) => ele.id === task.id);
      const temp = [...changedList2];
      if (index === -1) {
        temp.push({ ...task, users: [{ ...member, addMode: true }] });
        setChangedList2(temp);
      } else {
        const t = onItemChangedHandler(
          member,
          changedList2[index].users,
          "id",
          "id"
        );
        if (t.length) {
          temp[index] = { ...task, users: t };
        } else {
          temp.splice(index, 1);
        }
        setChangedList2(temp);
      }
    }
    task.users = [...task.users, member];
    setSelectedTasks([...selectedTasks]);
    setSelectedTask({ ...task });
  };

  const onRemoveMember = (memberId, task) => {
    task.users = [...task.users.filter((ele) => memberId !== ele.id)];
    const index = changedList.findIndex((ele) => ele.id === task.id);
    if (index !== -1) {
      const taskTemp = changedList[index];
      if (taskTemp.addMode) {
        const temp = [...changedList];
        temp.splice(index, 1, {
          ...task,
          users: task.users.filter((ele) => ele.id !== memberId),
        });
        setChangedList(temp);
      }
    } else {
      const index = changedList2.findIndex((ele) => ele.id === task.id);
      const temp = [...changedList2];
      if (index === -1) {
        temp.push({ ...task, users: [{ id: memberId, addMode: false }] });
        setChangedList2([...temp]);
      } else {
        const result = onItemChangedHandler(
          { id: memberId, addMode: false },
          changedList2[index].users,
          "id",
          "id"
        );
        if (result.length) {
          temp[index] = { ...task, users: result };
        } else {
          temp.splice(index, 1);
        }

        setChangedList2(temp);
      }
    }
    setSelectedTasks([...selectedTasks]);
    setSelectedTask({ ...task });
  };

  const onAddAllMember = (task) => {
    task.users = [...selectedMembers];
    setSelectedTasks([...selectedTasks]);
    setSelectedTask({ ...task });
  };

  const onRemoveAllMember = (task) => {
    task.users = [];
    setSelectedTasks([...selectedTasks]);
    setSelectedTask({ ...task });
  };

  const checkExistOneTaskName = (value) => {
    return selectedTasks.some((task) => task.name === value);
  };

  const onInputEnter = (event) => {
    const { value } = event.target;
    if (event.keyCode === 13 && value && !error) {
      onAddTaskHandler(value);
    }
  };

  const onInputChange = (value) => {
    if (checkExistOneTaskName(value)) {
      setError("Can't create task with same name!");
    } else {
      setError("");
    }
    setAddTaskInputValue(value);
  };
  return (
    <div className="tasks_form">
      <Table
        columns={columns}
        data={selectedTasks}
        skeletonLoading={false}
        onClickHandler={(ele) => setSelectedTask(ele)}
      />
      <div className="tasks_form__add">
        <input
          placeholder="Add more tasks ..."
          value={addTaskInputValue}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyUp={onInputEnter}
          maxLength="30"
          onFocus={(event) => {
            if (checkExistOneTaskName(event.target.value)) {
              setError("Can't create task with same name!");
            }
          }}
          onBlur={() => setError("")}
        />
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default TasksForm;
