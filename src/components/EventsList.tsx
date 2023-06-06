import groupEventsByDate from "@/functions/groupEventsByDate";
import trimDateString from "@/functions/trimDateString";
import useListenToAllEvents from "@/hooks/useListenToAllEvents";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Grid from "@mui/system/Unstable_Grid";
import { useMemo } from "react";
import { v4 as uuid4 } from "uuid";
import LinkToEvent from "./LinkToEvent";

type Props = {
  eventsFilter: "upcoming" | "past" | "all";
  order?: "asc" | "desc";
};

export default function EventsList({ eventsFilter, order = "asc" }: Props) {
  const events = useListenToAllEvents(eventsFilter);

  const eventsGroupedByDate = useMemo(() => {
    return events ? groupEventsByDate(events) : [];
  }, [events]);

  const eventsGroupedByDay = eventsGroupedByDate?.map((eventGroup) => {
    const trimmedDate = trimDateString(eventGroup[0]);
    const constructedGroup = eventGroup.map((event) => {
      return (
        <LinkToEvent
          key={event.id}
          event={event}
          eventDate={event.generalInfo?.dateAsISO}
        />
      );
    });
    return (
      <>
        <Grid xs={12} key={uuid4()}>
          <Typography sx={{ mt: 6, color: grey[700] }}>
            {trimmedDate}
          </Typography>
        </Grid>
        <Grid container spacing={2} xs={12}>
          {constructedGroup}
        </Grid>
      </>
    );
  });

  return (
    <Grid container spacing={2}>
      {order === "asc" ? eventsGroupedByDay : eventsGroupedByDay?.reverse()}
    </Grid>
  );
}
