import TimeRangePicker from "./TimeRangePicker";
import { Control } from "react-hook-form";
import {
  AllEventGroupPaths,
  AllEventGroups,
  EventComponent,
  nameof,
} from "../../utils/globalTypes";
import SelectMohoRoom from "./SelectMohoRoom";

interface Props {
  parentObj: string;
  control: Control<AllEventGroups>;
}

export const TimeAndPlaceInput = ({ parentObj, control }: Props) => {
  const timeProp = `${parentObj}.${nameof<EventComponent>(
    "time"
  )} }` as AllEventGroupPaths;
  const placeProp = `${parentObj}.${nameof<EventComponent>(
    "place"
  )} }` as AllEventGroupPaths;

  return (
    <>
      <SelectMohoRoom
        control={control}
        propLabel={placeProp}
        textLabel="Lieu"
      />
      <TimeRangePicker control={control} dataLabel={timeProp} />
    </>
  );
};
