export const endpoints = {
  originals: "discover/tv?with_networks=213",
  action: "discover/movie?with_genres=28",
  trending: "trending/all/week?language=en-US",
  comedy: "discover/movie?with_genres=35",
  horror: "discover/movie?with_genres=27",
  romance: "discover/movie?with_genres=10749",
  documentaries: "discover/movie?with_genres=99",
  video:(movieId)=>`/movie/${movieId}/videos?language=en-US`
};
