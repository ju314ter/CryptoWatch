"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { CrossIcon, DeleteIcon } from "lucide-react";
import { createListFromPoolUrls } from "@/app/(app)/dashboard/actions";
import { toast } from "../ui/use-toast";
import { redirect } from "next/navigation";

export type ListCreateForm = {
  listName: string;
  format: "url" | "id";
  pools: { url: string }[];
};

const CreateListForm = () => {
  const [redirectToDashboard, setRedirectToDashboard] = useState(false); // State for redirect

  const { register, handleSubmit, control, watch } = useForm<ListCreateForm>({
    defaultValues: {
      listName: "",
      format: "url",
      pools: [{ url: "" }],
    },
  });

  const {
    fields: fieldPools,
    append: appendPool,
    remove: removePool,
  } = useFieldArray<ListCreateForm>({
    control,
    name: "pools",
  });

  const onSubmit: SubmitHandler<ListCreateForm> = async (data) => {
    const response = await createListFromPoolUrls(data);
    if (response && response.message) {
      toast({
        title: "List creation",
        description: response.message,
        variant: Object.keys(response.errors).length
          ? "destructive"
          : "default",
      });

      if (!Object.keys(response.errors).length) {
        setRedirectToDashboard(true); // Set redirect state
      }
    }
  };

  useEffect(() => {
    if (redirectToDashboard) {
      redirect("/dashboard"); // Perform redirect
    }
  }, [redirectToDashboard]);

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Input
          {...register("listName", { required: true })}
          type="text"
          placeholder="List name"
          required
        />
      </div>
      <RadioGroup defaultValue="url" {...register("format")}>
        <span>Select format</span>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="url" id="r1" />
          <Label htmlFor="r1">URLs</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="id" id="r2" />
          <Label htmlFor="r2">pool IDs</Label>
        </div>
      </RadioGroup>
      {fieldPools.map((pool, index) => (
        <div key={index} className="flex gap-2 items-center">
          <Input
            {...register(`pools.${index}.url`, { required: true })}
            type="text"
            required
            placeholder={`Add Defillama pool ${
              watch("format") === "url" ? "URL" : "ID"
            }`}
          />
          <Button
            variant="icon"
            size={"icon"}
            onClick={() => fieldPools.length > 1 && removePool(index)}
          >
            <DeleteIcon />
          </Button>
        </div>
      ))}
      <CrossIcon
        onClick={() => appendPool({ url: "" })}
        className="margin-x-auto my-2"
      />
      <div className="flex gap-2 justify-end pt-2">
        <DialogClose asChild>
          <Button variant="destructive">Cancel</Button>
        </DialogClose>

        <Button variant="outline" type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateListForm;
