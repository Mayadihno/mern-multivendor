import React from "react";
import EventCard from "../../HomeComp/EventCard";

const EventPage = () => {
  return (
    <React.Fragment>
      <EventCard active={true} />
      <EventCard active={true} />
    </React.Fragment>
  );
};

export default EventPage;
