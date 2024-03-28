"use server";

import dayjs from "dayjs";
import { api } from "~/trpc/server";
import DashboardLayout from "./layout";
import { CreatePost } from "../_components/create-post";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

async function Pageview() {
  const data = await api.post.getAll();

  console.log(data);
  return (
    <DashboardLayout>
      <CreatePost />
      <div className="w-full max-w-xs">
        <div>
          {data?.map((post) => (
            <div key={post.id} className="flex items-center gap-2">
              <p>{post.name}</p>
              <p>{dayjs(post.createdAt).fromNow()}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Pageview;
