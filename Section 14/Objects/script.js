movies = [
  {name:"Hunt for Red October",
   rating: "5",
   hasWatched: true},
  {name:"Oh Brother, Whereart Thou?",
   rating: "4.5",
   hasWatched: true},
  {name:"Frozen",
   rating: "3.5",
   hasWatched: false},
  {name:"Les Miserables",
   rating: "4",
   hasWatched: true}
]

function buildString(movie) {
  if (movie.hasWatched === true) {
    return ('You have seen "' + movie.name + '" - ' + movie.rating + " stars.");
  }else {
    return ('You have not seen "' + movie.name + '" - ' + movie.rating + " stars.");
  }
}
movies.forEach(function(movie) {
  console.log(buildString(movie));
});
