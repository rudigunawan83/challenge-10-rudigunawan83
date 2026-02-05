export const postKeys = {
  all: ["posts"] as const,

  profile: () => [...postKeys.all, "profile"] as const,

  statistic: (postId: string) =>
    [...postKeys.all, "statistic", postId] as const,
}
