import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import "../style/model.scss"
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import { deleteEventApi, ShowEventsApi, closeEvent } from "../Redux/actions";
import { useNavigate } from "react-router-dom";

const Popping = ({open, handleClose, event, deleteEventApi, renderStatus, rerender})=> {
   const navigate = useNavigate();
   const {id, describe, title, start, end} = event;

   const handleDelete =async () => {
     await deleteEventApi(event.id);
     rerender(!renderStatus)
   }

   

   const modal = ()=>{
     return (
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title className="text-capitalize" style={{fontFamily: 'timesnewroman'}}>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p className="lead" style={{ fontFamily: 'timesnewroman' }}>
  {describe ? describe : "No Descriptions Yet"}
</p>
            <div className="row justify-content-between">
              <p className="col small text-muted text-center pb-0 mb-0" style={{fontFamily: 'timesnewroman'}}>from: {start}</p>
              <p className="col small text-muted text-center pb-0 mb-0" style={{fontFamily: 'timesnewroman'}}>to: {end}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
     
            <Button variant="warning" onClick={handleClose} style={{fontFamily: 'timesnewroman'}}>Close</Button>
            <Link to={`/event/${id}/update`}><Button variant="success" style={{fontFamily: 'timesnewroman'}}>Update</Button></Link>
            <Button variant="danger" onClick={handleDelete} style={{fontFamily: 'timesnewroman'}}>Delete</Button>
        </Modal.Footer>
      </Modal>
     )
   }

   if(id){
     return modal()
   }else{
     <p>there is no modal to preview</p>
   }
   
  }

  function mapStateToProps({event}){
     return {
       event,
      //  modalStatus
     }
  }
  
  export default connect(mapStateToProps, {deleteEventApi, closeEvent})(Popping)