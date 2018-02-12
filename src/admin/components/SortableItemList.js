import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import SortableItem from "./SortableItem";

const SortableItemList = SortableContainer(({itemList, fieldList, itemType, currentlyDeleting, handleEdit, handleDelete, disabled}) => {
  return (
    <div>
      {itemList.map((item, index) => (
        <SortableItem 
          item={item} 
          key={`${itemType}-${item._id}`}
          index={index}
          currentlyDeleting={currentlyDeleting}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          disabled={disabled}
          fieldList={fieldList(item)}
        />
      ))}
    </div>
  );
});

export default SortableItemList;
