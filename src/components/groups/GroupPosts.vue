<template>
  <app-posts :config="config"></app-posts>
</template>
<script>
import $auth from '@/services/auth';
import AppPosts from '@/components/general/Posts.vue';
import ListPosts from '@/gql/groupposts/ListPosts.gql';
import GetPost from '@/gql/groupposts/GetPost.gql';
import InsertPost from '@/gql/groupposts/InsertPost.gql';
import UpdatePost from '@/gql/groupposts/UpdatePost.gql';
import DeletePost from '@/gql/groupposts/DeletePost.gql';
import InsertPostReaction from '@/gql/groupposts/InsertPostReaction.gql';
import DeletePostReaction from '@/gql/groupposts/DeletePostReaction.gql';
import InsertPostComment from '@/gql/groupposts/InsertPostComment.gql';
import DeletePostComment from '@/gql/groupposts/DeletePostComment.gql';

export default {
  components: {
    AppPosts,
  },
  props: {
    group_id: {
      required: true,
    },
  },
  data() {
    return {
      config: {
        listQuery: ListPosts,
        listQueryParams: {
          user_id: $auth.getUserId(),
          group_id: this.group_id,
        },
        getPostQuery: GetPost,
        updatePostMutation: UpdatePost,
        insertPostMutation: InsertPost,
        deletePostMutation: DeletePost,
        insertPostReactionMutation: InsertPostReaction,
        deletePostReactionMutation: DeletePostReaction,
        insertPostCommentMutation: InsertPostComment,
        deletePostCommentMutation: DeletePostComment,
      },
    };
  },
};
</script>
