import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ShowEventsApi, updateEventApi } from "../Redux/actions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

// Schema to validate event inputs
const schema = yup
  .object({
    title: yup.string().required("Title cannot be empty"),
    start: yup.date().required("Please specify a start time"),
    end: yup.date().required("You must specify an end date when updating"),
  })
  .required();

const UpdateEvent = ({ updateEventApi, event, error }) => {
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);
  const [dbError, setError] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (error && !firstRender) {
      setError(error);
    }
    if (!error?.start && !error?.end && dbError !== false) {
      setTimeout(() => navigate("/"), 1000);
    }
  }, [rerender, error, firstRender, dbError, navigate]);

  // Using react-hook-form to register event data
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: event.title,
      start: new Date(event.start),
      end: event.end ? new Date(event.end) : "",
      describe: event.describe || "No description was provided",
    },
  });

  const onSubmit = async (values) => {
    setFirstRender(false);
    updateEventApi(values, event.id).then((res) => {
      setRerender(!rerender);
      if (res === "response was successful") {
        navigate("/");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="align-content-center m-5">
      <div className="mb-4">
        <label htmlFor="title" className="form-label">
          Event Title
        </label>
        <input
          {...register("title")}
          type="text"
          placeholder="Title"
          className="form-control"
          id="title"
          aria-describedby="title"
        />
        <p
          className={`error text-warning position-absolute ${
            errors.title ? "active" : ""
          }`}
        >
          {errors.title && <i className="bi bi-info-circle me-2"></i>}
          {errors.title?.message}
        </p>
      </div>

      <div className="mb-4" style={{ zIndex: "100" }}>
        <label htmlFor="start" className="form-label">
          Start Date
        </label>
        <Controller
          control={control}
          name="start"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="form-control"
              id="start"
            />
          )}
        />
        <p
          className={`error text-warning position-absolute ${
            errors.start ? "active" : ""
          }`}
        >
          {errors.start && <i className="bi bi-info-circle me-2"></i>}
          {errors.start?.message}
        </p>
      </div>

      <div className="mb-4" style={{ zIndex: "100" }}>
        <label htmlFor="end" className="form-label">
          End Date
        </label>
        <Controller
          control={control}
          name="end"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select end date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              showTimeSelect
              className="form-control"
              id="end"
            />
          )}
        />
        <p
          className={`error text-warning position-absolute ${
            errors.end ? "active" : ""
          }`}
        >
          {errors.end && <i className="bi bi-info-circle me-2"></i>}
          {errors.end?.message}
        </p>
      </div>

      <div className="mb-4">
        <label htmlFor="describe" className="form-label">
          Event Description <span className="text-danger small">(Optional)</span>
        </label>
        <input
          {...register("describe")}
          type="text"
          placeholder="Describe your event"
          className="form-control"
          id="describe"
          aria-describedby="describe"
        />
      </div>

      <button type="submit" className="btn btn-warning">
        Update
      </button>
    </form>
  );
};

function mapStateToProps({ event, error }) {
  return {
    event,
    error,
  };
}

export default connect(mapStateToProps, { updateEventApi, ShowEventsApi })(
  UpdateEvent
);
