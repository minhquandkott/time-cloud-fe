import "./TasksForm.css";
import Table from "../../../components/table/Table";
import SelectItem from "../../../components/selectItem/SelectItem";
import MembersTaskSearch from "../createProjectForm/membersTaskSearch/MembersTaskSearch";
import React, { useState } from "react";

const TasksForm = ({ selectedMembers, selectedTasks, setSelectedTasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [addTaskInputValue, setAddTaskInputValue] = useState("");
  const columns = {
    people: {
      key: "action",
      width: "20%",
      convertData: (element) => (
        <SelectItem
          onClickHandler={() =>
            setSelectedTasks([
              ...selectedTasks.filter((ele) => ele.id !== element.id),
            ])
          }
        >
          <p
            style={{
              fontSize: "1.9rem",
              fontWeight: "550",
              textTransform: "capitalize",
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
          onMemberSelected={onMemberSelected}
          onMemberRemove={onMemberRemove}
          selectedTask={selectedTask}
          members={selectedMembers}
          onAddAllMember={onAddAllMember}
          onRemoveAllMember={onRemoveAllMember}
        />
      ),
    },
  };

  const onMemberSelected = (member) => {
    const temp = selectedTasks.find((task) => task.id === selectedTask.id);
    if (temp.users) {
      if (!temp.users.some((ele) => ele.id === member.id)) {
        temp.users = [...temp.users, member];
      }
    } else {
      temp.users = [member];
    }
    setSelectedTasks([...selectedTasks]);
    setSelectedTask({ ...temp });
  };

  const onMemberRemove = (memberId, task) => {
    task.users = [...task.users.filter((ele) => memberId !== ele.id)];

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
  return (
    <div className="tasks_form">
      <Table
        columns={columns}
        data={selectedTasks}
        skeletonLoading={false}
        onClickHandler={(ele) => setSelectedTask(ele)}
      />
      <input
        className="tasks_form__add"
        placeholder="Add more tasks ..."
        value={addTaskInputValue}
        onChange={(event) => setAddTaskInputValue(event.target.value)}
      />
    </div>
  );
};

export default TasksForm;
