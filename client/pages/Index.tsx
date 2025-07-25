import { useState } from "react";
import { X, Star, Heart, Bookmark, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Movie {
  id: number;
  title: string;
  year: number;
  poster: string;
  rating: number;
  userRating?: number;
  userReview: string;
  director: string;
  genre: string[];
  runtime: number;
  plot: string;
}

const movies: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    year: 2024,
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    rating: 8.7,
    userRating: 5,
    userReview: "Absolutely stunning visuals and an epic conclusion to Paul's journey. Villeneuve outdid himself.",
    director: "Denis Villeneuve",
    genre: ["Sci-Fi", "Drama", "Adventure"],
    runtime: 166,
    plot: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."
  },
  {
    id: 2,
    title: "Oppenheimer",
    year: 2023,
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    rating: 8.4,
    userRating: 4.5,
    userReview: "Nolan's masterpiece. The way he built tension around atomic theory is incredible.",
    director: "Christopher Nolan",
    genre: ["Biography", "Drama", "History"],
    runtime: 180,
    plot: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb."
  },
  {
    id: 3,
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    rating: 8.8,
    userRating: 5,
    userReview: "Animation perfection. Every frame is a work of art. The multiverse concept executed flawlessly.",
    director: "Joaquim Dos Santos",
    genre: ["Animation", "Action", "Adventure"],
    runtime: 140,
    plot: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence."
  },
  {
    id: 4,
    title: "The Batman",
    year: 2022,
    poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    rating: 7.8,
    userRating: 4,
    userReview: "Dark, gritty, and atmospheric. Pattinson brings a new dimension to the character.",
    director: "Matt Reeves",
    genre: ["Action", "Crime", "Drama"],
    runtime: 176,
    plot: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues."
  },
  {
    id: 5,
    title: "Top Gun: Maverick",
    year: 2022,
    poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    rating: 8.3,
    userRating: 4.5,
    userReview: "Pure cinema magic. Cruise delivers an emotional and thrilling ride that honors the original.",
    director: "Joseph Kosinski",
    genre: ["Action", "Drama"],
    runtime: 130,
    plot: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past."
  },
  {
    id: 6,
    title: "Everything Everywhere All at Once",
    year: 2022,
    poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    rating: 8.1,
    userRating: 5,
    userReview: "Wildly creative and deeply emotional. A masterclass in storytelling and visual effects.",
    director: "Daniels",
    genre: ["Comedy", "Drama", "Sci-Fi"],
    runtime: 139,
    plot: "A Chinese-American woman gets swept up in an insane adventure where she alone can save the world."
  },
  {
    id: 7,
    title: "Blade Runner 2049",
    year: 2017,
    poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    rating: 8.0,
    userRating: 4.5,
    userReview: "Visually stunning sequel that honors the original while telling its own compelling story.",
    director: "Denis Villeneuve",
    genre: ["Sci-Fi", "Drama"],
    runtime: 164,
    plot: "Young Blade Runner K discovers a secret that could plunge what's left of society into chaos."
  },
  {
    id: 8,
    title: "Interstellar",
    year: 2014,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.6,
    userRating: 5,
    userReview: "Nolan's space epic is both scientifically fascinating and emotionally powerful.",
    director: "Christopher Nolan",
    genre: ["Sci-Fi", "Drama"],
    runtime: 169,
    plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 9,
    title: "Parasite",
    year: 2019,
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    rating: 8.5,
    userRating: 5,
    userReview: "Bong Joon-ho's masterpiece. Sharp social commentary wrapped in thrilling filmmaking.",
    director: "Bong Joon-ho",
    genre: ["Thriller", "Drama", "Comedy"],
    runtime: 132,
    plot: "A poor family schemes to become employed by a wealthy family and infiltrate their household."
  },
  {
    id: 10,
    title: "Mad Max: Fury Road",
    year: 2015,
    poster: "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    rating: 8.1,
    userRating: 4.5,
    userReview: "Action cinema at its finest. Every chase sequence is a masterclass in practical effects.",
    director: "George Miller",
    genre: ["Action", "Adventure", "Sci-Fi"],
    runtime: 120,
    plot: "In a post-apocalyptic wasteland, Max teams up with a mysterious woman to flee a tyrannical warlord."
  },
  {
    id: 11,
    title: "The Grand Budapest Hotel",
    year: 2014,
    poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    rating: 8.1,
    userRating: 4,
    userReview: "Wes Anderson's visual poetry. Every frame is perfectly composed with whimsical storytelling.",
    director: "Wes Anderson",
    genre: ["Comedy", "Drama"],
    runtime: 99,
    plot: "A legendary concierge and his protégé become friends while involved in a murder mystery and theft."
  },
  {
    id: 12,
    title: "Her",
    year: 2013,
    poster: "https://image.tmdb.org/t/p/w500/lEIaL12hSkqqe83kgADkbUqEnvk.jpg",
    rating: 8.0,
    userRating: 4.5,
    userReview: "Deeply moving exploration of love and connection in the digital age. Phoenix is incredible.",
    director: "Spike Jonze",
    genre: ["Drama", "Romance", "Sci-Fi"],
    runtime: 126,
    plot: "A sensitive writer develops an unlikely relationship with an operating system designed to meet his every need."
  }
];

export default function Index() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [likedMovies, setLikedMovies] = useState<Set<number>>(new Set());
  const [watchlistMovies, setWatchlistMovies] = useState<Set<number>>(new Set());

  const toggleLike = (movieId: number) => {
    setLikedMovies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(movieId)) {
        newSet.delete(movieId);
      } else {
        newSet.add(movieId);
      }
      return newSet;
    });
  };

  const toggleWatchlist = (movieId: number) => {
    setWatchlistMovies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(movieId)) {
        newSet.delete(movieId);
      } else {
        newSet.add(movieId);
      }
      return newSet;
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-600" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-orange-500">Cinephile</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Films</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Reviews</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Lists</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Watchlist</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                Sign In
              </Button>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Track films you've watched.
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Save those you want to see. Tell your friends what's good.
          </p>
        </div>
      </section>

      {/* Popular Films Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Popular This Week</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <Dialog key={movie.id}>
                <DialogTrigger asChild>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-orange-500/25">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-auto aspect-[2/3] object-cover transition-all duration-300 group-hover:brightness-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h4 className="font-semibold text-sm line-clamp-2">{movie.title}</h4>
                        <p className="text-xs text-gray-300">{movie.year}</p>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full rounded-lg shadow-2xl"
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
                        <p className="text-gray-400 mb-4">
                          Directed by {movie.director} • {movie.year} • {movie.runtime} mins
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {movie.genre.map((g) => (
                            <Badge key={g} variant="outline" className="border-gray-600 text-gray-300">
                              {g}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {renderStars(movie.userRating || 0)}
                            </div>
                            <span className="text-sm text-gray-400">
                              {movie.userRating?.toFixed(1)}/5
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-800">
                              <Heart className="w-4 h-4 mr-1" />
                              Like
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-800">
                              <Bookmark className="w-4 h-4 mr-1" />
                              Watchlist
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-800">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Plot</h3>
                        <p className="text-gray-300 leading-relaxed">{movie.plot}</p>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">My Review</h3>
                        <p className="text-gray-300 italic">"{movie.userReview}"</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 mt-16">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-orange-500 mb-4">Cinephile</h3>
          <p className="text-gray-400 mb-6">
            The social network for film lovers.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Help</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
