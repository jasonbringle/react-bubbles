import React, { useState } from "react";
import axiosWithAuth from "../util/axiosWithAuth";
import { useHistory } from 'react-router-dom'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [ addedColor, setAddedColor ] = useState(initialColor);


  const { push } = useHistory()

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit )
      .then(res => setEditing(false) )
      .catch(err => console.log( err.message, err.response))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const addColor = () => {
    axiosWithAuth()
    .post('/colors', addedColor )
    .then(res => console.log(res))
    .catch(err => console.log(err.message, err.response))
}

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(res => push('/private-route'), setEditing(false))
    .catch(err => console.log(err.message, err.response))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
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
      <div>
        <form onSubmit={addColor}>
        <legend>Add A Color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setAddedColor({ ...addedColor, color: e.target.value })
              }
              value={addedColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setAddedColor({
                  ...addedColor,
                  code: { hex: e.target.value }
                })
              }
              value={addedColor.code.hex}
            />
          </label>
        <button>Add Color</button>
        </form>
      </div>
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
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
