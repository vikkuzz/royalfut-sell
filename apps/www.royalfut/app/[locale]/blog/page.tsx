import { posts } from "@royalfut/collections";
import BlogContent from "./BlogContent";

export default async function BlogPage() {
    return (
        <>
            <BlogContent posts={posts} />
        </>
    );
}
