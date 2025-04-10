export interface CommentCreate {
  suggestionId: string
  content: string
  commentedByUserId: string,
  parentId?: string
}
