import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap, Trophy } from 'lucide-react';
import { NCAA_TEAMS } from '@shared/teams';
import { useState } from 'react';

export default function NCAAPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTeams = NCAA_TEAMS.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedTeams = {
    'SEC': filteredTeams.filter(team => team.conference === 'SEC'),
    'Big Ten': filteredTeams.filter(team => team.conference === 'Big Ten'),
    'Big 12': filteredTeams.filter(team => team.conference === 'Big 12'),
    'ACC': filteredTeams.filter(team => team.conference === 'ACC'),
    'Pac-12': filteredTeams.filter(team => team.conference === 'Pac-12'),
    'Independent': filteredTeams.filter(team => team.conference === 'Independent'),
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-8 md:py-16 bg-gradient-to-r from-team-orange to-team-green text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-3 md:mb-4 bg-white/20 text-white border-white/30">
              🎓 Official NCAA Merchandise
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              NCAA Team Gear
            </h1>
            <p className="text-lg md:text-xl text-orange-100 mb-6 md:mb-8 max-w-2xl mx-auto">
              Shop official NCAA merchandise for top college teams. Support your alma mater or favorite college with authentic apparel and accessories.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto mb-6 md:mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">130+</div>
                <div className="text-sm text-orange-200">Teams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm text-orange-200">Conferences</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">800+</div>
                <div className="text-sm text-orange-200">Products</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teams Notice */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-2">Power 5 Conference Teams</h3>
            <p className="text-muted-foreground">
              Currently featuring top teams from major conferences. More teams and conferences coming soon!
            </p>
          </div>
        </div>
      </section>

      {/* Teams Grid by Conference */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {Object.entries(groupedTeams).map(([conference, teams]) => {
            if (teams.length === 0) return null;
            
            return (
              <div key={conference} className="mb-16">
                <div className="flex items-center space-x-3 mb-8">
                  <Trophy className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">{conference}</h2>
                  <Badge variant="secondary">{teams.length} teams</Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {teams.map((team) => (
                    <Link key={team.id} to={`/ncaa/${team.slug}`}>
                      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <CardHeader 
                          className="text-center text-white relative"
                          style={{
                            background: `linear-gradient(135deg, ${team.colors.primary} 0%, ${team.colors.secondary} 100%)`
                          }}
                        >
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                          <div className="relative">
                            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                              <GraduationCap className="h-8 w-8" />
                            </div>
                            <CardTitle className="text-xl font-bold">
                              {team.city}
                            </CardTitle>
                            <div className="text-lg font-semibold text-white/90">
                              {team.name}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 text-center">
                          <div className="flex items-center justify-center space-x-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              {team.conference}
                            </Badge>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          >
                            Shop Team Gear
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Expansion Notice */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">More Teams Coming Soon!</h3>
            <p className="text-muted-foreground mb-6">
              We're constantly expanding our NCAA collection. Don't see your team? We're working on adding more conferences and teams including:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>American Athletic</div>
              <div>Mountain West</div>
              <div>Conference USA</div>
              <div>MAC</div>
              <div>Sun Belt</div>
              <div>Ivy League</div>
              <div>Patriot League</div>
              <div>And Many More!</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-16 bg-gradient-to-r from-team-green to-team-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Can't Find Your School?
          </h2>
          <p className="text-lg md:text-xl text-green-100 mb-6 md:mb-8 max-w-2xl mx-auto">
            We're always adding new schools and conferences. Let us know which team you'd like to see next!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
              <Link to="/contact">
                Request a Team
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/products">
                Browse All Products
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
