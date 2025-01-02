import { axiosInstance } from '../../../../helpers/helper';

export const addComment = async ({ postId, content }: { postId: string, content: string }) => {
  const response = await axiosInstance.post(`/posts/${postId}/comments`, { content });
  console.log(response.data);
  return response.data;
};

export const getComments = async ({ postId }: { postId: string }) => {
  const response = await axiosInstance.get(`/posts/${postId}/comments`);
  return response.data;
};

export const deleteComment = async ({ postId, commentId }: { postId: string, commentId: string }) => {
  const response = await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);
  return response.data;
};

export const updateComment = async ({ postId, commentId, content }: {
  postId: string,
  commentId: string,
  content: string
}) => {
  const response = await axiosInstance.patch(`/posts/${postId}/comments/${commentId}`, { content });
  return response.data;
};