"use server";
import { revalidateTag } from "next/cache";

export async function refetchData() {
  revalidateTag("poll");
}
