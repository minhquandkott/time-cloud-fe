import "./TeamMembers.css";
import Table from "../../../components/table/Table";
import Checkbox from "../../../components/checkbox/Checkbox";
import SelectItem from "../../../components/selectItem/SelectItem";
import UserInfo from "../../../components/userInfo/UserInfo";
import React, { useState, useEffect } from "react";
import { fetchMembers } from "../../../redux/actions";
import { connect } from "react-redux";
import MembersSearch from "./membersSearch/MembersSearch";

const TeamMembers = ({
  selectedMembers,
  setSelectedMembers,
  selectedManager,
  setSelectedManager,
  fetchMembers,
  members,
}) => {
  useEffect(() => {
    fetchMembers(52);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onAddMember = (member) => {
    if (!selectedMembers.find((ele) => ele.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const onAddAllPeople = () => {
    setSelectedMembers([...members]);
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
                onAddAllPeople();
              }}
            >
              Add all people.
            </button>
          ) : null}
        </div>
        <div className="team_members__bottom_right">
          <p>Need to add some one?</p>
          <p>
            Go to <span>Manager &gt; People</span> to invite them to Project.
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

export default connect(mapStateToProps, {
  fetchMembers,
})(TeamMembers);
