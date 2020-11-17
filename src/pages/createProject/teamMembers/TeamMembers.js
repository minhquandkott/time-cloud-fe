import "./TeamMembers.css";
import Table from "../../../components/table/Table";
import Checkbox from "../../../components/checkbox/Checkbox";
import SelectItem from "../../../components/selectItem/SelectItem";
import UserInfo from "../../../components/userInfo/UserInfo";
import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import MembersSearch from "./membersSearch/MembersSearch";
import history from "../../../history/index";

const TeamMembers = ({
  allMember,
  selectedMembers,
  setSelectedMembers,
  selectedManager,
  setSelectedManager,
  members,
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
        <SelectItem
          onClickHandler={() => {
            setSelectedMembers(
              selectedMembers.filter((ele) => ele.id !== element.id)
            );
          }}
        >
          <UserInfo
            primaryInfo={element.user.name}
            secondaryInfo={element.user.email}
            avatar={element.user.avatar}
            flag={selectedManager?.id === element.id ? "PM" : null}
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
            setSelectedManager(user);
          }}
          checked={user.id === selectedManager?.id}
        />
      ),
    },
  };

  useEffect(() => {
    if (allMember.length - 1 === selectedMembers.length) {
      setAddAllMode(false);
    } else {
      setAddAllMode(true);
    }
  }, [allMember, selectedMembers]);

  const onInvite = () => {
    history.push("/manage");
  };

  const onAddMember = (member) => {
    if (!selectedMembers.find((ele) => ele.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const onAddAllPeople = () => {
    setSelectedMembers([...members]);
  };

  const onRemoveAllPeople = () => {
    setSelectedMembers([]);
  };
  return (
    <div className="team_members">
      <Table
        skeletonLoading={false}
        columns={columns}
        data={selectedMembers}
        onClickHandler={(element, event) => 0}
      />
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
                // setAddAllMode(!addAllMode);
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
