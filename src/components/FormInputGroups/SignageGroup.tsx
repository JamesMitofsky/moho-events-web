import { SignageLocationAndText } from "@/types/globalTypes";
import SignpostIcon from "@mui/icons-material/Signpost";
import { useFieldArray } from "react-hook-form-mui";
import AddButton from "../buttons/AddButton";
import ControlledTextField from "../inputs/ControlledTextField";
import TextEditor from "../inputs/TextEditor";
import TitledArrayOfElements from "../layouts/TitledArrayOfElements";
import { TitledGroup } from "../layouts/TitledGroup";

export default function SignageGroup() {
  const { fields, append } = useFieldArray({
    name: "signage.locationAndText",
  });

  const handleAdd = () => {
    const blankConfiguration: SignageLocationAndText = {
      location: "",
      text: "",
    };
    append(blankConfiguration);
  };

  return (
    <TitledGroup icon={SignpostIcon} title="Signalétique">
      {fields.map((field, index) => (
        <TitledArrayOfElements
          key={field.id}
          label="Signalétique"
          index={index}
          listLength={fields.length}
        >
          <ControlledTextField
            fullWidth
            label="L'endoit"
            name={`signage.locationAndText.${index}.location`}
          />
          <ControlledTextField
            fullWidth
            label="Contenu"
            name={`signage.locationAndText.${index}.text`}
          />
        </TitledArrayOfElements>
      ))}
      <AddButton onClick={handleAdd} label="Signalétique" />
      <TextEditor displayLabel="Remarques" objLabel="signage.comments" />
    </TitledGroup>
  );
}
