import { posts } from "@royalfut/collections";
import BlogPostContent from "./BlogPostContent";

export default async function BlogPage({
    params,
}: {
    params: { post: string };
}) {
    return (
        <>
            <BlogPostContent posts={posts} params={params} />
        </>
    );
}
