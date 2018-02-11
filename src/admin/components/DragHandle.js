import React from "react";
import { SortableHandle } from "react-sortable-hoc";

const handleStyle = {
  position: "absolute",
  left: 10,
  top: "50%",
  transform: "translateY(-50%)",
  color: "#afafaf",
  fontSize: "1.5em",
  cursor: "move",
}

const DragHandle = SortableHandle(() => 
<div style={handleStyle}>
  <div>
    <i className="fa fa-ellipsis-v" style={{marginRight: 3}}></i>
    <i className="fa fa-ellipsis-v"></i>
  </div>
  <div>
    <i className="fa fa-ellipsis-v" style={{marginRight: 3}}></i>
    <i className="fa fa-ellipsis-v"></i>
  </div>
</div>
);

export default DragHandle;