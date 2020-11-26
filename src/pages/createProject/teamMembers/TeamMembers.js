import "./TeamMembers.css";
import Table from "../../../components/table/Table";
import Checkbox from "../../../components/checkbox/Checkbox";
import SelectItem from "../../../components/selectItem/SelectItem";
import UserInfo from "../../../components/userInfo/UserInfo";
import React, { useState, useEffect } from "react";
import {
  onItemChangedHandler,
  onListChangedHandler,
} from "../../../utils/Utils";
import { connect } from "react-redux";
import MembersSearch from "./membersSearch/MembersSearch";
import history from "../../../history/index";
import { colors } from "@material-ui/core";

const TeamMembers = ({
  selectedMembers,
  setSelectedMembers,
  selectedManager,
  setSelectedManager,
  members,
  changedList,
  setChangedList,
}) => {
  const [addAllMode, setAddAllMode] = useState(true);
  const columns = {
    people: {
      key: "action",
      width: "80%",
      convertHeader: () => (
        <p
          style={{
            textAlign: "left",
            paddingLeft: "5rem",
          }}
        >
          People
        </p>
      ),
      convertData: (element) => (
        <SelectItem onClickHandler={() => onRemoveMember(element)}>
          <UserInfo
            primaryInfo={element.user.name}
            secondaryInfo={element.user.email}
            avatar={element.user.avatar}
            flag={selectedManager?.id === element.id ? "PM" : null}
            cssFlag={{
              backgroundColor: "var(--color-error)",
              color: "white",
              padding: "0rem .5rem",
              borderRadius: ".5rem",
            }}
          />
        </SelectItem>
      ),
      cssData: {
        textAlign: "center",
      },
    },
    projectManager: {
      key: "name",
      label: "Project Manager",
      width: "20%",
      cssHeader: {
        textAlign: "left",
      },
      convertData: (user) => (
        <Checkbox
          showUnCheck={true}
          id={user.id + ""}
          onCheckboxChanged={(event) => {
            if (event.target.checked) {
              setSelectedManager(user);
            } else {
              setSelectedManager(null);
            }
          }}
          checked={user.id === selectedManager?.id}
        />
      ),
    },
  };

  useEffect(() => {
    if (members.length === selectedMembers.length) {
      setAddAllMode(false);
    } else {
      setAddAllMode(true);
    }
  }, [members, selectedMembers]);

  const onInvite = () => {
    history.push("/manage");
  };

  const onRemoveMember = (member) => {
    const key = "id";
    const temp = onItemChangedHandler(
      { ...member, addMode: false },
      changedList,
      key,
      key
    );
    setChangedList(temp);
    setSelectedMembers(selectedMembers.filter((ele) => ele.id !== member.id));
  };

  const onAddMember = (member) => {
    const key = "id";
    const temp = onItemChangedHandler(
      { ...member, addMode: true },
      changedList,
      key,
      key
    );
    setChangedList(temp);
    setSelectedMembers([...selectedMembers, member]);
  };

  const onAddAllPeople = () => {
    const temp = members
      .filter((member) => !selectedMembers.some((ele) => ele.id === member.id))
      .map((member) => {
        return { ...member, addMode: true };
      });

    const result = onListChangedHandler(temp, changedList, "id", "id");
    setChangedList(result);
    setSelectedMembers([...selectedMembers, ...temp]);
  };

  const onRemoveAllPeople = () => {
    const temp = selectedMembers.map((member) => {
      return { ...member, addMode: false };
    });
    const result = onListChangedHandler(temp, changedList, "id", "id");
    setChangedList(result);
    setSelectedMembers([]);
  };
  return (
    <div className="team_members">
      <Table skeletonLoading={false} columns={columns} data={selectedMembers} />
      <div className="team_members__bottom">
        <div className="team_members__bottom_left">
          <MembersSearch
            dataList={members}
            onSelectItem={onAddMember}
            selectedMembers={selectedMembers}
          />
          {selectedMembers ? (
            <button
              className="project_form__button"
              onClick={() => {
                if (addAllMode) {
                  onAddAllPeople();
                } else {
                  onRemoveAllPeople();
                }
              }}
            >
              {addAllMode ? "Add all people" : "Remove all people"}
            </button>
          ) : null}
        </div>
        <div className="team_members__bottom_right">
          <p>Need to add some one?</p>
          <p>
            Go to <span onClick={() => onInvite()}>Manager &gt; People</span> to
            see all Members.
          </p>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { members } = state.members;
  return {
    members: members.filter(
      (ele) => ele.id !== parseInt(localStorage.getItem("userId"))
    ),
  };
};

export default connect(mapStateToProps)(TeamMembers);
