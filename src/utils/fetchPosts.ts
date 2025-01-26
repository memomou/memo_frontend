import { axiosInstance } from "../helpers/helper";
import { PostStatus, PostType } from "../types/post";

type PostsSetterFunction = React.Dispatch<React.SetStateAction<PostType[]>>;
type NextUrlSetterFunction = React.Dispatch<React.SetStateAction<string | null>>;

type FunctionList = [PostsSetterFunction, NextUrlSetterFunction];

interface FetchPostsParams {
  appendUrl?: string;
  requestParams?: {
    searchValue?: string;
    authorId?: number;
    categoryIds?: number[];
    statusId?: PostStatus;
  };
  funcList: FunctionList;
}

export const fetchPosts = async (params: FetchPostsParams) => {
  const [setPosts, setNextUrl] = params.funcList;

  try {
    const requestObj: [string, any] = params.appendUrl ?
      [params.appendUrl, {}] :
      ['posts', {
        params: {
          take: 15,
          content_or_title_include: params.requestParams?.searchValue,
          author_id: params.requestParams?.authorId,
          category_ids: params.requestParams?.categoryIds?.join(','),
          status_id: params.requestParams?.statusId
        }
      }];

    const response = await axiosInstance.get(requestObj[0], requestObj[1]);

    const fetchedPosts = response.data.posts.data.map((post: PostType) => ({
      ...post,
      content: post.content.replace(/<[^>]+>/g, '')
    }));

    setNextUrl(response.data.posts.next);
    setPosts(params.appendUrl ? prev => [...prev, ...fetchedPosts] : fetchedPosts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
};
