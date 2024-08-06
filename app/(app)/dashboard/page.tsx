"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CirclePlus, MinusCircle, PlusCircle } from "lucide-react";
import CreateListForm from "@/components/form/createListForm";
import { deleteList, fetchUserLists } from "./actions";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const [lists, setLists] = useState<any[]>([]);
  const [selectedList, setSelectedList] = useState<any>(null);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      const { data } = await fetchUserLists();
      setLists(data);
    };
    fetchLists();
  }, []);

  useEffect(() => {
    if (redirectToDashboard) {
      redirect("/dashboard"); // Perform redirect
    }
  }, [redirectToDashboard]);

  return (
    <div className="flex w-full h-full gap-5">
      <div className="flex flex-col gap-2 basis-3 flex-grow">
        <div className="flex justify-between w-full gap-2">
          <Combobox
            onSelect={(value) => {
              const selectedList = lists.filter(
                (list: any) => value === list.id
              )[0];
              setSelectedList(selectedList);
            }}
            dataArray={lists.map((list: any) => ({
              value: list.id,
              label: list.name,
            }))}
          />
          <div className="bg-[#2A2A2A] bg-opacity-20 backdrop-blur-xl border border-primary hover:bg-primary rounded-md flex justify-between items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"icon"} size="icon" className="h-10 w-10">
                  <PlusCircle />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add pools to a custom list</DialogTitle>
                  <DialogDescription className="flex flex-col text-white pt-2"></DialogDescription>
                </DialogHeader>
                <CreateListForm />
              </DialogContent>
            </Dialog>
          </div>
          {selectedList && (
            <div className="bg-[#2A2A2A] bg-opacity-20 backdrop-blur-xl border border-primary hover:bg-primary rounded-md flex justify-between items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"icon"} size="icon" className="h-10 w-10">
                    <MinusCircle />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete or unfollow list ?</DialogTitle>
                    <DialogDescription className="flex flex-col text-white pt-2">
                      Are you sure ?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose>
                    <Button
                      variant={"destructive"}
                      onClick={async () => {
                        if (selectedList) {
                          const response = await deleteList(selectedList.id);
                          if (response && response.message) {
                            toast({
                              title: "List deletion",
                              description: response.message,
                              variant: Object.keys(response.errors).length
                                ? "destructive"
                                : "default",
                            });
                          }

                          setRedirectToDashboard(true);
                        } else {
                          console.error("Selected list does not exist.");
                        }
                      }}
                    >
                      Remove list
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
          )}
          <div className="bg-[#2A2A2A] bg-opacity-20 backdrop-blur-xl border border-primary rounded-md flex justify-between items-center p-2">
            Visualisation
          </div>
        </div>
        <div className="flex">
          <Table className="w-[100%] border-md">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Ticker</TableHead>
                <TableHead>Protocol</TableHead>
                <TableHead>Network</TableHead>
                <TableHead>APY/APR</TableHead>
                <TableHead>%24</TableHead>
                <TableHead>%W</TableHead>
                <TableHead>TVL</TableHead>
                <TableHead className="flex justify-end items-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedList &&
                selectedList.pools.map((pool: any) => (
                  <TableRow key={pool.url}>
                    <TableCell className="font-medium">{pool.name}</TableCell>
                    <TableCell>{pool.protocol}</TableCell>
                    <TableCell>{pool.blockchain}</TableCell>
                    <TableCell>{pool.apy?.toString()}%</TableCell>
                    <TableCell
                      className={
                        pool.apyPct1D && Number(pool.apyPct1D) > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {pool.apy?.toString()}%24
                    </TableCell>
                    <TableCell
                      className={
                        pool.apyPct7D && Number(pool.apyPct7D) > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {pool.apy?.toString()}%W
                    </TableCell>
                    <TableCell>{pool.tvl}</TableCell>

                    <TableCell className={"flex justify-end items-center"}>
                      ...
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <Input
                    placeholder="Enter pool URL or ID"
                    className="w-full"
                  />
                </TableCell>
                <TableCell colSpan={2} className="text-center">
                  <Button
                    variant="outline"
                    className="w-42 justify-center gap-2"
                  >
                    <CirclePlus className="h-4 w-4 duration-0" />
                    Add pools to a custom list
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
      <div className="flex flex-col justify-between basis-1 gap-5">
        <div className="h-20 bg-[#2A2A2A] bg-opacity-20 backdrop-blur-xl border border-primary flex justify-center items-center w-[25vw] min-w-[320px] rounded-[20px]">
          <p>Toast</p>
        </div>
        <div className="h-[50vh] bg-[#2A2A2A] grow bg-opacity-20 backdrop-blur-xl border border-primary flex justify-center items-center min-w-[320px] rounded-[20px]">
          <p>Alert Module</p>
        </div>
      </div>
    </div>
  );
}
