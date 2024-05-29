import React from "react";
import styles from "../styles/styles";
import EventCard from "./EventCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllevent } from "../redux/actions/eventAction";

const Event = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllevent());
  }, [dispatch]);

  console.log(allEvents);
  return (
    <React.Fragment>
      <div className={`${styles.section}`}>
        {!isLoading && (
          <>
            <div className={`${styles.heading}`}>
              <h1>Popular Events</h1>
            </div>
            <div className="w-full grid">
              <EventCard data={allEvents && allEvents[0]} />
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default Event;
