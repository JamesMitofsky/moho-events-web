import { fetchAllEvents } from "../services/cloudFirestore";
import { useEffect, useState } from "react";
import { ListItem, List, ListItemText } from "@mui/material";
import { ModifiedServerResponse } from "../utils/globalTypes";
import { Link } from "react-router-dom";
import filterDateOrNumberToDate from "../utils/filterDateOrNumberToDate";

export default function EventsList() {
  const [events, setEvents] = useState<ModifiedServerResponse[]>([]);

  useEffect(() => {
    const getEvents = async function () {
      const res = await fetchAllEvents();
      setEvents(res);
    };
    getEvents();
  }, []);

  return (
    <List>
      {events.map((event) => {
        const eventName = event.society?.eventName;
        const associationName = event.society?.associationName;

        const dateFromServer = event.program?.eventDate as {
          seconds: number;
        };

        const formattedDate = dateFromServer
          ? filterDateOrNumberToDate(dateFromServer.seconds).toLocaleDateString(
              "fr-FR",
              {
                weekday: "long",
                month: "long",
                day: "numeric",
              }
            )
          : "Pas de date";

        console.log(typeof dateFromServer, dateFromServer);

        return (
          <Link key={event.docId} to={`/evenement/${event.docId}`}>
            <ListItem divider>
              <ListItemText
                primary={`${eventName} - ${associationName}`}
                secondary={formattedDate}
              />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
}
