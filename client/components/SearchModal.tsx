'use client';

import { useState, useEffect } from 'react';
import { Search, X, ShoppingBag, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface SearchResult {
  id: string;
  type: 'team' | 'product' | 'category';
  title: string;
  subtitle?: string;
  url: string;
  image?: string;
  price?: string;
  badge?: string;
}

// Mock search data - in production this would come from your API
const searchData: SearchResult[] = [
  // Teams
  { id: '1', type: 'team', title: 'Kansas City Chiefs', subtitle: 'NFL Team', url: '/nfl/chiefs', image: '/placeholder.svg' },
  { id: '2', type: 'team', title: 'Dallas Cowboys', subtitle: 'NFL Team', url: '/nfl/cowboys', image: '/placeholder.svg' },
  { id: '3', type: 'team', title: 'Alabama Crimson Tide', subtitle: 'NCAA Team', url: '/ncaa/crimson-tide', image: '/placeholder.svg' },
  { id: '4', type: 'team', title: 'Ohio State Buckeyes', subtitle: 'NCAA Team', url: '/ncaa/buckeyes', image: '/placeholder.svg' },
  
  // Products
  { id: '5', type: 'product', title: 'Chiefs Jersey', subtitle: 'Patrick Mahomes #15', url: '/products/chiefs-jersey', price: '$89.99', image: '/placeholder.svg', badge: 'Popular' },
  { id: '6', type: 'product', title: 'Cowboys Hat', subtitle: 'Classic Navy Blue', url: '/products/cowboys-hat', price: '$29.99', image: '/placeholder.svg' },
  { id: '7', type: 'product', title: 'Alabama Hoodie', subtitle: 'Crimson Tide Champions', url: '/products/alabama-hoodie', price: '$54.99', image: '/placeholder.svg', badge: 'Sale' },
  
  // Categories
  { id: '8', type: 'category', title: 'NFL Jerseys', subtitle: 'All team jerseys', url: '/jerseys?league=nfl' },
  { id: '9', type: 'category', title: 'NCAA Hats', subtitle: 'College team headwear', url: '/hats?league=ncaa' },
  { id: '10', type: 'category', title: 'Custom Gear', subtitle: 'Design your own', url: '/custom' },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('fan-waves-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    // Add to recent searches
    const newRecents = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(newRecents);
    localStorage.setItem('fan-waves-recent-searches', JSON.stringify(newRecents));
    
    setQuery(searchQuery);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('fan-waves-recent-searches');
  };

  const handleResultClick = (result: SearchResult) => {
    handleSearch(result.title);
    onClose();
  };

  if (!isOpen) return null;

  const popularSearches = ['Chiefs Jersey', 'Cowboys', 'Alabama', 'Custom Jersey', 'NFL Hats'];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-2xl mx-auto mt-20">
          <Card className="shadow-2xl">
            <CardContent className="p-0">
              {/* Search Header */}
              <div className="flex items-center p-4 border-b">
                <Search className="h-5 w-5 text-muted-foreground mr-3" />
                <Input
                  placeholder="Search teams, products, gear..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0 text-lg"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Search Content */}
              <div className="max-h-96 overflow-y-auto">
                {!query && (
                  <div className="p-4 space-y-4">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium text-muted-foreground">Recent Searches</h3>
                          <Button variant="ghost" size="sm" onClick={clearRecentSearches}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="cursor-pointer hover:bg-secondary/80"
                              onClick={() => setQuery(search)}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {search}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Popular Searches</h3>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((search, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            onClick={() => setQuery(search)}
                          >
                            {search}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Search Results */}
                {query && (
                  <div className="p-4">
                    {isLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="text-sm text-muted-foreground mt-2">Searching...</p>
                      </div>
                    ) : results.length > 0 ? (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground mb-3">
                          {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                        </h3>
                        {results.map((result) => (
                          <Link
                            key={result.id}
                            to={result.url}
                            onClick={() => handleResultClick(result)}
                            className="block"
                          >
                            <div className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors">
                              {result.image && (
                                <img
                                  src={result.image}
                                  alt={result.title}
                                  className="w-10 h-10 rounded object-cover mr-3"
                                />
                              )}
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium truncate">{result.title}</h4>
                                  {result.badge && (
                                    <Badge variant="secondary" className="text-xs">
                                      {result.badge}
                                    </Badge>
                                  )}
                                </div>
                                {result.subtitle && (
                                  <p className="text-sm text-muted-foreground truncate">
                                    {result.subtitle}
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center space-x-2">
                                {result.price && (
                                  <span className="font-medium text-primary">
                                    {result.price}
                                  </span>
                                )}
                                
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-xs",
                                    result.type === 'team' && "border-blue-500 text-blue-600",
                                    result.type === 'product' && "border-green-500 text-green-600",
                                    result.type === 'category' && "border-purple-500 text-purple-600"
                                  )}
                                >
                                  {result.type === 'team' && '👥'}
                                  {result.type === 'product' && '🛍️'}
                                  {result.type === 'category' && '📂'}
                                  {result.type}
                                </Badge>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium mb-2">No results found</h3>
                        <p className="text-sm text-muted-foreground">
                          Try searching for teams, products, or categories
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
