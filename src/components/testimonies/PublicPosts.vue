<template>
  <div>
    <app-posts :config="config" :show-composer="showComposer"></app-posts>
  </div>
</template>
<script>
import $auth from '@/services/auth';
import AppPosts from '@/components/general/Posts.vue';
import ListTestimonies from '@/gql/testimonies/ListTestimonies.gql';
import GetTestimony from '@/gql/testimonies/GetTestimony.gql';
import InsertTestimony from '@/gql/testimonies/InsertTestimony.gql';
import UpdateTestimony from '@/gql/testimonies/UpdateTestimony.gql';
import DeleteTestimony from '@/gql/testimonies/DeleteTestimony.gql';
import InsertTestimonyReaction from '@/gql/testimonies/InsertTestimonyReaction.gql';
import DeleteTestimonyReaction from '@/gql/testimonies/DeleteTestimonyReaction.gql';
import InsertTestimonyComment from '@/gql/testimonies/InsertTestimonyComment.gql';
import DeleteTestimonyComment from '@/gql/testimonies/DeleteTestimonyComment.gql';

export default {
  props: {
    showComposer: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    AppPosts,
  },
  data() {
    return {
      config: {
        listQuery: ListTestimonies,
        listQueryParams: {
          user_id: $auth.getUserId(),
        },
        getPostQuery: GetTestimony,
        updatePostMutation: UpdateTestimony,
        insertPostMutation: InsertTestimony,
        deletePostMutation: DeleteTestimony,
        insertPostReactionMutation: InsertTestimonyReaction,
        deletePostReactionMutation: DeleteTestimonyReaction,
        insertPostCommentMutation: InsertTestimonyComment,
        deletePostCommentMutation: DeleteTestimonyComment,
      },
    };
  },
};
</script>
