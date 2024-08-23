import styled from "styled-components";
import propTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabin = {} }) {
  const { id: editId } = cabin;
  const toEdit = Boolean(editId);
  const { createCabin, createLoad } = useCreateCabin();
  const { EditCabin, editLoad } = useEditCabin();

  const loading = createLoad || editLoad;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: toEdit ? cabin : {},
  });

  function onSubmit(newCabin) {

    const image = typeof newCabin.image === 'string' ? newCabin.image : newCabin.image[0];

    if (toEdit) EditCabin({cabin : {...newCabin, image: image}, id: editId});
    else createCabin({ ...newCabin, image: image }, {
      onSuccess: reset(),
    });

  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          disabled={loading}
          type="text"
          id="name"
          {...register("name", {
            required: "There is no cabin name",
            pattern: /^[0-9]*/,
          })}
          // defaultValue={cabin?.name}
        />
        <Error>{errors?.name?.message}</Error>
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          disabled={loading}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "there is no maximum capacity",
            min: {
              value: 3,
              message: "The maximum capacity should be at least 3",
            },
          })}
          // defaultValue={cabin?.maxCapacity}
        />
        <Error>{errors?.maxCapacity?.message}</Error>
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          disabled={loading}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Please enter some value price",
          })}
          // defaultValue={cabin?.regularPrice}
        />
        <Error>{errors?.regularPrice?.message}</Error>
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          disabled={loading}
          type="number"
          id="discount"
          {...register("discount", {
            required: true,
            validate: (value) =>
              getValues().regularPrice > value ||
              "The value should be lessthan the price",
            max: {
              value: getValues.price,
            },
          })}
          // defaultValue={cabin?.discount || 0}
          defaultValue={0}
        />
        <Error>{errors?.discount?.message}</Error>
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          disabled={loading}
          type="number"
          id="description"
          {...register("description")}
          // defaultValue={cabin?.description || ""}
          defaultValue=""
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          disabled={loading}
          id="image"
          accept="image/*"
          {...register("image", {
            required: toEdit ? false : "Photo is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={loading}>
          {toEdit ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabin: propTypes.object,
};

export default CreateCabinForm;
