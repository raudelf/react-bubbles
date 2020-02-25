import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    id: Date.now(),
    color: '',
    code: { hex: "" }
  })
  const [addColor, setAddColor] = useState(false);

  const toggleForm = e => {
    e.preventDefault();
    setAddColor(!addColor)
  }

  const handleSubmit = e => {
    axiosWithAuth()
      .post('/colors', newColor)
      .then(res => {
        updateColors({ ...colors, newColor})
      })
  }

  const handleChanges = e => {
    setNewColor({ ...newColor, [e.target.name]: e.target.value })
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('Color Update: ', res);
        updateColors(res.data)
      })
      .catch(err => {
        console.log('Error updating color: ', err)
      })
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log('Color Removed: ', res);
        window.location.reload()
        updateColors(res.data)
      })
      .catch(err => {
        console.log('Error removing color: ', err)
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.id} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div>
      <button onClick={toggleForm}>Add a Color</button>
      {addColor ? (
        <form className='addForm' onSubmit={handleSubmit}>
          <input 
          name='color'
          type='text'
          placeholder='Color Name'
          onChange={handleChanges}
          value={newColor.color}
          />
          <input 
          placeholder='# Enter Color Code'
          onChange={e => setNewColor({ ...newColor, code: { hex: e.target.value}})}
          value={newColor.code.hex}
          />
          <button>Add</button>
        </form>
      ): (<></>)}
      </div>
    </div>
  );
};

export default ColorList;
