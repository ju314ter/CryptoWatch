"use server";
import { ListCreateForm } from "@/components/form/createListForm";
import { getAuthSession } from "@/prisma/auth";
import { Prisma, PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const createListFromPoolUrls = async (formData: ListCreateForm) => {
  // Check form data format and create pool urls if format is set to IDs
  const poolUrls =
    formData.format === "url"
      ? formData.pools
      : formData.pools.map((pool) => ({
          pool,
          url: `https://defillama.com/yields/pool/${pool.url}`,
        }));

  const session = (await getAuthSession()) satisfies Session | null;
  if (!session || !session.user.id) {
    return {
      message: "Unauthorized",
      data: [],
      errors: { 401: "Unauthorized" },
    };
  }

  const creator = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!creator) {
    return {
      message: "Unauthorized",
      data: [],
      errors: { 401: "Unauthorized" },
    };
  }

  // Look for each pool to add to the list in the database
  const pools = await prisma.pool.findMany({
    where: {
      url: {
        in: poolUrls.map((pool) => pool.url),
      },
    },
  });
  if (!pools.length) {
    console.log("No pools found");
    return {
      message: "None of the provided pools exist",
      data: [],
      errors: { 400: "None of the provided pools exist" },
    };
  }

  try {
    await prisma.list.create({
      data: {
        name: formData.listName,
        creatorId: creator.id,
        pools: {
          connect: pools.map((pool) => ({
            id: pool.id,
          })),
        },
      },
      include: {
        creator: true,
      },
    });
    return { message: "List created successfully !", data: [], errors: {} };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      console.log(e.message);
      return {
        message: e.message,
        data: [],
        errors: { [e.code]: e.message },
      };
    }
  }
};

export const deleteList = async (listId: string) => {
  const session = (await getAuthSession()) satisfies Session | null;
  if (!session || !session.user.id) {
    return { message: "Unauthorized Session", data: [], errors: {} };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!user) {
    return { message: "Unauthorized User", data: [], errors: {} };
  }

  try {
    await prisma.list.delete({
      where: {
        id: listId,
      },
    });

    revalidatePath("/dashboard");
    return { message: "List deleted successfully !", data: [], errors: {} };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      console.log(e.message);
      return {
        message: e.message,
        data: [],
        errors: { [e.code]: e.message },
      };
    }
  }
};

export const fetchUserLists = async () => {
  const session = (await getAuthSession()) satisfies Session | null;
  if (!session || !session.user.id) {
    return { message: "Unauthorized Session", data: [], errors: {} };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!user) {
    return { message: "Unauthorized User", data: [], errors: {} };
  }

  const lists = await prisma.list.findMany({
    where: {
      OR: [
        {
          creatorId: user.id,
        },
        {
          followers: {
            some: {
              id: user.id,
            },
          },
        },
      ],
    },
    include: { pools: true },
  });

  return { message: "Success", data: lists, errors: {} };
};
