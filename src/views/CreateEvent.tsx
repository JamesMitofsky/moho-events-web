import { Typography, Box } from "@mui/material";
import { GroupInfo, EmptyForm } from "../typeUtils";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TextInput from "../components/TextInput";
import SubmitEvent from "../components/SubmitEvent";
import MetaTags from "../components/MetaTags";
import AllTextInputs from "../components/AllTextInputs";

const NewEvent = () => {
  // track form data
  const emptyFormState: EmptyForm = {
    associationName: "",
    eventName: "",
    eventType: "",
    numberOfQuote: "",
    category: "",
    soldBy: "",
    comments: "",
    companyName: "",
    contactName: "",
    telephoneNumber: "",
    email: "",
    startTime: new Date(),
    endTime: new Date(),
  };
  const [formData, setFormData] = useState<GroupInfo>({
    ...emptyFormState,
    id: uuidv4(),
  });

  // track state of local storage to avoid overwriting it
  const [localChecked, setLocalChecked] = useState<boolean>(false);

  // check for pre-existing data before making React state the point of truth
  useEffect(() => {
    const localData = localStorage.getItem(
      import.meta.env.VITE_UNFINISHED_GROUP
    );
    if (localData) {
      setFormData(JSON.parse(localData));
    }
    setLocalChecked(true);
  }, []);

  // when form data changes, push immediately to local storage
  useEffect(() => {
    if (!localChecked) return;

    localStorage.setItem(
      import.meta.env.VITE_UNFINISHED_GROUP,
      JSON.stringify(formData)
    );
  }, [formData]);

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <MetaTags title="Créer un Evénement" />
      <Typography color="primary.main" variant="h2">
        Créer un Evénement
      </Typography>
      <Box
        component="form"
        sx={{
          m: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        noValidate
        autoComplete="off"
      >
        <AllTextInputs updateFormData={updateFormData} formData={formData} />
        <SubmitEvent
          emptyFormState={emptyFormState}
          formData={formData}
          setFormData={setFormData}
        />
      </Box>
    </>
  );
};

export default NewEvent;
