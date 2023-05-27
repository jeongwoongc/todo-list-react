import React, { useState } from "react";

function EditableList({ item, index, updateList, handleDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(item);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedValue(item);
  };

  const handleSave = () => {
    if (editedValue.trim() !== "") {
      setIsEditing(false);
      updateList(index, editedValue);
    }
  };

  const handleDeleteItem = () => {
    handleDelete(index);
  };

  const handleChange = e => {
    setEditedValue(e.target.value);
  };

  return (
    <div className="editableList">
      {isEditing ? (
        <>
          <input className="editInput" type="text" value={editedValue} onChange={handleChange} />
          <div className="editButtons">
            <button className="editButton" onClick={handleSave}>
              Save
            </button>
            <button className="editButton" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="listItem">{item}</div>
          <div className="editButtons">
            <button className="editButton" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default EditableList;
