import React from "react";
import { SortableElement } from "react-sortable-hoc";
import DragHandle from "./DragHandle";
import RichTextEditor from "react-rte";

const SortableItem = SortableElement(({item, currentlyDeleting, handleEdit, handleDelete, fieldList}) =>
  <div
    className="card"
    id={item._id} 
    key={`sortable-element-${item._id}`}
  >
    <DragHandle />
    {fieldList.map(field => 
      field.rte ? 
      field.value &&
        <RichTextEditor 
          value={field.value}
          readOnly={true}
          className='rte-card'
        />
      :
      field.content &&
        <div className="row-container" key={field.label}>
          <div className="card-label">{field.label}</div>
          <div className="card-content pre-wrap" dangerouslySetInnerHTML={{__html: field.content}} />
        </div>
    )}
    <button 
      type="button"
      title="Edit"
      className={`edit ${currentlyDeleting ? "edit-disabled" : ""}`}
      onClick={currentlyDeleting ? (e)=> e.preventDefault() : handleEdit}
      id={item._id}
      key={`edit-${item._id}`}
    >
      <i className="fa fa-pencil"></i>
    </button>
    <button 
      type="button"
      title="Delete" 
      className={`delete ${currentlyDeleting ? "delete-disabled" : ""}`}
      onClick={currentlyDeleting ? (e)=> e.preventDefault() : handleDelete}
      id={item._id}
      key={`delete-${item._id}`}
    >
      <i className="fa fa-trash"></i>
    </button>
  </div>
);

export default SortableItem;
