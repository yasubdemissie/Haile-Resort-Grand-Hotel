import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

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

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("cabin has been created");
      reset();
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => toast.error("cabin has not been created"),
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(newCabin) {
    // mutate(newCabin);
    console.log({...newCabin, image: newCabin.image[0]});
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          disabled={isLoading}
          type="text"
          id="name"
          {...register("name", {
            required: "There is no cabin name",
            pattern: /^[0-9]*/,
          })}
        />
        <Error>{errors?.name?.message}</Error>
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          disabled={isLoading}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "there is no maximum capacity",
            min: {
              value: 3,
              message: "The maximum capacity should be at least 3",
            },
          })}
        />
        <Error>{errors?.maxCapacity?.message}</Error>
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          disabled={isLoading}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Please enter some value price",
          })}
        />
        <Error>{errors?.regularPrice?.message}</Error>
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          disabled={isLoading}
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
          defaultValue={0}
        />
        <Error>{errors?.discount?.message}</Error>
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          disabled={isLoading}
          type="number"
          id="description"
          {...register("description")}
          defaultValue=""
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput disabled={isLoading} id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
