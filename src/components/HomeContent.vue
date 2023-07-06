<template>
  <div>
    <h3 class="text-xl font-medium mb-1">Posts created by you</h3>
    <p v-if="!posts">
      Loading posts ...
    </p>
    <p v-if="posts && posts.length === 0">
      No posts exist so far.
    </p>
    <div v-if="posts && posts.length > 0">
      <ul v-for="post of posts" class="max-w-md divide-y divide-slate-200">
        <li class="flex flex-row items-center justify-between">
          <p class="text-lg py-2">{{post.text}}</p>
          <button @click.prevent="deletePost(post.id)" class="sm:whitespace-nowrap inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm duration-100 select-none bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-100">Delete</button>
        </li>
      </ul>
    </div>

    <form class="mt-5">
      <p class="text-xl font-medium mb-1">Add a post:</p>
      <div>
        <textarea v-model="text" formControlName="text" rows="4" class="block p-2.5 w-full max-w-md text-sm rounded-lg border border-slate-200 mb-2" placeholder="Your post ..."></textarea>
      </div>
      <button
        @click.prevent="createPost"
        class="sm:whitespace-nowrap inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm duration-100 select-none bg-primary text-white hover:bg-primary-hover active:bg-primary-active"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { useFirstline } from "@first-line/firstline-vue";
import { ref } from "vue";

const handleError = (e: any) => {
  console.error("Request failed.", e);
  window.alert("Request failed. Logged error to console. Is your backend running?");
}

export default {
  name: "HomeContent",
  setup() {
    const { getAccessToken } = useFirstline();
    const posts: any = ref(null);

    const loadPosts = async () => {
      try {
        const accessToken = await getAccessToken();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        posts.value = data;
      } catch (e) {
        handleError(e);
      }
    };
    loadPosts().then();

    return { posts, text: "", getAccessToken };
  },
  methods: {
    async deletePost(id: string) {
      try {
        const accessToken = await this.getAccessToken();
        await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const newPosts = this.posts || [];
        this.posts = newPosts.filter((post: any) => post.id !== id);
      } catch (e) {
        handleError(e);
      }
    },
    
    async createPost() {
      try {
        const data = { text: this.text };
        const accessToken = await this.getAccessToken();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const newPost = await response.json();

        const newPosts = this.posts || [];
        this.posts = [ ...newPosts, newPost ];
        this.text = "";
      } catch (e) {
        handleError(e);
      }
    }
  }
};
</script>
