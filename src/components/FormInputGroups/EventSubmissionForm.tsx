import { useForm, SubmitHandler } from "react-hook-form";
import { ContactGroup } from "./ContactGroup";
import { SocietyGroup } from "./SocietyGroup";
import { SignageGroup } from "./SignageGroup";
import { WifiGroup } from "./WifiGroup";
import { RestoGroup } from "./RestoGroup";
import { PaddedChildren } from "../Layouts/PaddedChildren";
import { Button } from "@mui/material";
import { ProgramGroup } from "./ProgramGroup";

import {
  SocietyInputs,
  ProgramInputs,
  WifiInputs,
  ContactInputs,
  SignageInputs,
} from "../../utils/globalTypes";

const EventSubmissionForm = () => {
  type Inputs = {
    society: SocietyInputs;
    contact: ContactInputs;
    program: ProgramInputs;
    wifi: WifiInputs;
    signage: SignageInputs;
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: {} });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("program.organiserArrival.time")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <PaddedChildren padding={3}>
        <SocietyGroup register={register} />
        <ContactGroup register={register} />
        <ProgramGroup register={register} />
        <SignageGroup register={register} />
        <WifiGroup register={register} />
        <RestoGroup register={register} />

        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Submit
        </Button>
      </PaddedChildren>
    </>
  );
};

export default EventSubmissionForm;
