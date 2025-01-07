import React from "react";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";
export type startupcardtype = Omit<Startup, "author"> & { author?: Author };
const StartupCard = ({ post }: { post: startupcardtype }) => {
  console.log(post);
  return (
    <li className="startup-card group">
      <div className="flex justify-between items-center">
        <p className="startup_card_date">{formatDate(post._createdAt)}</p>

        <div className="flex gap-1.5 items-center">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-14-semibold">{post.views}</span>
        </div>
      </div>

      <div className="flex justify-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.author?._id}`}>
            <p className="text-16-medium line-clamp-1">{post.author?.name}</p>
          </Link>
          <Link href={`/startup/${post._id}`}>
            <h3 className="text-26-semibold line-clamp-1">{post.title}</h3>
          </Link>
        </div>
        <Link href={`/startup/${post._id}`}>
          <Image
            src={post.author.image}
            alt="placeholder"
            className=" rounded-full"
            width={48}
            height={48}
          />
        </Link>
      </div>

      <Link href={`/startup/${post._id}`}>
        <p className="startup-card_desc">{post.description}</p>

        <img src={post.image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${post.category?.toLowerCase()}`}>
          <p className="text-16-medium">{post.category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${post._id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};
export const StartupCardSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map((index) => (
        <li key={index} className="startup-card group animate-pulse">
          <div className="flex justify-between items-center">
            <Skeleton className="w-24 h-4" />
            <div className="flex gap-1.5 items-center">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-12 h-4" />
            </div>
          </div>

          <div className="flex justify-between mt-5 gap-5">
            <div className="flex-1">
              <Skeleton className="w-32 h-4 mb-2" />
              <Skeleton className="w-48 h-4" />
            </div>
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>

          <Skeleton className="w-full h-20 mt-4 mb-4" />
          <Skeleton className="w-full h-28 rounded-lg" />

          <div className="flex-between gap-3 mt-5">
            <Skeleton className="w-24 h-4 rounded-md" />
            <Skeleton className="w-24 h-4 rounded-md" />
          </div>
        </li>
      ))}
    </>
  );
};

export default StartupCard;
