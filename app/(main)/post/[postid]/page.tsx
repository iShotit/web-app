import { Metadata } from "next";
import SinglePostClient from "./SinglePostClient";

type Props = {
  params: { postid: string };
};

async function getPost(postid: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_NEWSMGT}/posts/${postid}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching post for metadata:", error);
    return null;
  }
}

function isVideo(url: string): boolean {
  const videoExtensions = [".mp4", ".webm", ".mov", ".avi", ".mkv"];
  return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
}

function getThumbnailUrl(videoUrl: string): string {
  if (videoUrl.includes("cloudinary.com")) {
    return videoUrl
      .replace("/video/upload/", "/video/upload/so_0,w_640,h_360,c_fill/")
      .replace(/\.(mp4|webm|mov)$/i, ".jpg");
  }
  const filename = videoUrl.split("/").pop()?.replace(/\.[^.]+$/, "");
  if (filename) {
    return `https://cdn.ishot-it.com/thumbnails/${filename}.jpg`;
  }
  return videoUrl;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.postid);

  if (!post) {
    return {
      title: "Post | iShot It",
      description: "Check out this amazing content on iShot It!",
    };
  }

  const postText = post.post || "Check out this shot!";
  const description = post.post || "Amazing content on iShot It!";
  const mediaUrl = post.media?.[0] || "";
  const hasVideo = mediaUrl && isVideo(mediaUrl);
  const thumbnailUrl = hasVideo ? getThumbnailUrl(mediaUrl) : mediaUrl;

  const openGraph: Metadata["openGraph"] = {
    title: postText.slice(0, 60) || "Check out this shot!",
    description: description.slice(0, 160) || "Amazing content on iShot It!",
    siteName: "iShot It",
    locale: "en_US",
    type: "website",
  };

  if (thumbnailUrl) {
    openGraph.images = [
      {
        url: thumbnailUrl,
        width: 640,
        height: 360,
        alt: postText,
      },
    ];
  }

  if (hasVideo) {
    openGraph.type = "video.other";
    openGraph.videos = [
      {
        url: mediaUrl,
        type: "video/mp4",
        width: 640,
        height: 360,
      },
    ];
  }

  return {
    title: `${postText.slice(0, 50)} | iShot It`,
    description: description.slice(0, 160),
    openGraph,
    twitter: {
      card: hasVideo ? "player" : "summary_large_image",
      title: postText.slice(0, 60) || "Check out this shot!",
      description: description.slice(0, 160) || "Amazing content on iShot It!",
      images: thumbnailUrl ? [thumbnailUrl] : [],
    },
  };
}

export default function SinglePostPage({ params }: Props) {
  return <SinglePostClient postid={params.postid} />;
}
