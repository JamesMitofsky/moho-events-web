import { useParams } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import PageTitle from "../components/Layouts/PageTitle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ReturnHome from "../components/ReturnHome";
import { fetchSpecificEvent } from "../services/cloudFirestore";
import { useEffect, useState } from "react";
import { ModifiedServerResponse } from "../utils/globalTypes";
import DisplaySociety from "../components/DisplayInfo/DisplaySociety";
import DisplayContact from "../components/DisplayInfo/DisplayContact";

export default function RenderEventInfo() {
  const { eventId } = useParams<{ eventId: string }>();

  const [eventData, setEventData] = useState<ModifiedServerResponse>(
    {} as ModifiedServerResponse
  );

  // query firebase suing the eventId
  useEffect(() => {
    const getEvent = async function () {
      const res = await fetchSpecificEvent(eventId as string);
      setEventData(res);
    };
    getEvent();
  }, [eventId]);

  return (
    <>
      <ReturnHome />
      {/* have the grid display two columns when the page is wide enough to allow */}
      <PageTitle
        title={eventData?.society?.eventName}
        subtitle="événement"
        icon={EventAvailableIcon}
      />
      <Grid
        container
        rowSpacing={{ xs: 5, sm: 10, md: 15 }}
        columnSpacing={{ xs: 1, sm: 10, md: 20 }}
      >
        <Grid>
          {eventData?.society && <DisplaySociety {...eventData.society} />}
        </Grid>
        <Grid>
          {eventData?.contact && <DisplayContact {...eventData.contact} />}
        </Grid>
      </Grid>
    </>
  );
}
